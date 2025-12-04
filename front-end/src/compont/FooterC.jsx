import { FaFacebook, FaTiktok, FaSearchLocation, FaCalendar} from "react-icons/fa";
import "../style/FooterC.css";

function FooterC() {
  return (
    <footer>
        <div>
      <ul>
        <p>Connect with us</p>
        <li><a href="https://www.facebook.com/share/1CwzbF5ApF/">  <FaFacebook /> </a></li>
        <li><a href="https://www.tiktok.com/@ko_boyfriedchickenmkw">  <FaTiktok /> </a></li>
      </ul>
        </div>
        <div>
          <p><strong><FaCalendar /> Open - Close</strong></p>
          <p>12.00 am - 20.00 pm</p>
          <p><strong><FaSearchLocation /> Our location</strong></p>
          <p>Jl. Angkasa Mulyono, Kompleks Ruko Marina Seberang Jalan AlfaMart.</p>
          <p>Marina Amban Manokwari</p>
        </div>
    </footer>
  )
}

export default FooterC