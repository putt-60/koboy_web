import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../style/PopUpC.css";

const PopupCheckout = ({ show, close, onConfirm }) => {
  const [penerima, setPenerima] = useState("");
  const [alamat, setAlamat] = useState("");

  const handleSubmit = () => {
    if (!penerima.trim() || !alamat.trim()) {
      alert("Mohon isi semua data!");
      return;
    }

    onConfirm({ penerima, alamat });
  };

  return (
    <div className="wrapper">
      <Modal show={show} onHide={close} centered backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Konfirmasi Checkout</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nama Penerima</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan nama penerima"
                value={penerima}
                onChange={(e) => setPenerima(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Alamat Lengkap</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Masukkan alamat lengkap"
                value={alamat}
                onChange={(e) => setAlamat(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={close}>
            Batal
          </Button>
          <Button variant="warning" onClick={handleSubmit}>
            Konfirmasi Pesanan
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PopupCheckout;
