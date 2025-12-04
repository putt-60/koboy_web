import React, { useEffect, useState } from "react";
import "../style/History.css";

const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const h = JSON.parse(localStorage.getItem("history")) || [];
    setHistory(h);
  }, []);

  return (
    <div className="history-wrapper">
      <h3 className="fw-bold mb-3">Riwayat Pesanan</h3>

      {history.length === 0 ? (
        <div className="empty">Belum ada riwayat pesanan.</div>
      ) : (
        history.map((order) => (
          <div className="history-card" key={order.id}>
            <div className="history-header">
              <div className="tgl">{order.tanggal}</div>
              <div className="total">Rp {order.total.toLocaleString("id-ID")}</div>
            </div>

            <div className="history-info">
              <div>Penerima: {order.penerima}</div>
              <div>Alamat: {order.alamat}</div>
            </div>

            <div className="history-items">
              {order.items.map((item, idx) => (
                <div className="history-item" key={idx}>
                  <img
                    src={`/assets/${item.category?.nama?.toLowerCase()}/${item.gambar}`}
                    alt={item.nama}
                  />
                  <div className="item-detail">
                    <div className="item-name">{item.nama}</div>
                    <div className="item-price">
                      {item.jumlah}x — Rp {item.harga.toLocaleString("id-ID")}
                    </div>
                    {item.variasi && <div className="variasi">Varian: {item.variasi}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default History;
