import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Instagram, Facebook, Clock } from 'lucide-react';

const Footer = () => {
    return (
        <footer style={{ backgroundColor: 'var(--color-primary)', paddingTop: '4rem', paddingBottom: '2rem', marginTop: 'auto', color: 'white' }}>
            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', fontFamily: 'var(--font-heading)', color: 'white' }}>Yellow City Cosmetics</h3>
                        <p style={{ color: 'white', marginBottom: '1.5rem', lineHeight: '1.8' }}>
                            Your one-stop destination for premium beauty services and cosmetics. Enhance your natural glow with our expert care and curated products.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <a href="https://www.instagram.com/yellowcity_cosmetics?igsh=OXo5cmdtdG0zNjV0" target="_blank" rel="noreferrer" style={{ color: 'white' }}><Instagram size={24} /></a>
                            <a href="https://share.google/frfnDx1TrfNoAHgVi" target="_blank" rel="noreferrer" style={{ color: 'white' }}><MapPin size={24} /></a>
                        </div>
                    </div>

                    <div>
                        <h4 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', fontFamily: 'var(--font-heading)' }}>Quick Links</h4>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {['Shop', 'Services', 'About', 'Contact', 'Cart'].map(item => (
                                <li key={item} style={{ marginBottom: '0.75rem' }}>
                                    <Link to={`/${item.toLowerCase()}`} style={{ color: 'white', textDecoration: 'none', transition: 'color 0.2s' }}>{item}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', fontFamily: 'var(--font-heading)' }}>Contact Us</h4>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            <li style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', color: 'white' }}>
                                <MapPin size={20} color="white" style={{ flexShrink: 0 }} />
                                <span>16, Muthurangam Street, RD Complex, Erode – 1</span>
                            </li>
                            <li style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', color: 'white' }}>
                                <Phone size={20} color="white" style={{ flexShrink: 0 }} />
                                <span>9597057806, 8825829898</span>
                            </li>
                            <li style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', color: 'white' }}>
                                <Mail size={20} color="white" style={{ flexShrink: 0 }} />
                                <span>yellowcitycosmatics@gmail.com</span>
                            </li>
                            <li style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', color: 'white' }}>
                                <Clock size={20} color="white" style={{ flexShrink: 0 }} />
                                <span>Mon - Sat: 10:00 AM - 8:00 PM</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.2)', marginTop: '3rem', paddingTop: '1.5rem', textAlign: 'center', color: 'white' }}>
                    <p>&copy; {new Date().getFullYear()} Yellow City Cosmetics. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
