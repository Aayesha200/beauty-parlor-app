import React from 'react';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';

const Contact = () => {


    return (
        <div className="section">
            <div className="container">
                <h1 className="text-center" style={{ marginBottom: '3rem', color: 'var(--color-primary)' }}>Contact Us</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Contact Info & Map */}
                    <div>
                        <div style={{ marginBottom: '2rem' }}>
                            <h3 style={{ marginBottom: '1.5rem', fontFamily: 'var(--font-heading)' }}>Get in Touch</h3>
                            <ul style={{ listStyle: 'none' }}>
                                <li style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', alignItems: 'center' }}>
                                    <MapPin color="var(--color-primary)" />
                                    <span>16, Muthurangam Street, RD Complex, Erode – 1</span>
                                </li>
                                <li style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', alignItems: 'center' }}>
                                    <Phone color="var(--color-primary)" />
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <a href="tel:+919597057806" style={{ color: 'inherit', textDecoration: 'none' }}>+91 95970 57806</a>
                                        <a href="tel:+918825829898" style={{ color: 'inherit', textDecoration: 'none' }}>+91 88258 29898</a>
                                    </div>
                                </li>
                                <li style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', alignItems: 'center' }}>
                                    <Mail color="var(--color-primary)" />
                                    <a href="mailto:yellowcitycosmatics@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>yellowcitycosmatics@gmail.com</a>
                                </li>
                                <li style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', alignItems: 'center' }}>
                                    <MessageCircle color="var(--color-primary)" />
                                    <a href="https://wa.me/919597057806" style={{ color: 'inherit', textDecoration: 'none' }}>WhatsApp: +91 95970 57806</a>
                                </li>
                            </ul>
                        </div>

                        <div style={{ borderRadius: 'var(--radius-md)', border: '2px solid var(--color-primary)', overflow: 'visible', height: '300px', boxShadow: 'var(--shadow-md)', position: 'relative' }}>
                            <iframe
                                title="Google Map"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3911.777085731215!2d77.7122119!3d11.3430348!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba96f308ce74e4d%3A0x867332c0d83279c1!2sMuthurangam%20St%2C%20Erode%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700636250529!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy">
                            </iframe>

                        </div>
                    </div>

                    {/* Form */}
                    <div style={{ background: '#FFF5F5', padding: '2.5rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
                        <h3 style={{ marginBottom: '1.5rem', fontFamily: 'var(--font-heading)' }}>Send us a Message</h3>
                        <form
                            action="https://formsubmit.co/yellowcitycosmatics@gmail.com"
                            method="POST"
                            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
                        >
                            {/* FormSubmit Configuration */}
                            <input type="hidden" name="_subject" value="New Message from Website!" />
                            <input type="hidden" name="_captcha" value="false" />
                            <input type="hidden" name="_next" value="http://localhost:5173/contact" />
                            <input type="hidden" name="_template" value="table" />

                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#666' }}>Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid #ddd', outline: 'none' }}
                                    placeholder="Your Name"
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#666' }}>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid #ddd', outline: 'none' }}
                                    placeholder="Your Email"
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#666' }}>Message.</label>
                                <textarea
                                    rows="5"
                                    name="message"
                                    required
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid #ddd', outline: 'none' }}
                                    placeholder="How can we help?"
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary"
                                style={{ marginTop: '1rem' }}
                            >
                                Send Message .
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Contact;
