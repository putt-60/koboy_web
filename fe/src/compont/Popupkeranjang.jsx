import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const PopupKeranjang = ({ data, close, save }) => {
  const [jumlah, setJumlah] = useState(data.jumlah);
  const [variasi, setVariasi] = useState(data.pilihan || "");
  const [note, setNote] = useState(data.note || "");

  const simpanPerubahan = () => {
    save({
      ...data,
      jumlah,
      pilihan: variasi,
      note,
    });
  };

  // Jika backend menggunakan string "BBQ,Keju,..." → ubah ke array
  const variasiList = data.opsi
    ? Array.isArray(data.opsi)
      ? data.opsi
      : data.opsi.split(",")
    : [];

  return (
    <Modal show onHide={close} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Pesanan</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* Gambar & info produk */}
        <div className="d-flex">
          <img
            src={`/assets/makanan/${encodeURIComponent(data.gambar)}`}
            alt={data.nama}
            style={{ width: 120, height: 120, borderRadius: 10 }}
          />
          <div className="ms-3">
            <h5>{data.nama}</h5>
            <p className="fw-bold">Rp {data.harga.toLocaleString("id-ID")}</p>
          </div>
        </div>

        {/* Variasi */}
        {variasiList.length > 0 && (
          <div className="mt-3">
            <p className="fw-bold mb-1">Variasi</p>
            <div className="d-flex flex-wrap gap-2">
              {variasiList.map((opsi, idx) => (
                <Button
                  key={idx}
                  variant={variasi === opsi ? "primary" : "outline-primary"}
                  size="sm"
                  onClick={() => setVariasi(opsi)}
                >
                  {opsi}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Jumlah */}
        <div className="mt-3">
          <p className="fw-bold mb-1">Jumlah</p>
          <div className="d-flex align-items-center gap-2">
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() => jumlah > 1 && setJumlah(jumlah - 1)}
            >
              -
            </Button>

            <span className="fw-bold">{jumlah}</span>

            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() => setJumlah(jumlah + 1)}
            >
              +
            </Button>
          </div>
        </div>

        {/* Catatan */}
        <div className="mt-3">
          <p className="fw-bold mb-1">Catatan</p>
          <Form.Control
            type="text"
            placeholder="Contoh: pedas, tanpa bawang..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={close}>
          Batal
        </Button>
        <Button variant="success" onClick={simpanPerubahan}>
          Simpan
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PopupKeranjang;
