import React from "react";
import { Text, Link } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faEnvelopeSquare, faPhone } from "@fortawesome/free-solid-svg-icons";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { faInstagram, faFacebook } from "@fortawesome/free-brands-svg-icons";
import "../../../styles/details.css"

function Footer() {

  

    const linkStyle = {
        color: "#444",
        textDecoration: "none",
        display: "block",
        margin: "5px 0",
    }

    const hoursStyle = {
        marginTop: "10px",
    }
    return (
        <footer style={{
            backgroundColor: "#f0f0f0",
            color: "#333",
            padding: "20px",
            marginTop: "40px",
            borderTop: "1px solid #ccc",
            textAlign: "center",
            position: "relative",
            bottom: "0",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "16px",
            fontFamily: "Arial, sans-serif"
        }}>
            <div style={{
                width: "25%",
                minWidth: "250px",
                textAlign: "left",
                margin: "10px 0",
            }}>
                <h3></h3>
                <a href="/home" style={linkStyle}>Home</a>
                <a href="/about" style={linkStyle}>About Us</a>
                <a href="/contact" style={linkStyle}>Contact Us</a>
            </div>
            <div style={{
                width: "25%",
                minWidth: "250px",
                textAlign: "left",
                margin: "10px 0",
            }}>
                <h3></h3>
                <a href="/returns" style={linkStyle}>Returns & Exchanges</a>
                <a href="/shippingdel" style={linkStyle}>Shipping & Delivery</a>
                <a href="/privacy" style={linkStyle}>Privacy Policy</a>
            </div>
            <div style={{
                width: "25%",
                minWidth: "250px",
                textAlign: "left",
                margin: "10px 0",
            }}>
                <h3>Follow Us</h3>
                <div>
                    <Link href="#" onClick={() => window.open("https://www.instagram.com")} style={{ color: "black", marginRight: "10px" }}>
                        <FontAwesomeIcon icon={faInstagram} size="lg" />
                    </Link>
                    <Link href="#" onClick={() => window.open("https://www.facebook.com")} style={{ color: "black", marginRight: "10px" }}>
                        <FontAwesomeIcon icon={faFacebook} size="lg" />
                    </Link>
                    <Link href="tel:1234567890" style={{ color: "black", marginRight: "10px" }}>
                        <FontAwesomeIcon icon={faPhone} size="lg" />
                    </Link>
                    <Link href="mailto:info@vitalfurniture.com" style={{ color: "black" }}>
                        <FontAwesomeIcon icon={faEnvelopeSquare} size="lg" />
                    </Link>
                </div>
                <div style={hoursStyle}>
                    <h4>Operating Hours</h4>
                    <p>Sunday - Thursday: 8:00-20:00</p>
                </div>
            </div>
            <div style={{
                width: "25%",
                minWidth: "250px",
                textAlign: "left",
                margin: "10px 0",
            }}>
                <h3>Contact Us</h3>
                <p>123 Main St.</p>
                <p>Anytown, USA 12345</p>
                <p>(123) 456-7890</p>
                <a href="mailto:info@example.com" style={linkStyle}>info@vitalFurniture.com</a>
            </div>
        </footer>
    );
}

export default Footer;