import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';

const Admin = () => {
    const { user, products, services, getAllOrders, updateOrderStatus, addProduct, deleteProduct, loading } = useShop();
    const [allOrders, setAllOrders] = useState([]);
    const [activeTab, setActiveTab] = useState('orders');
    const [showAddProduct, setShowAddProduct] = useState(false);
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        category: '',
        description: '',
        image: '',
        rating: 4.5
    });
    const [loadingOrders, setLoadingOrders] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            if (user?.role === 'admin') {
                const orders = await getAllOrders();
                setAllOrders(orders.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
                setLoadingOrders(false);
            }
        };
        fetchOrders();
    }, [user, getAllOrders]);

    const handleStatusChange = async (orderId, userId, newStatus) => {
        await updateOrderStatus(orderId, userId, newStatus);
        setAllOrders(prev => prev.map(order =>
            order.id === orderId ? { ...order, status: newStatus } : order
        ));
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        if (!newProduct.name || !newProduct.price) return;

        await addProduct({
            ...newProduct,
            price: Number(newProduct.price),
            rating: Number(newProduct.rating)
        });

        setNewProduct({
            name: '',
            price: '',
            category: '',
            description: '',
            image: '',
            rating: 4.5
        });
        setShowAddProduct(false);
    };

    const handleDeleteProduct = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            await deleteProduct(id);
        }
    };

    if (loading) {
        return (
            <div className="section text-center" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{
                        width: '50px',
                        height: '50px',
                        border: '4px solid #f3f3f3',
                        borderTop: '4px solid var(--color-primary)',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                        margin: '0 auto 1rem'
                    }}></div>
                    <p>Loading...</p>
                </div>
            </div>
        );
    }

    if (!user || user.role !== 'admin') {
        return (
            <div className="section" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{
                    textAlign: 'center',
                    background: 'white',
                    padding: '3rem',
                    borderRadius: 'var(--radius-lg)',
                    boxShadow: 'var(--shadow-lg)'
                }}>
                    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔒</div>
                    <h2 style={{ color: 'var(--color-primary)', marginBottom: '1rem' }}>Access Denied</h2>
                    <p style={{ color: '#666', marginBottom: '1rem' }}>Please login as admin to access this page.</p>
                    <div style={{
                        background: '#f5f5f5',
                        padding: '1rem',
                        borderRadius: 'var(--radius-sm)',
                        textAlign: 'left'
                    }}>
                        <p style={{ color: '#555', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                            <strong>📧 Email:</strong> admin@aishu.com
                        </p>
                        <p style={{ color: '#555', fontSize: '0.9rem' }}>
                            <strong>🔑 Password:</strong> admin123
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    const statusColors = {
        'Ordered': '#2196F3',
        'Processing': '#FF9800',
        'Shipped': '#9C27B0',
        'Delivered': '#4CAF50',
        'Cancelled': '#F44336'
    };

    return (
        <div className="section">
            <style>
                {`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}
            </style>
            <div className="container">
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '2rem',
                    flexWrap: 'wrap',
                    gap: '1rem'
                }}>
                    <h1 style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>
                        ⚡ Admin Dashboard
                    </h1>
                    <div style={{
                        background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                        color: 'white',
                        padding: '0.5rem 1rem',
                        borderRadius: '20px',
                        fontSize: '0.9rem',
                        fontWeight: 'bold'
                    }}>
                        Welcome, {user.name}
                    </div>
                </div>

                {/* Stats Cards */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1.5rem',
                    marginBottom: '2rem'
                }}>
                    <div style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        padding: '1.5rem',
                        borderRadius: 'var(--radius-lg)',
                        color: 'white'
                    }}>
                        <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Total Products</div>
                        <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{products.length}</div>
                    </div>
                    <div style={{
                        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                        padding: '1.5rem',
                        borderRadius: 'var(--radius-lg)',
                        color: 'white'
                    }}>
                        <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Total Services</div>
                        <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{services.length}</div>
                    </div>
                    <div style={{
                        background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                        padding: '1.5rem',
                        borderRadius: 'var(--radius-lg)',
                        color: 'white'
                    }}>
                        <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Total Orders</div>
                        <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{allOrders.length}</div>
                    </div>
                    <div style={{
                        background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                        padding: '1.5rem',
                        borderRadius: 'var(--radius-lg)',
                        color: 'white'
                    }}>
                        <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Total Revenue</div>
                        <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>
                            ₹{allOrders.reduce((sum, order) => sum + (order.total || 0), 0).toLocaleString()}
                        </div>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div style={{
                    display: 'flex',
                    gap: '0.5rem',
                    marginBottom: '1.5rem',
                    borderBottom: '2px solid #eee',
                    paddingBottom: '0.5rem'
                }}>
                    {['orders', 'products', 'services'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            style={{
                                padding: '0.75rem 1.5rem',
                                border: 'none',
                                background: activeTab === tab ? 'var(--color-primary)' : 'transparent',
                                color: activeTab === tab ? 'white' : '#666',
                                borderRadius: 'var(--radius-sm)',
                                cursor: 'pointer',
                                fontWeight: activeTab === tab ? 'bold' : 'normal',
                                textTransform: 'capitalize',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Orders Tab */}
                {activeTab === 'orders' && (
                    <div style={{
                        background: 'white',
                        padding: '2rem',
                        borderRadius: 'var(--radius-lg)',
                        boxShadow: 'var(--shadow-sm)'
                    }}>
                        <h2 style={{ marginBottom: '1.5rem', color: 'var(--color-primary)' }}>📦 All Orders</h2>
                        {loadingOrders ? (
                            <div style={{ textAlign: 'center', padding: '2rem' }}>
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    border: '3px solid #f3f3f3',
                                    borderTop: '3px solid var(--color-primary)',
                                    borderRadius: '50%',
                                    animation: 'spin 1s linear infinite',
                                    margin: '0 auto'
                                }}></div>
                            </div>
                        ) : allOrders.length === 0 ? (
                            <p style={{ textAlign: 'center', color: '#888', padding: '2rem' }}>No orders yet.</p>
                        ) : (
                            <div style={{ overflowX: 'auto' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead>
                                        <tr style={{ borderBottom: '2px solid #eee' }}>
                                            <th style={{ padding: '1rem', textAlign: 'left', color: '#666' }}>Order ID</th>
                                            <th style={{ padding: '1rem', textAlign: 'left', color: '#666' }}>Customer</th>
                                            <th style={{ padding: '1rem', textAlign: 'left', color: '#666' }}>Date</th>
                                            <th style={{ padding: '1rem', textAlign: 'left', color: '#666' }}>Items</th>
                                            <th style={{ padding: '1rem', textAlign: 'left', color: '#666' }}>Total</th>
                                            <th style={{ padding: '1rem', textAlign: 'left', color: '#666' }}>Status</th>
                                            <th style={{ padding: '1rem', textAlign: 'left', color: '#666' }}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allOrders.map(order => (
                                            <tr key={order.id} style={{ borderBottom: '1px solid #eee' }}>
                                                <td style={{ padding: '1rem', color: 'var(--color-primary)', fontWeight: 'bold' }}>
                                                    {order.id}
                                                </td>
                                                <td style={{ padding: '1rem' }}>{order.userEmail || 'N/A'}</td>
                                                <td style={{ padding: '1rem', color: '#666' }}>{order.date}</td>
                                                <td style={{ padding: '1rem' }}>{order.items?.length || 0} items</td>
                                                <td style={{ padding: '1rem', fontWeight: 'bold' }}>₹{order.total}</td>
                                                <td style={{ padding: '1rem' }}>
                                                    <span style={{
                                                        background: statusColors[order.status] || '#888',
                                                        color: 'white',
                                                        padding: '0.25rem 0.75rem',
                                                        borderRadius: '20px',
                                                        fontSize: '0.8rem'
                                                    }}>
                                                        {order.status}
                                                    </span>
                                                </td>
                                                <td style={{ padding: '1rem' }}>
                                                    <select
                                                        value={order.status}
                                                        onChange={(e) => handleStatusChange(order.id, order.userId, e.target.value)}
                                                        style={{
                                                            padding: '0.5rem',
                                                            borderRadius: 'var(--radius-sm)',
                                                            border: '1px solid #ddd',
                                                            cursor: 'pointer'
                                                        }}
                                                    >
                                                        <option value="Ordered">Ordered</option>
                                                        <option value="Processing">Processing</option>
                                                        <option value="Shipped">Shipped</option>
                                                        <option value="Delivered">Delivered</option>
                                                        <option value="Cancelled">Cancelled</option>
                                                    </select>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}

                {/* Products Tab */}
                {activeTab === 'products' && (
                    <div style={{
                        background: 'white',
                        padding: '2rem',
                        borderRadius: 'var(--radius-lg)',
                        boxShadow: 'var(--shadow-sm)'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h2 style={{ color: 'var(--color-primary)' }}>🛍️ Products</h2>
                            <button
                                className="btn btn-primary"
                                onClick={() => setShowAddProduct(!showAddProduct)}
                            >
                                {showAddProduct ? '✕ Cancel' : '+ Add Product'}
                            </button>
                        </div>

                        {showAddProduct && (
                            <form onSubmit={handleAddProduct} style={{
                                background: '#f9f9f9',
                                padding: '1.5rem',
                                borderRadius: 'var(--radius-md)',
                                marginBottom: '1.5rem'
                            }}>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                                    <input
                                        type="text"
                                        placeholder="Product Name"
                                        value={newProduct.name}
                                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                                        style={{ padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid #ddd' }}
                                        required
                                    />
                                    <input
                                        type="number"
                                        placeholder="Price (₹)"
                                        value={newProduct.price}
                                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                                        style={{ padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid #ddd' }}
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="Category"
                                        value={newProduct.category}
                                        onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                                        style={{ padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid #ddd' }}
                                    />
                                    <input
                                        type="url"
                                        placeholder="Image URL"
                                        value={newProduct.image}
                                        onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                                        style={{ padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid #ddd' }}
                                    />
                                </div>
                                <textarea
                                    placeholder="Description"
                                    value={newProduct.description}
                                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        borderRadius: 'var(--radius-sm)',
                                        border: '1px solid #ddd',
                                        marginTop: '1rem',
                                        minHeight: '80px',
                                        resize: 'vertical'
                                    }}
                                />
                                <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>
                                    Add Product
                                </button>
                            </form>
                        )}

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                            {products.map(product => (
                                <div key={product.id} style={{
                                    border: '1px solid #eee',
                                    borderRadius: 'var(--radius-md)',
                                    overflow: 'hidden',
                                    transition: 'transform 0.3s, box-shadow 0.3s'
                                }}>
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                                    />
                                    <div style={{ padding: '1rem' }}>
                                        <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>{product.name}</h3>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{ color: 'var(--color-primary)', fontWeight: 'bold' }}>₹{product.price}</span>
                                            <span style={{
                                                background: '#f0f0f0',
                                                padding: '0.2rem 0.5rem',
                                                borderRadius: '4px',
                                                fontSize: '0.8rem'
                                            }}>
                                                {product.category}
                                            </span>
                                        </div>
                                        <button
                                            onClick={() => handleDeleteProduct(product.id)}
                                            style={{
                                                width: '100%',
                                                marginTop: '1rem',
                                                padding: '0.5rem',
                                                background: '#ffebee',
                                                color: '#c62828',
                                                border: 'none',
                                                borderRadius: 'var(--radius-sm)',
                                                cursor: 'pointer',
                                                transition: 'background 0.3s'
                                            }}
                                        >
                                            🗑️ Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Services Tab */}
                {activeTab === 'services' && (
                    <div style={{
                        background: 'white',
                        padding: '2rem',
                        borderRadius: 'var(--radius-lg)',
                        boxShadow: 'var(--shadow-sm)'
                    }}>
                        <h2 style={{ marginBottom: '1.5rem', color: 'var(--color-primary)' }}>💆 Services</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                            {services.map(service => (
                                <div key={service.id} style={{
                                    border: '1px solid #eee',
                                    borderRadius: 'var(--radius-md)',
                                    overflow: 'hidden'
                                }}>
                                    <img
                                        src={service.image}
                                        alt={service.name}
                                        style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                                    />
                                    <div style={{ padding: '1rem' }}>
                                        <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>{service.name}</h3>
                                        <p style={{ color: 'var(--color-primary)', fontWeight: 'bold' }}>₹{service.price}</p>
                                        <p style={{ color: '#666', fontSize: '0.85rem', marginTop: '0.5rem' }}>{service.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Admin;
