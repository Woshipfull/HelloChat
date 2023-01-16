import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import UIfx from 'uifx';
import filter from 'leo-profanity';

import { addMessage, selectors } from '../slices/messagesSlice';
import { channelsAll } from '../slices/channelsSlice';

import messageSound from '../sounds/newMessage.mp3';

import socket from '../socket.js';

const newMessageSound = new UIfx(messageSound);

const ChatWindowComponent = ({ setShow }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const messageWindow = useRef(null);

  const handleShow = () => setShow(true);

  const username = () => {
    if (window.localStorage.user !== undefined) {
      return JSON.parse(window.localStorage.user).username;
    }
    return 'Guest';
  };

  const activeChannelId = useSelector((state) => state.currentChannel.active);
  const activeChannelName = useSelector(channelsAll)
    .filter((channel) => channel.id === activeChannelId)
    .map((channel) => channel.name)[0];

  const messages = useSelector(selectors).filter(
    // eslint-disable-next-line comma-dangle
    (mess) => mess.channelId === activeChannelId
  );

  const [text, setText] = useState('');

  const censoredText = (txt) => {
    filter.loadDictionary('en');
    const fromEn = filter.clean(txt);
    filter.loadDictionary('ru');
    return filter.clean(fromEn);
  };

  const handleChange = ({ target: { value } }) => setText(value);

  const handleSend = () => {
    const trimText = text.trim();
    if (trimText === '') {
      return;
    }

    socket.emit('newMessage', {
      body: censoredText(text),
      channelId: activeChannelId,
      username: username(),
    });
    setText('');
  };

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const renderMessage = (message) => (
    <div className="mb-2" key={message.id}>
      <b>{message.username}</b>
      {': '}
      {message.body}
    </div>
  );

  useEffect(() => {
    messageWindow.current.scrollTop = messageWindow.current.scrollHeight;
  });

  useEffect(() => {
    socket.on('newMessage', (payload) => {
      dispatch(addMessage(payload));
      newMessageSound.play();
    });
  }, [dispatch]);

  return (
    <div className="d-flex flex-column w-100 h-100 justify-content-between">
      <div className="d-flex flex-column w-100 overflow-hidden">
        <Button
          variant="secondary"
          onClick={handleShow}
          className="d-block d-lg-none rounded-0"
        >
          {t('chatWindow.btnShowChannels').toUpperCase()}
        </Button>
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>
              <span># </span>
              {activeChannelName}
            </b>
          </p>
          <span className="text-muted">
            {t('chatWindow.messagesCount', { count: messages.length })}
          </span>
        </div>
        <div className="overflow-auto px-4" ref={messageWindow}>
          {messages.map((message) => renderMessage(message))}
        </div>
      </div>
      <div className="px-4 py-3">
        <InputGroup noValidate className="py-1 border rounded-2">
          <Form.Control
            placeholder={t('chatWindow.sendMess')}
            aria-label={t('chatWindow.ariaLabel')}
            className="border-0 p-0 ps-2"
            value={text}
            autoFocus
            onChange={handleChange}
            onKeyDown={handleEnter}
          />
          <Button variant="group-vertical" onClick={handleSend}>
            <svg
              xlinkHref="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              width="20"
              height="20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
              />
              <span className="visually-hidden">{t('chatWindow.sendBtn')}</span>
            </svg>
          </Button>
        </InputGroup>
      </div>
    </div>
  );
};

export default ChatWindowComponent;
