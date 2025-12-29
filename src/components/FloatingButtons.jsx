import React from 'react';
import { Phone, MessageCircle, Instagram } from 'lucide-react';
import { motion } from 'framer-motion';

const FloatingButtons = () => {
    return (
        <div style={{ position: 'fixed', bottom: '2rem', right: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', zIndex: 9999 }}>
            <motion.a
                href="https://www.instagram.com/yellowcity_cosmetics?igsh=OXo5cmdtdG0zNjV0"
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                    color: 'white',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                    textDecoration: 'none'
                }}
            >
                <Instagram size={30} />
            </motion.a>

            <motion.a
                href="https://wa.me/919597057806"
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: '#25D366',
                    color: 'white',
                    boxShadow: '0 4px 10px rgba(37, 211, 102, 0.4)',
                    textDecoration: 'none'
                }}
            >
                <MessageCircle size={30} />
            </motion.a>

            <motion.a
                href="tel:+919597057806"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'var(--color-primary)',
                    color: 'white',
                    boxShadow: '0 4px 10px rgba(255, 30, 143, 0.4)',
                    textDecoration: 'none'
                }}
            >
                <Phone size={28} />
            </motion.a>
        </div>
    );
};

export default FloatingButtons;
