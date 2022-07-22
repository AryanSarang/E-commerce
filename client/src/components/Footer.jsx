import { React } from "react";

const Footer = () => {
    const year = new Date().getFullYear();
    return (
        <footer className="footer">
            <a href="https://www.instagram.com/thearyanshow/"><i  class="fa-brands fa-twitter   footer-icon">

            </i></a>
            <a href="https://www.instagram.com/thearyanshow/"><i  class="fa-brands fa-facebook  footer-icon">

            </i></a>
            <a href="https://www.instagram.com/thearyanshow/"><i  class="fa-brands fa-instagram footer-icon">
                
            </i></a>
            <a href="mailto:thearyansarang@gmail.com"><i 
             class="fa-solid fa-envelope   footer-icon"></i></a>
            <h6>© Copyright {year} Aryan Sarang</h6>
        </footer>
    );
}
export default Footer;