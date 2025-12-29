import React from 'react';
import { useShop } from '../context/ShopContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Services = () => {
    const { services } = useShop();

    return (
        <div className="section">
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h1 className="text-gradient" style={{ marginBottom: '1rem', fontFamily: 'var(--font-fun)', fontSize: '3rem' }}>Our Services</h1>
                    <p style={{ color: 'var(--color-text-light)', fontSize: '1.1rem' }}>Professional beauty treatments for your every need</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, idx) => (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            key={service.id}
                            className="glass-card"
                            style={{ overflow: 'hidden', padding: '1rem' }}
                        >
                            <div style={{ height: '220px', borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: '1.5rem' }}>
                                <motion.img
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.5 }}
                                    src={service.image}
                                    alt={service.name}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#333' }}>{service.name}</h3>
                                <p style={{ color: 'var(--color-text-light)', marginBottom: '1.5rem', lineHeight: '1.6' }}>{service.description}</p>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontSize: '1.25rem', color: 'var(--color-primary)', fontWeight: 'bold' }}>₹{service.price}</span>
                                    <Link to="/contact" className="btn btn-outline" style={{ borderRadius: '50px' }}>Book Now</Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default Services;
