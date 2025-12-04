import React, { useState, useEffect } from "react";
import { Container, Button, Form } from "react-bootstrap";
import PopupKeranjang from "../compont/Popupkeranjang";
import PopupCheckout from "../compont/PopupCheckout";
import NavbarK from "../compont/NavbarK";
import "../style/Keranjang.css";

const Keranjang = () => {
  const [cart, setCart] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const [showPopup, setShowPopup] = useState(false);
  const [popupData, setPopupData] = useState(null);

  const [showCheckout, setShowCheckout] = useState(false);

  // Load data keranjang dari localStorage
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("keranjang")) || [];
    const cartWithSelect = data.map((i) => ({ ...i, selected: false }));
    setCart(cartWithSelect);
  }, []);

  // Buka popup edit item
  const openPopup = (item, index) => {
    setPopupData({ ...item, index });
    setShowPopup(true);
  };

  const closePopup = () => setShowPopup(false);

  // Update item setelah edit
  const updateItem = (updatedItem) => {
    let updatedCart = [...cart];
    updatedCart[updatedItem.index] = updatedItem;

    setCart(updatedCart);
    localStorage.setItem("keranjang", JSON.stringify(updatedCart));
    setShowPopup(false);
  };

  // Pilih satu item
  const toggleSelect = (index) => {
    const updated = [...cart];
    updated[index].selected = !updated[index].selected;
    setCart(updated);
    setSelectAll(updated.every((item) => item.selected));
  };

  // Pilih semua item
  const toggleSelectAll = () => {
    const newVal = !selectAll;
    setSelectAll(newVal);

    const updated = cart.map((item) => ({ ...item, selected: newVal }));
    setCart(updated);
  };

  // Total harga item terpilih
  const total = cart
    .filter((item) => item.selected)
    .reduce((sum, item) => sum + item.harga * item.jumlah, 0);

  // Hapus item terpilih
  const deleteSelected = () => {
    const updated = cart.filter((item) => !item.selected);
    setCart(updated);
    localStorage.setItem("keranjang", JSON.stringify(updated));
    setSelectAll(false);
  };

  // Simpan riwayat pesanan ke localStorage
  const saveHistory = (checkoutData) => {
    const selectedItems = cart.filter((item) => item.selected);

    const order = {
      id: Date.now(),
      tanggal: new Date().toLocaleString("id-ID"),
      penerima: checkoutData.penerima,
      alamat: checkoutData.alamat,
      total: total,
      items: selectedItems,
    };

    const history = JSON.parse(localStorage.getItem("history")) || [];
    history.push(order);

    localStorage.setItem("history", JSON.stringify(history));
  };

  // Jika checkout dikonfirmasi
  const confirmCheckout = (data) => {
    saveHistory(data); // simpan ke riwayat pesanan

    // hapus item yang dipilih dari keranjang
    const newCart = cart.filter((item) => !item.selected);
    setCart(newCart);
    localStorage.setItem("keranjang", JSON.stringify(newCart));

    alert("Pesanan berhasil dibuat!");
    setShowCheckout(false);
  };

  return (
    <Container className="keranjang-wrapper">
      <div>
        <NavbarK />
      </div>

      <h4 className="fw-bold mb-3">Keranjang Saya</h4>

      {/* Header */}
      <div className="keranjang-header">
        <Form.Check type="checkbox" checked={selectAll} onChange={toggleSelectAll} />
        <span className="fw-bold ms-2">Pilih Semua</span>

        {cart.some((i) => i.selected) && (
          <Button variant="danger" size="sm" className="ms-auto" onClick={deleteSelected}>
            Hapus
          </Button>
        )}
      </div>

      {/* List item */}
      {cart.map((item, idx) => (
        <div
          key={idx}
          className={`keranjang-item-box ${item.selected ? "keranjang-selected" : ""}`}
        >
          <Form.Check
            type="checkbox"
            checked={item.selected}
            onChange={() => toggleSelect(idx)}
            className="me-2"
          />

          <div className="keranjang-click-area" onClick={() => openPopup(item, idx)}>
            <img
              src={`/assets/${item.category?.nama?.toLowerCase()}/${item.gambar}`}
              alt={item.nama}
              className="keranjang-img"
            />

            <div className="keranjang-info">
              <div className="keranjang-nama">{item.nama}</div>
              <div className="keranjang-harga">
                Rp {item.harga.toLocaleString("id-ID")}
              </div>
              <div className="keranjang-qty">Qty: {item.jumlah}</div>

              {item.variasi && <div className="keranjang-opsi">Pilihan: {item.variasi}</div>}
              {item.note && <div className="keranjang-note">Catatan: {item.note}</div>}
            </div>
          </div>
        </div>
      ))}

      {/* Footer Total */}
      <div className="keranjang-footer">
        <div className="total-label">Total:</div>
        <div className="total-harga">Rp {total.toLocaleString("id-ID")}</div>

        <Button
          variant="success"
          className="checkout-btn"
          disabled={total === 0}
          onClick={() => setShowCheckout(true)}
        >
          Checkout
        </Button>
      </div>

      {/* Popup Edit */}
      {showPopup && (
        <PopupKeranjang data={popupData} close={closePopup} save={updateItem} />
      )}

      {/* Popup Checkout */}
      <PopupCheckout
        show={showCheckout}
        close={() => setShowCheckout(false)}
        onConfirm={confirmCheckout}
      />
    </Container>
  );
};

export default Keranjang;
