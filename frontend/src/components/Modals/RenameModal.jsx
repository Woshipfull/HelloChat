import React, { useState, useRef, useEffect } from 'react';
import { Dropdown, Modal, Button, Form, InputGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { successToast } from '../../utils/toasts';

const RenameModal = ({ channels, socket, currentName, id }) => {
  const { t } = useTranslation();

  const [inputState, setInputState] = useState(currentName);
  const [invalid, setInvalid] = useState(null);
  const [show, setShow] = useState(false);

  const input = useRef(null);

  const channelsNames = channels.map((channel) => channel.name);

  const texts = {
    title: t('modals.title.rename'),
    btnCansel: t('modals.btns.cansel'),
    btnSend: t('modals.btns.send'),
    nameTaken: t('errors.nameTaken'),
    toast: t('toasts.channelRenamed'),
    mainBtn: t('modals.btns.rename'),
  };

  const handleClose = () => {
    setInputState(currentName);
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const handleChange = ({ target: { value } }) => setInputState(value);

  const successRename = () => {
    handleClose();
    successToast(texts.toast);
    socket.off('renameChannel', successRename);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputState.trim() === '') {
      return;
    }
    if (channelsNames.some((chName) => chName === inputState.trim())) {
      setInvalid(true);
      return;
    }

    socket.on('renameChannel', successRename);

    socket.emit('renameChannel', { id, name: inputState.trim() });
  };

  useEffect(() => {
    console.log(show);
    console.log(input.current);
    if (show === true) {
      console.log(input.current);
      input.current.select();
    }
  });

  return (
    <>
      <Dropdown.Item onClick={handleShow}>{texts.mainBtn}</Dropdown.Item>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{texts.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <InputGroup>
              <Form.Control
                value={inputState}
                onChange={handleChange}
                ref={input}
                className={invalid && 'is-invalid'}
              />
              <Form.Control.Feedback type="invalid" tooltip>
                {texts.nameTaken}
              </Form.Control.Feedback>
              <Form.Label />
            </InputGroup>
            <div className="d-flex justify-content-end gap-1 mt-4">
              <Button variant="secondary" onClick={handleClose}>
                {texts.btnCansel}
              </Button>
              <Button type="submit" variant="primary">
                {texts.btnSend}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default RenameModal;
