import React from "react";
import "../style/About.css";

function About() {
  return (
    <about>
      <h3>
        Koboy Fried Chicken, kata koboy diserap dari sebagian bahasa jawa, yaitu
        “Ko”. Dan “Boy” berasal dari nama orang tua penjual. Jadi, Koboy pada
        dasarnya adalah permodalan dari orang tua penjual yang di serap menjadi
        nama UMKM
      </h3>

      <div className="about-container">
        <div className="image-row">
          <div className="feature-item">
            <img src="..\assets\about\Ayam Crispy 3.png" alt="Ayam Crispy" />
            <p>
              <strong>Renyahh dan Gurih</strong>
            </p>
          </div>

          <div className="feature-item">
            <img src="..\assets\about\Ayam Fresh 2 (2).png" alt="Ayam Fresh" />
            <p>
              <strong>Segar</strong>
            </p>
          </div>

          <div className="feature-item">
            <img src="..\assets\about\Sauce2.png" alt="Sauce" />
            <p>
              <strong>Aneka rasa</strong>
            </p>
          </div>
        </div>
      </div>
    </about>
  );
}

export default About;
