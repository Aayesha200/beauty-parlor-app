import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Heart, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';

const Home = () => {
    const { products, services, addToCart, wishlist, toggleWishlist } = useShop();

    const floatVariant = {
        animate: {
            y: [0, -15, 0],
            transition: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    const bubbleVariant = {
        animate: {
            y: [0, -30, 0],
            x: [0, 10, 0],
            scale: [1, 1.1, 1],
            transition: {
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    return (
        <div style={{ overflowX: 'hidden' }}>
            {/* Hero Section */}
            <section style={{
                minHeight: '90vh',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                overflow: 'hidden',
                background: 'radial-gradient(circle at 30% 30%, #fff0f5, #fff)'
            }}>
                {/* Antigravity Bubbles Background */}
                <motion.div variants={bubbleVariant} animate="animate" style={{ position: 'absolute', top: '10%', left: '5%', width: '100px', height: '100px', background: 'rgba(255, 158, 170, 0.2)', borderRadius: '50%', filter: 'blur(5px)' }} />
                <motion.div variants={bubbleVariant} animate="animate" rx={20} style={{ position: 'absolute', top: '40%', right: '10%', width: '150px', height: '150px', background: 'rgba(58, 166, 185, 0.2)', borderRadius: '50%', filter: 'blur(10px)' }} />
                <motion.div variants={bubbleVariant} animate="animate" style={{ position: 'absolute', bottom: '10%', left: '30%', width: '80px', height: '80px', background: 'rgba(255, 215, 0, 0.2)', borderRadius: '50%', filter: 'blur(5px)' }} />

                <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <span style={{
                                display: 'inline-block',
                                padding: '0.5rem 1.5rem',
                                background: 'white',
                                borderRadius: '50px',
                                color: 'var(--color-neon-pink)',
                                fontWeight: 'bold',
                                boxShadow: 'var(--shadow-sm)',
                                marginBottom: '1.5rem',
                                border: '1px solid #ffe4e6'
                            }}>
                                <Sparkles size={16} style={{ display: 'inline', marginRight: '5px' }} />
                                Premium Beauty Store
                            </span>
                            <h1 style={{
                                fontSize: 'clamp(3rem, 6vw, 5rem)',
                                lineHeight: '1.1',
                                marginBottom: '1rem',
                                fontFamily: 'var(--font-heading)'
                            }}>
                                Be Young, <br />
                                <span className="text-gradient" style={{ fontFamily: 'var(--font-fun)' }}>Shine Bright.</span>
                            </h1>
                            <p style={{
                                fontSize: '1.2rem',
                                color: 'var(--color-text-light)',
                                marginBottom: '2.5rem',
                                maxWidth: '500px'
                            }}>
                                Discover the magic of "Be Young with Shine". Premium skincare and makeup to make you glow every day.
                            </p>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <Link to="/shop" className="btn btn-primary">Shop Essentials</Link>
                                <Link to="/services" className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    View Services <ArrowRight size={18} />
                                </Link>
                            </div>
                        </motion.div>

                        <motion.div
                            variants={floatVariant}
                            animate="animate"
                            style={{ position: 'relative' }}
                        >
                            <div className="glass-card" style={{ padding: '1rem', transform: 'rotate(-5deg)', zIndex: 2, position: 'relative' }}>
                                <img
                                    src="https://images.unsplash.com/photo-1596462502278-27bfdd403348?auto=format&fit=crop&q=80&w=800"
                                    alt="Skincare Routine"
                                    style={{ width: '100%', borderRadius: 'var(--radius-lg)' }}
                                />
                                <div style={{ position: 'absolute', bottom: '20px', left: '20px', right: '20px', background: 'rgba(255,255,255,0.9)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                                    <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Daily Glow Routine</h3>
                                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>Start your journey to radiant skin</p>
                                </div>
                            </div>

                            {/* Decorative Floating Elements */}
                            <motion.div
                                animate={{ y: [0, 20, 0] }}
                                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                                style={{
                                    position: 'absolute',
                                    top: '-40px',
                                    right: '-40px',
                                    width: '120px',
                                    zIndex: 1,
                                    background: 'white',
                                    padding: '10px',
                                    borderRadius: 'var(--radius-lg)',
                                    boxShadow: 'var(--shadow-md)'
                                }}
                            >
                                <img src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=200" alt="Cream" style={{ width: '100%', borderRadius: 'var(--radius-md)' }} />
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Brands Section */}
            <section className="section" style={{ background: 'white' }}>
                <div className="container">
                    <h2 className="text-center" style={{ marginBottom: '3rem' }}>Trusted <span className="text-gradient">Brands</span></h2>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap', alignItems: 'center', opacity: 0.6 }}>
                        {['Himalaya', 'Pilgrim', 'Lakme', 'Maybelline', 'L\'Oreal', 'Mamaearth'].map(brand => (
                            <h3 key={brand} style={{ color: '#aaa', fontSize: '1.5rem', fontFamily: 'var(--font-heading)' }}>{brand}</h3>
                        ))}
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="section bg-pink">
                <div className="container">
                    <h2 className="text-center" style={{ marginBottom: '1rem' }}>Shop by <span className="text-gradient">Category</span></h2>
                    <p className="text-center text-light" style={{ marginBottom: '3rem' }}>Find exactly what you need for your look</p>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: 'Skincare', img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=600', color: '#FF9EAA' },
                            { title: 'Makeup', img: 'https://images.unsplash.com/photo-1596462502278-27bfdd403348?auto=format&fit=crop&q=80&w=600', color: '#FFD700' },
                            { title: 'Hair Care', img: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=600', color: '#3AA6B9' }
                        ].map((cat, idx) => (
                            <motion.div
                                key={idx}
                                className="glass-card"
                                whileHover={{ scale: 1.03 }}
                                style={{ padding: '1rem', textAlign: 'center', cursor: 'pointer' }}
                            >
                                <div style={{ height: '200px', overflow: 'hidden', borderRadius: 'var(--radius-lg)', marginBottom: '1rem' }}>
                                    <img src={cat.img} alt={cat.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                                <h3 style={{ color: cat.color }}>{cat.title}</h3>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Products Floating Cards */}
            <section className="section">
                <div className="container">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '3rem' }}>
                        <div>
                            <h2 style={{ marginBottom: '0.5rem' }}>Trending <span className="text-gradient">Now</span></h2>
                            <p>Most loved products this week</p>
                        </div>
                        <Link to="/shop" className="btn btn-outline">View All</Link>
                    </div>

                    <div className="grid md:grid-cols-4 gap-6">
                        {products.slice(0, 4).map((product, idx) => (
                            <motion.div
                                key={product.id}
                                className="glass-card"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                style={{ padding: '1rem', position: 'relative' }}
                            >
                                <motion.div
                                    style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 1 }}
                                    whileTap={{ scale: 1.2 }}
                                >
                                    <button
                                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                                        onClick={() => toggleWishlist(product)}
                                    >
                                        <Heart
                                            size={20}
                                            color={wishlist.find(item => item.id === product.id) ? '#ff4757' : '#FF1E8F'}
                                            fill={wishlist.find(item => item.id === product.id) ? '#ff4757' : 'none'}
                                        />
                                    </button>
                                </motion.div>
                                <div style={{ height: '220px', borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: '1rem' }}>
                                    <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                                <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.name}</h4>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontWeight: 'bold', color: 'var(--color-primary)' }}>₹{product.price}</span>
                                    <button
                                        className="btn btn-primary"
                                        style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
                                        onClick={() => addToCart(product)}
                                    >
                                        Add
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Antigravity Offers */}
            <section className="section" style={{ background: '#FFF0F5', position: 'relative', overflow: 'hidden' }}>
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    style={{ position: 'absolute', top: '-10%', right: '-5%', opacity: 0.1 }}
                >
                    <Star size={300} fill="var(--color-primary)" stroke="none" />
                </motion.div>

                <div className="container">
                    <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', background: 'rgba(255,255,255,0.6)' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontFamily: 'var(--font-fun)', color: 'var(--color-neon-pink)' }}>Exclusive Offer!</h2>
                        <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>Get 20% off on your first order with code: <span style={{ fontWeight: 'bold', color: 'var(--color-primary)' }}>SHINE20</span></p>
                        <Link to="/shop" className="btn btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.2rem' }}>Shop Sale</Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
