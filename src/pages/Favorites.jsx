import React from 'react';
import { useShop } from '../context/ShopContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Trash2, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

const Favorites = () => {
    const { wishlist, toggleWishlist, addToCart } = useShop();

    return (
        <div className="section">
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h1 className="text-gradient" style={{ marginBottom: '1rem', fontFamily: 'var(--font-fun)', fontSize: '3rem' }}>My Wishlist</h1>
                    <p style={{ color: 'var(--color-text-light)', fontSize: '1.1rem' }}>
                        {wishlist.length === 0 ? "Your heart is empty, go fill it up!" : "Your saved beauty favorites"}
                    </p>
                </div>

                {wishlist.length === 0 ? (
                    <div className="text-center" style={{ padding: '3rem', minHeight: '30vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <Heart size={60} color="#ddd" style={{ marginBottom: '1rem' }} />
                        <Link to="/shop" className="btn btn-primary">Start Shopping</Link>
                    </div>
                ) : (
                    <motion.div layout className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        <AnimatePresence>
                            {wishlist.map(product => (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    key={product.id}
                                    className="glass-card"
                                    style={{ overflow: 'hidden', padding: '1rem', position: 'relative' }}
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        style={{ position: 'relative', height: '220px', borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: '1rem' }}
                                    >
                                        <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </motion.div>

                                    <div>
                                        <p style={{ fontSize: '0.75rem', color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem', fontWeight: 'bold' }}>{product.category}</p>
                                        <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: '#2b2b2b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontFamily: 'var(--font-heading)' }}>{product.name}</h3>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                                            <p style={{ fontSize: '1.25rem', color: '#2D2D2D', fontWeight: 'bold' }}>₹{product.price}</p>
                                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                <button
                                                    onClick={() => toggleWishlist(product)}
                                                    className="btn btn-outline"
                                                    style={{ padding: '0.5rem', borderRadius: '50%', color: 'var(--color-primary)', borderColor: 'var(--color-primary)' }}
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                                <button
                                                    onClick={() => addToCart(product)}
                                                    className="btn btn-primary"
                                                    style={{ padding: '0.5rem', borderRadius: '50%' }}
                                                >
                                                    <ShoppingBag size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Favorites;
