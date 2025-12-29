import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingBag, User, Menu, X, Search, Heart } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const { cart, wishlist } = useShop();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <nav className="glass" style={{ position: 'sticky', top: 0, zIndex: 1000 }}>
            <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 0' }}>
                {/* Logo */}
                <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <h1 className="text-gradient" style={{ fontSize: '1.8rem', margin: 0, fontFamily: 'var(--font-fun)' }}>Yellow City</h1>
                    <span style={{ fontFamily: 'var(--font-script)', fontSize: '1.2rem', color: 'var(--color-primary)', marginLeft: '5px' }}>Cosmetics</span>
                </Link>

                {/* Desktop Menu */}
                <div className="desktop-menu" style={{ display: 'none', gap: '2rem' }}>
                    {['Home', 'Shop', 'Services', 'About', 'Contact'].map((item) => (
                        <NavLink
                            key={item}
                            to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                            style={({ isActive }) => ({
                                textDecoration: 'none',
                                color: isActive ? 'var(--color-neon-pink)' : 'var(--color-text)',
                                fontWeight: isActive ? 700 : 500,
                                fontSize: '1.1rem',
                                fontFamily: 'var(--font-heading)'
                            })}
                        >
                            {item}
                        </NavLink>
                    ))}
                </div>

                {/* Icons */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <Link to="/shop" style={{ color: 'var(--color-text)' }}>
                        <Search size={22} />
                    </Link>

                    <Link to="/favorites" style={{ position: 'relative', color: 'var(--color-text)' }}>
                        <Heart size={22} />
                        {wishlist.length > 0 && (
                            <span style={{
                                position: 'absolute', top: '-8px', right: '-8px',
                                background: 'var(--color-primary)', color: 'white',
                                borderRadius: '50%', width: '18px', height: '18px',
                                fontSize: '0.7rem', display: 'flex', justifyContent: 'center', alignItems: 'center',
                                fontWeight: 'bold'
                            }}>
                                {wishlist.length}
                            </span>
                        )}
                    </Link>

                    <Link to="/cart" style={{ position: 'relative', color: 'var(--color-text)' }}>
                        <ShoppingBag size={22} />
                        {cart.length > 0 && (
                            <span style={{
                                position: 'absolute', top: '-8px', right: '-8px',
                                background: 'var(--color-neon-pink)', color: 'white',
                                borderRadius: '50%', width: '20px', height: '20px',
                                fontSize: '0.75rem', display: 'flex', justifyContent: 'center', alignItems: 'center',
                                fontWeight: 'bold'
                            }}>
                                {cart.reduce((acc, item) => acc + item.quantity, 0)}
                            </span>
                        )}
                    </Link>

                    <Link to="/login" style={{ color: 'var(--color-text)' }}>
                        <User size={22} />
                    </Link>

                    <button onClick={toggleMenu} style={{ background: 'none', border: 'none', display: 'block', padding: 0, color: 'var(--color-text)' }} className="mobile-toggle">
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        style={{ overflow: 'hidden', background: 'white', borderTop: '1px solid #eee' }}
                    >
                        <div className="container" style={{ padding: '1rem 0', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {['Home', 'Shop', 'Services', 'About', 'Contact'].map((item) => (
                                <Link
                                    key={item}
                                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                                    onClick={() => setIsOpen(false)}
                                    style={{ textDecoration: 'none', color: 'var(--color-text)', fontSize: '1.1rem', fontWeight: 500 }}
                                >
                                    {item}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
        @media (min-width: 768px) {
          .desktop-menu { display: flex !important; }
          .mobile-toggle { display: none !important; }
        }
      `}</style>
        </nav >
    );
};

export default Navbar;
