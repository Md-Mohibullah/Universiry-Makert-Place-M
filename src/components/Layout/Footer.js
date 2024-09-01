import React from "react";
import { BsGithub} from "react-icons/bs";
import "../../styles/footer.css";

const Footer = () => {
  const handleClick = () => {
    window.location.href = 'https://github.com/YazdanRizwan/University-Marketplace';
  };
  return (
    <div className="footer pt-4 d-flex flex-column align-items-center justify-content-center bg-dark text-light p-4">
      <h3>
        Web app created by Tabrej,Mohibullah & Tanzeel
      </h3>
      <h6>All Right Reserved &copy; Tabrej,Mohibullah & Tanzeel - 2024</h6>
      <div className="d-flex flex-row p-2">
        <p className="me-4" title="Github">
            <BsGithub onClick={handleClick}  color="black" size={30} />
        </p>
      </div>
    </div>
  );
};

export default Footer;
