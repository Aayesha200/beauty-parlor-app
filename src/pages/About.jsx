import React from 'react';

import { motion } from 'framer-motion';

const About = () => {
    return (
        <div className="section">
            <div className="container">
                <h1 className="text-center text-gradient" style={{ marginBottom: '3rem', fontFamily: 'var(--font-heading)', fontSize: '3rem' }}>About Us</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center" style={{ marginBottom: '4rem' }}>
                    <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
                        <img src="https://images.unsplash.com/photo-1522335789203-abd6538d8ad8?auto=format&fit=crop&q=80&w=800" alt="Salon Interior" style={{ width: '100%', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)' }} />
                    </motion.div>
                    <div>
                        <h2 style={{ marginBottom: '1.5rem', fontFamily: 'var(--font-heading)' }}>Our Story</h2>
                        <p style={{ marginBottom: '1rem', color: '#555', lineHeight: '1.8' }}>
                            Welcome to <strong>Yellow City Cosmetics</strong>. Located in the heart of Erode at PS Park, we have been serving our community with exceptional beauty services and high-quality products.
                        </p>
                        <p style={{ marginBottom: '1rem', color: '#555', lineHeight: '1.8' }}>
                            Our mission is simple: to make every person feel beautiful and confident. Whether it's a refreshing facial, intricate mehandi art, or finding the perfect skincare routine, we are here to guide you.
                        </p>
                        <p style={{ color: '#555', lineHeight: '1.8' }}>
                            We pride ourselves on using only trusted brands like Himalaya, Forest Essentials, and Pilgrim, ensuring that your skin gets the best care possible.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    {[
                        { title: 'Experienced Professionals', text: 'Our team consists of trained and certified beauty experts dedicated to perfection.' },
                        { title: 'Quality Products', text: 'We sell and use only authentic, high-quality cosmetics and skincare products.' },
                        { title: 'Customer Trust', text: 'Hundreds of satisfied customers trust us for their beauty needs and special occasions.' }
                    ].map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.2 }}
                            className="glass-card"
                            style={{ padding: '2rem' }}
                        >
                            <h3 style={{ color: 'var(--color-primary)', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>{item.title}</h3>
                            <p style={{ color: 'var(--color-text-light)' }}>{item.text}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default About;
