import React, { useState } from 'react';
import { Button, Modal, Form, InputGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { successToast } from '../../utils/toasts';

const AddModal = ({ channels, socket }) => {
  const { t } = useTranslation();

  const [inputState, setInputState] = useState('');
  const [invalid, setInvalid] = useState(null);
  const [show, setShow] = useState(false);

  const channelsNames = channels.map((channel) => channel.name);

  const texts = {
    title: t('modals.title.add'),
    btnCansel: t('modals.btns.cansel'),
    btnSend: t('modals.btns.send'),
    nameTaken: t('errors.nameTaken'),
    toast: t('toasts.channelCreated'),
  };

  const handleClose = () => {
    setInputState('');
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const handleChange = ({ target: { value } }) => setInputState(value);

  const successAdding = () => {
    handleClose();
    successToast(texts.toast);
    socket.off('newChannel', successAdding);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputState.trim() === '') {
      return;
    }
    if (channelsNames.some((name) => name === inputState.trim())) {
      setInvalid(true);
      return;
    }

    socket.on('newChannel', successAdding);

    socket.emit('newChannel', { name: inputState.trim() });
  };

  return (
    <>
      <button
        type="button"
        className="p-0 text-primary btn btn-group-vertical"
        onClick={handleShow}
      >
        <svg
          xlinkHref="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          width="20"
          height="20"
          fill="currentColor"
        >
          <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
        </svg>
        <span className="visually-hidden">+</span>
      </button>

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
                autoFocus
                className={invalid && 'is-invalid'}
              />
              <Form.Control.Feedback type="invalid" tooltip>
                {texts.nameTaken}
              </Form.Control.Feedback>
              <Form.Label />
            </InputGroup>
            <div className="d-flex justify-content-end gap-1 mt-4">
              <Button
                variant="secondary"
                className="min-w-[40px]"
                onClick={handleClose}
              >
                {texts.btnCansel}
              </Button>
              <Button type="submit" className="min-w-[40px]" variant="primary">
                {texts.btnSend}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddModal;
