import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { actions } from '../slices/channelsSlice';
import { changeCurrentChannel } from '../slices/activeChannelSlice';
import { addMessages } from '../slices/messagesSlice';
import { errorToast } from '../utils/toasts';
import Channels from './ChannelsComponent.jsx';
import ChatWindow from './ChatWindowComponent.jsx';

const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  // ERROR MESSAGE

  useEffect(() => {
    const userData = window.localStorage.user;
    if (userData === undefined) {
      navigate('/login');
      return;
    }
    const { token } = JSON.parse(userData);
    const getData = async () => {
      await axios
        .get('/api/v1/data', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(({ data }) => {
          dispatch(actions.addChannels(data.channels));
          dispatch(changeCurrentChannel(data.currentChannelId));
          dispatch(addMessages(data.messages));
        })
        .catch((e) => {
          errorToast(t('asd'));
          console.log(e);
        });
    };
    getData();
  }, [dispatch, navigate, t]);

  return (
    <div className="d-flex h-100 justify-content-center align-items-center pt-2 pb-3 overflow-hidden">
      <div className="col-12 col-lg-11 h-100">
        <div className="d-flex flex-column flex-lg-row bg-white h-100 shadow overflow-hidden">
          <Channels show={show} setShow={setShow} />
          <ChatWindow setShow={setShow} />
        </div>
      </div>
    </div>
  );
};

export default Home;
