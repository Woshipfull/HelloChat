import React, { useState } from 'react';
import { Dropdown, Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { successToast } from '../../utils/toasts';

const RemoveModal = ({ socket, id }) => {
  const { t } = useTranslation();

  const texts = {
    title: t('modals.title.remove'),
    btnCansel: t('modals.btns.cansel'),
    btnSend: t('modals.btns.remove'),
    toast: t('toasts.channelRemoved'),
    mainBtn: t('modals.btns.remove'),
    message: t('modals.sure'),
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  const successRemove = () => {
    handleClose();
    successToast(texts.toast);
    socket.off('removeChannel', successRemove);
  };

  const handleRemove = () => {
    socket.on('removeChannel', successRemove);

    socket.emit('removeChannel', { id });
  };

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
        <Modal.Body>{texts.message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {texts.btnCansel}
          </Button>
          <Button type="submit" onClick={handleRemove} variant="primary">
            {texts.btnSend}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RemoveModal;
