import { useState, useEffect } from "react";
import { Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";
import "../style/Product.css";

function Product({ menu }) {
  const [showModal, setShowModal] = useState(false);
  const [note, setNote] = useState("");
  const [jumlah, setJumlah] = useState(1);
  const [selectedVariasi, setSelectedVariasi] = useState(null);

  const navigate = useNavigate();

  // Reset popup ketika dibuka
  useEffect(() => {
    if (showModal) {
      setSelectedVariasi(null);
      setJumlah(1);
      setNote("");
    }
  }, [showModal]);

  // Tambahkan ke keranjang
  const handleAddToCart = () => {
    const order = {
      id: menu.id,
      nama: menu.nama,
      harga: menu.harga,
      gambar: menu.gambar,
      jumlah,
      variasi: selectedVariasi,
      note,
      
      // ⬇ Tambahkan category supaya path gambar tidak error
      category: menu.category
    };

    const existing = JSON.parse(localStorage.getItem("keranjang")) || [];
    existing.push(order);

    localStorage.setItem("keranjang", JSON.stringify(existing));

    setShowModal(false);
    navigate("/keranjang");
  };

  return (
    <>
      {/* Kartu Produk */}
      <Col xs={6} sm={6} md={4} lg={3} className="mb-4">
        <Card className="shadow-sm h-100 product-card">
          <Card.Img
            variant="top"
            src={`/assets/makanan/${menu.gambar}`}
            alt={menu.nama}
            className="product-img"
          />

          <Card.Body className="d-flex flex-column justify-content-between">
            <div>
              <Card.Title className="fw-semibold text-center text-disini">
                {menu.nama}
              </Card.Title>
              <Card.Text className="text-center text-muted harga-disini">
                Rp. {menu.harga.toLocaleString("id-ID")}
              </Card.Text>
            </div>

            <Button
              variant="warning"
              className="mt-2 w-100 btn-coklat-susu"
              onClick={() => setShowModal(true)}
            >
              Beli
            </Button>
          </Card.Body>
        </Card>
      </Col>

      {/* Popup */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="popup-container">

            <div className="popup-top">
              <img
                src={`/assets/makanan/${menu.gambar}`}
                alt={menu.nama}
                className="popup-img"
              />

              <div className="popup-info">
                <h3>{menu.nama}</h3>
                <p>Harga: Rp {menu.harga.toLocaleString("id-ID")}</p>

                {/* Jumlah */}
                <div className="jumlah-wrap">
                  <label>Jumlah:</label>
                  <div className="jumlah-box">
                    <button
                      className="btn-jumlah"
                      onClick={() => setJumlah((prev) => Math.max(1, prev - 1))}
                    >
                      –
                    </button>

                    <span className="jumlah-angka">{jumlah}</span>

                    <button
                      className="btn-jumlah"
                      onClick={() => setJumlah((prev) => prev + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Variasi */}
                <div className="variasi-box">
                  <label>Pilihan:</label>
                  <div className="variasi-pilihan">
                    {menu.category?.pilihan?.length > 0 ? (
                      menu.category.pilihan.map((item, i) => (
                        <span
                          key={i}
                          className={`variasi-item ${
                            selectedVariasi === item ? "active" : ""
                          }`}
                          onClick={() => setSelectedVariasi(item)}
                        >
                          {item}
                        </span>
                      ))
                    ) : (
                      <span className="text-muted">Tidak ada pilihan</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Note */}
            <div className="popup-form">
              <label>Note</label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Catatan (opsional)"
              />
            </div>

            {/* Konfirmasi */}
            <Button
              variant="warning"
              className="w-100 mt-3"
              onClick={handleAddToCart}
            >
              Konfirmasi Pesanan
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
}

export default Product;
