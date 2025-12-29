import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Star, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Shop = () => {
    const { products, addToCart, wishlist, toggleWishlist } = useShop();
    const [filter, setFilter] = useState('All');

    const categories = ['All', ...new Set(products.map(p => p.category))];

    const filteredProducts = filter === 'All'
        ? products
        : products.filter(p => p.category === filter);

    return (
        <div className="section">
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h1 className="text-gradient" style={{ marginBottom: '1rem', fontFamily: 'var(--font-fun)', fontSize: '3rem' }}>Our Collection</h1>
                    <p style={{ color: 'var(--color-text-light)', fontSize: '1.1rem' }}>Curated skincare and beauty essentials just for you</p>
                </div>

                <div style={{ marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={filter === cat ? 'btn btn-primary' : 'btn btn-outline'}
                                style={{ padding: '0.5rem 1.5rem', minWidth: '100px' }}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <motion.div layout className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    <AnimatePresence>
                        {filteredProducts.map(product => (
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
                                    <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(255,255,255,0.95)', padding: '0.25rem 0.6rem', borderRadius: '1rem', fontSize: '0.8rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                                        {product.rating} <Star size={12} fill="#FFD700" color="#FFD700" />
                                    </div>
                                    <button
                                        onClick={() => toggleWishlist(product)}
                                        style={{
                                            position: 'absolute',
                                            top: '10px',
                                            left: '10px',
                                            background: 'rgba(255,255,255,0.9)',
                                            borderRadius: '50%',
                                            padding: '8px',
                                            border: 'none',
                                            cursor: 'pointer',
                                            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                                        }}
                                    >
                                        <Heart
                                            size={18}
                                            color={wishlist.find(item => item.id === product.id) ? '#ff4757' : '#ccc'}
                                            fill={wishlist.find(item => item.id === product.id) ? '#ff4757' : 'none'}
                                        />
                                    </button>
                                </motion.div>

                                <div>
                                    <p style={{ fontSize: '0.75rem', color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem', fontWeight: 'bold' }}>{product.category}</p>
                                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: '#2b2b2b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontFamily: 'var(--font-heading)' }}>{product.name}</h3>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                                        <p style={{ fontSize: '1.25rem', color: '#2D2D2D', fontWeight: 'bold' }}>₹{product.price}</p>
                                        <motion.button
                                            whileTap={{ scale: 0.95 }}
                                            className="btn btn-primary"
                                            style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', borderRadius: '50px' }}
                                            onClick={() => addToCart(product)}
                                        >
                                            Add
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
};
export default Shop;
