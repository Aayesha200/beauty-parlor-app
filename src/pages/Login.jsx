import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { login, signup, user, authError, loading } = useShop();
    const navigate = useNavigate();
    const [isSignup, setIsSignup] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        try {
            if (isSignup) {
                if (password.length < 6) {
                    setError('Password must be at least 6 characters');
                    setIsSubmitting(false);
                    return;
                }
                const success = await signup(email, password, name);
                if (success) {
                    navigate('/');
                }
            } else {
                const success = await login(email, password);
                if (success) {
                    navigate('/');
                }
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        }

        setIsSubmitting(false);
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

    if (user) {
        return (
            <div className="section" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="container" style={{ maxWidth: '500px', width: '100%' }}>
                    <div style={{
                        background: 'linear-gradient(135deg, #fff 0%, #fdf6f9 100%)',
                        padding: '2.5rem',
                        borderRadius: 'var(--radius-lg)',
                        boxShadow: 'var(--shadow-lg)',
                        textAlign: 'center'
                    }}>
                        <div style={{
                            width: '80px',
                            height: '80px',
                            background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 1.5rem',
                            fontSize: '2rem',
                            color: 'white'
                        }}>
                            {user.name?.charAt(0)?.toUpperCase() || '👤'}
                        </div>
                        <h2 style={{ marginBottom: '0.5rem', color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>
                            Welcome, {user.name}!
                        </h2>
                        <p style={{ color: '#666', marginBottom: '1.5rem' }}>{user.email}</p>
                        {user.role === 'admin' && (
                            <span style={{
                                background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                                color: '#fff',
                                padding: '0.3rem 1rem',
                                borderRadius: '20px',
                                fontSize: '0.85rem',
                                fontWeight: 'bold',
                                display: 'inline-block',
                                marginBottom: '1.5rem'
                            }}>
                                ⭐ Admin
                            </span>
                        )}
                        <p style={{ color: '#888', marginBottom: '1rem' }}>You are logged in successfully.</p>
                        <button
                            onClick={() => navigate('/')}
                            className="btn btn-primary"
                            style={{ marginTop: '0.5rem' }}
                        >
                            Continue Shopping
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="section" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <style>
                {`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}
            </style>
            <div className="container" style={{ maxWidth: '420px', width: '100%' }}>
                <div style={{
                    background: 'linear-gradient(135deg, #fff 0%, #fdf6f9 100%)',
                    padding: '2.5rem',
                    borderRadius: 'var(--radius-lg)',
                    boxShadow: 'var(--shadow-lg)'
                }}>
                    <h2 className="text-center" style={{
                        marginBottom: '0.5rem',
                        color: 'var(--color-primary)',
                        fontFamily: 'var(--font-heading)'
                    }}>
                        {isSignup ? 'Create Account' : 'Welcome Back'}
                    </h2>
                    <p className="text-center" style={{
                        color: '#888',
                        marginBottom: '2rem',
                        fontSize: '0.9rem'
                    }}>
                        {isSignup ? 'Join Aishu Beauty Shop today!' : 'Sign in to continue shopping'}
                    </p>

                    {(error || authError) && (
                        <div style={{
                            background: '#ffebee',
                            color: '#c62828',
                            padding: '0.75rem 1rem',
                            borderRadius: 'var(--radius-sm)',
                            marginBottom: '1.5rem',
                            fontSize: '0.9rem',
                            textAlign: 'center'
                        }}>
                            {error || authError}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        {isSignup && (
                            <div>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '0.5rem',
                                    fontSize: '0.9rem',
                                    color: '#555',
                                    fontWeight: '500'
                                }}>
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter your name"
                                    style={{
                                        width: '100%',
                                        padding: '0.85rem 1rem',
                                        borderRadius: 'var(--radius-sm)',
                                        border: '1px solid #e0e0e0',
                                        outline: 'none',
                                        transition: 'border-color 0.3s, box-shadow 0.3s',
                                        fontSize: '1rem'
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = 'var(--color-primary)';
                                        e.target.style.boxShadow = '0 0 0 3px rgba(255, 107, 157, 0.1)';
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = '#e0e0e0';
                                        e.target.style.boxShadow = 'none';
                                    }}
                                    required={isSignup}
                                />
                            </div>
                        )}
                        <div>
                            <label style={{
                                display: 'block',
                                marginBottom: '0.5rem',
                                fontSize: '0.9rem',
                                color: '#555',
                                fontWeight: '500'
                            }}>
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                style={{
                                    width: '100%',
                                    padding: '0.85rem 1rem',
                                    borderRadius: 'var(--radius-sm)',
                                    border: '1px solid #e0e0e0',
                                    outline: 'none',
                                    transition: 'border-color 0.3s, box-shadow 0.3s',
                                    fontSize: '1rem'
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = 'var(--color-primary)';
                                    e.target.style.boxShadow = '0 0 0 3px rgba(255, 107, 157, 0.1)';
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = '#e0e0e0';
                                    e.target.style.boxShadow = 'none';
                                }}
                                required
                            />
                        </div>
                        <div>
                            <label style={{
                                display: 'block',
                                marginBottom: '0.5rem',
                                fontSize: '0.9rem',
                                color: '#555',
                                fontWeight: '500'
                            }}>
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder={isSignup ? 'Create a password (min 6 chars)' : 'Enter your password'}
                                style={{
                                    width: '100%',
                                    padding: '0.85rem 1rem',
                                    borderRadius: 'var(--radius-sm)',
                                    border: '1px solid #e0e0e0',
                                    outline: 'none',
                                    transition: 'border-color 0.3s, box-shadow 0.3s',
                                    fontSize: '1rem'
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = 'var(--color-primary)';
                                    e.target.style.boxShadow = '0 0 0 3px rgba(255, 107, 157, 0.1)';
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = '#e0e0e0';
                                    e.target.style.boxShadow = 'none';
                                }}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            style={{
                                marginTop: '0.5rem',
                                opacity: isSubmitting ? 0.7 : 1,
                                cursor: isSubmitting ? 'not-allowed' : 'pointer'
                            }}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                    <span style={{
                                        width: '16px',
                                        height: '16px',
                                        border: '2px solid #fff',
                                        borderTopColor: 'transparent',
                                        borderRadius: '50%',
                                        animation: 'spin 0.8s linear infinite'
                                    }}></span>
                                    {isSignup ? 'Creating Account...' : 'Signing In...'}
                                </span>
                            ) : (
                                isSignup ? 'Create Account' : 'Sign In'
                            )}
                        </button>
                    </form>
                    <p className="text-center" style={{ marginTop: '1.5rem', color: '#666', fontSize: '0.9rem' }}>
                        {isSignup ? 'Already have an account? ' : "Don't have an account? "}
                        <span
                            onClick={() => {
                                setIsSignup(!isSignup);
                                setError('');
                            }}
                            style={{
                                color: 'var(--color-primary)',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                transition: 'color 0.3s'
                            }}
                            onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                            onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                        >
                            {isSignup ? 'Sign in' : 'Sign up'}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
