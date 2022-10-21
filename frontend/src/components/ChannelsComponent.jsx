import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { Button, ButtonGroup, Dropdown, Offcanvas } from 'react-bootstrap';
import { actions, channelsAll } from '../slices/channelsSlice';
import { changeCurrentChannel } from '../slices/activeChannelSlice';

import socket from '../socket.js';

import AddModal from './Modals/AddModal';
import RenameModal from './Modals/RenameModal';
import RemoveModal from './Modals/RemoveModal';

const ChannelsComponent = ({ show, setShow }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleClose = () => setShow(false);

  const channels = useSelector(channelsAll);

  const activeChannel = useSelector((state) => state.currentChannel.active);

  const handleChangeChannel = ({ target: { value } }) => {
    dispatch(changeCurrentChannel(value));
    handleClose();
  };

  // STORE

  useEffect(() => {
    socket.on('newChannel', (payload) => {
      console.log('ADD');
      dispatch(actions.addChannel(payload));
      dispatch(changeCurrentChannel(payload.id));
    });

    socket.on('removeChannel', (payload) => {
      console.log('REMOVE');
      dispatch(actions.removeChannel(payload.id));
    });

    socket.on('renameChannel', (payload) => {
      console.log('RENAME');
      dispatch(actions.renameChannel({ id: payload.id, changes: payload }));
    });

    return () => {
      socket.off('newChannel');
      socket.off('removeChannel');
      socket.off('renameChannel');
    };
  }, [dispatch]);

  const renderChannelLi = (item) => {
    const variant = (id) => (activeChannel === id ? 'secondary' : 'btn');
    return (
      <li key={item.id} className="nav-item w-100">
        <Dropdown as={ButtonGroup} className="d-flex" drop="bottom">
          {/* SLIDES */}
          <Button
            value={item.id}
            className="w-100 rounded-0 text-start text-truncate"
            variant={variant(item.id)}
            onClick={handleChangeChannel}
          >
            <span className="me-1">#</span>
            {item.name}
          </Button>
          {item.removable && (
            <>
              <Dropdown.Toggle
                split
                variant={variant(item.id)}
                id="dropdown-split-basic"
              />

              <Dropdown.Menu>
                <RenameModal
                  channels={channels}
                  socket={socket}
                  currentName={item.name}
                  id={item.id}
                />
                <RemoveModal socket={socket} id={item.id} channels={channels} />
              </Dropdown.Menu>
            </>
          )}
        </Dropdown>
      </li>
    );
  };

  return (
    <div className="d-none d-lg-block col-12 col-lg-3 border-end bg-light p-0">
      <Offcanvas
        show={show}
        responsive="lg"
        onHide={handleClose}
        placement="top"
        className="h-100"
      >
        <Offcanvas.Body className="d-flex flex-column h-100 justify-content-between">
          <div className="d-flex flex-column overflow-hidden">
            <div
              className="d-flex justify-content-between align-items-center p-4"
              style={{ height: '74px' }}
            >
              <span>{t('channels.title')}</span>
              <AddModal channels={channels} socket={socket} />
            </div>
            <ul className="nav flex-row nav-pills nav-fill p-2 overflow-auto">
              {channels.map((item) => renderChannelLi(item))}
            </ul>
          </div>
          <Button
            variant="outline-danger"
            onClick={handleClose}
            className="d-block d-lg-none w-100 mt-3 rounded-0"
          >
            {t('channels.btnClose').toUpperCase()}
          </Button>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default ChannelsComponent;
