import React from 'react';
import { useShop } from '../context/ShopContext';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus } from 'lucide-react';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, placeOrder } = useShop();
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    if (cart.length === 0) {
        return (
            <div className="section text-center" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div className="container">
                    <h2 style={{ fontFamily: 'var(--font-heading)', marginBottom: '1rem' }}>Your Cart is Empty</h2>
                    <p style={{ margin: '1rem 0', color: '#666' }}>Looks like you haven't added anything yet.</p>
                    <Link to="/shop" className="btn btn-primary">Start Shopping</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="section">
            <div className="container">
                <h1 style={{ marginBottom: '2rem', color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>Shopping Cart</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2">
                        {cart.map(item => (
                            <div key={item.id} style={{ display: 'flex', gap: '1rem', background: 'white', padding: '1.5rem', marginBottom: '1rem', borderRadius: 'var(--radius-md)', alignItems: 'center', boxShadow: 'var(--shadow-sm)' }}>
                                <img src={item.image} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }} />
                                <div style={{ flex: 1 }}>
                                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{item.name}</h3>
                                    <p style={{ color: 'var(--color-primary)', fontWeight: 'bold' }}>₹{item.price}</p>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                    <button onClick={() => updateQuantity(item.id, -1)} style={{ background: '#f5f5f5', border: 'none', padding: '0.5rem', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Minus size={16} /></button>
                                    <span style={{ minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.id, 1)} style={{ background: '#f5f5f5', border: 'none', padding: '0.5rem', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Plus size={16} /></button>
                                </div>
                                <button onClick={() => removeFromCart(item.id)} style={{ color: '#ff6b6b', border: 'none', background: 'none', marginLeft: '1rem', cursor: 'pointer' }}><Trash2 size={20} /></button>
                            </div>
                        ))}
                    </div>
                    <div>
                        <div style={{ background: 'white', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)' }}>
                            <h3 style={{ marginBottom: '1.5rem', fontFamily: 'var(--font-heading)' }}>Order Summary</h3>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: '#666' }}>
                                <span>Subtotal</span>
                                <span>₹{total}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: '#666' }}>
                                <span>Shipping</span>
                                <span style={{ color: 'var(--color-primary)' }}>Free</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', fontWeight: 'bold', fontSize: '1.3rem', borderTop: '1px solid #eee', paddingTop: '1rem' }}>
                                <span>Total</span>
                                <span>₹{total}</span>
                            </div>
                            <button
                                className="btn btn-primary"
                                style={{ width: '100%' }}
                                onClick={() => {
                                    const id = placeOrder();
                                    alert(`Order Placed Successfully! Order ID: ${id}. Thank you for shopping with Yellow City Cosmetics.`);
                                }}
                            >
                                Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Cart;
