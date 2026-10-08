import "./Contact.css";

import {
    FaPhone,
    FaEnvelope,
    FaInstagram,
    FaFacebook,
    FaMapMarkerAlt,
} from "react-icons/fa";

import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

import L, { type LatLngExpression } from "leaflet";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";


const DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;


function Contact() {

    const position: LatLngExpression = [41.696765, 44.798026];

    return (
        <section className="contact-section">

            <h2 className="contact-title">
                ჩვენი საკონტაქტო ინფორმაცია
            </h2>


            <div className="contact-wrapper">

                {/* საკონტაქტო ინფორმაცია */}
                <address className="contact-info">

                    <ul className="contact-list">

                        {/* ტელეფონი */}
                        <li>
                            <a
                                href="tel:+995555555555"
                                className="contact-link"
                            >
                                <FaPhone className="contact-icon" />

                                <span>
                                    555 555 555
                                </span>
                            </a>
                        </li>


                        {/* Email */}
                        <li>
                            <a
                                href="mailto:mail@mail.ge"
                                className="contact-link"
                            >
                                <FaEnvelope className="contact-icon" />

                                <span>
                                    mail@mail.ge
                                </span>
                            </a>
                        </li>


                        {/* Instagram */}
                        <li>
                            <a
                                href="https://www.instagram.com/"
                                target="_blank"
                                rel="noreferrer"
                                className="contact-link"
                            >
                                <FaInstagram className="contact-icon" />

                                <span>
                                    instagram
                                </span>
                            </a>
                        </li>


                        {/* Facebook */}
                        <li>
                            <a
                                href="https://www.facebook.com/"
                                target="_blank"
                                rel="noreferrer"
                                className="contact-link"
                            >
                                <FaFacebook className="contact-icon" />

                                <span>
                                    facebook
                                </span>
                            </a>
                        </li>


                        {/* მისამართი */}
                        <li>
                            <a
                                href="https://www.openstreetmap.org/"
                                target="_blank"
                                rel="noreferrer"
                                className="contact-link"
                            >
                                <FaMapMarkerAlt className="contact-icon" />

                                <span>
                                    ქ. თბილისი, ვარკეთილი, ქუჩა ???? N?
                                </span>
                            </a>
                        </li>

                    </ul>

                </address>


                {/* რუკა */}
                <div className="map-wrapper">

                    <MapContainer
                        center={position}
                        zoom={15}
                        scrollWheelZoom={true}
                        className="contact-map"
                    >

                        <TileLayer
                            attribution="&copy; OpenStreetMap contributors"
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        <Marker position={position}>

                            <Popup>
                                TM Universal Academy
                            </Popup>

                        </Marker>

                    </MapContainer>


                    <div className="map-overlay" />

                </div>

            </div>

        </section>
    );
}

export default Contact;