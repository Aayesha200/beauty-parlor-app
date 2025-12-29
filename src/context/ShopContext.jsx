import React, { createContext, useContext, useState, useEffect } from 'react';
import {
    subscribeToData,
    writeData,
    pushData,
    readData,
    updateData,
    deleteData,
    loginUser,
    registerUser,
    logoutUser,
    onAuthChange
} from '../firebase/config';

const ShopContext = createContext();

export const useShop = () => useContext(ShopContext);

// Default products (will be synced to Firebase)
const DEFAULT_PRODUCTS = [
    {
        id: 1,
        name: 'Himalaya Neem Face Wash',
        price: 150,
        category: 'Face Wash',
        image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=500',
        description: 'Purifying Neem Face Wash is a soap-free, herbal formulation that cleans impurities and helps clear pimples.',
        rating: 4.5
    },
    {
        id: 2,
        name: 'Pilgrim Sunscreen SPF 50',
        price: 450,
        category: 'Sunscreen',
        image: 'https://images.unsplash.com/photo-1556228720-1957be83f706?auto=format&fit=crop&q=80&w=500',
        description: 'Protect your skin with Pilgrim Sunscreen. Non-greasy and leaves no white cast.',
        rating: 4.8
    },
    {
        id: 3,
        name: 'Forest Essentials Lip Balm',
        price: 795,
        category: 'Lip Care',
        image: 'https://images.unsplash.com/photo-1599305090598-fe179d501227?auto=format&fit=crop&q=80&w=500',
        description: 'Luscious Sugared Rose Petal Lip Balm for hydrated and soft lips.',
        rating: 4.9
    },
    {
        id: 4,
        name: 'Aishu Herbal Mehandi Cone',
        price: 30,
        category: 'Mehandi',
        image: 'https://images.unsplash.com/photo-1596704017382-30538038f8f2?auto=format&fit=crop&q=80&w=500',
        description: 'Organic natural mehandi for dark stain.',
        rating: 4.7
    },
    {
        id: 5,
        name: 'Gold Facial Kit',
        price: 1200,
        category: 'Skincare',
        image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=500',
        description: 'Complete gold facial kit for glowing skin at home.',
        rating: 4.6
    }
];

const DEFAULT_SERVICES = [
    {
        id: 1,
        name: 'Bridal Mehandi',
        price: 2500,
        image: 'https://images.unsplash.com/photo-1596704017235-dca236163353?auto=format&fit=crop&q=80&w=500',
        description: 'Intricate and beautiful bridal mehandi designs.',
    },
    {
        id: 2,
        name: 'Facial Treatment',
        price: 800,
        image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=500',
        description: 'Rejuvenating facial treatments for all skin types.',
    },
    {
        id: 3,
        name: 'Threading & Waxing',
        price: 100,
        image: 'https://images.unsplash.com/photo-1487412947132-2d93399118b6?auto=format&fit=crop&q=80&w=500',
        description: 'Precise threading and smooth waxing services.',
    },
    {
        id: 4,
        name: 'Complete Beauty Care',
        price: 5000,
        image: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?auto=format&fit=crop&q=80&w=500',
        description: 'Full body beauty care package.',
    }
];

export const ShopProvider = ({ children }) => {
    const [products, setProducts] = useState(DEFAULT_PRODUCTS);
    const [services, setServices] = useState(DEFAULT_SERVICES);
    const [cart, setCart] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [authError, setAuthError] = useState(null);

    // Initialize Firebase data and listen for auth changes
    useEffect(() => {
        // Listen for authentication state changes
        const unsubscribeAuth = onAuthChange(async (firebaseUser) => {
            if (firebaseUser) {
                // User is signed in, fetch user data from database
                const result = await readData(`users/${firebaseUser.uid}`);
                if (result.success && result.data) {
                    setUser({
                        uid: firebaseUser.uid,
                        email: firebaseUser.email,
                        ...result.data
                    });

                    // Load user's cart from Firebase
                    const cartResult = await readData(`carts/${firebaseUser.uid}`);
                    if (cartResult.success && cartResult.data) {
                        setCart(Object.values(cartResult.data));
                    }

                    // Load user's wishlist from Firebase
                    const wishlistResult = await readData(`wishlists/${firebaseUser.uid}`);
                    if (wishlistResult.success && wishlistResult.data) {
                        setWishlist(Object.values(wishlistResult.data));
                    }

                    // Load user's orders from Firebase
                    const ordersResult = await readData(`orders/${firebaseUser.uid}`);
                    if (ordersResult.success && ordersResult.data) {
                        setOrders(Object.values(ordersResult.data));
                    }
                } else {
                    // New user, create user record
                    const userData = {
                        name: firebaseUser.displayName || 'Customer',
                        email: firebaseUser.email,
                        role: firebaseUser.email === 'admin@aishu.com' ? 'admin' : 'user',
                        createdAt: new Date().toISOString()
                    };
                    await writeData(`users/${firebaseUser.uid}`, userData);
                    setUser({ uid: firebaseUser.uid, ...userData });
                }
            } else {
                // User is signed out
                setUser(null);
                setCart([]);
                setWishlist([]);
                setOrders([]);
            }
            setLoading(false);
        });

        // Subscribe to products updates from Firebase
        const unsubscribeProducts = subscribeToData('products', (data) => {
            if (data) {
                setProducts(Object.values(data));
            }
        });

        // Subscribe to services updates from Firebase
        const unsubscribeServices = subscribeToData('services', (data) => {
            if (data) {
                setServices(Object.values(data));
            }
        });

        // Initialize products and services in Firebase if empty
        const initializeData = async () => {
            const productsResult = await readData('products');
            if (!productsResult.data) {
                // Write default products to Firebase
                const productsData = {};
                DEFAULT_PRODUCTS.forEach(product => {
                    productsData[product.id] = product;
                });
                await writeData('products', productsData);
            }

            const servicesResult = await readData('services');
            if (!servicesResult.data) {
                // Write default services to Firebase
                const servicesData = {};
                DEFAULT_SERVICES.forEach(service => {
                    servicesData[service.id] = service;
                });
                await writeData('services', servicesData);
            }
        };

        initializeData();

        return () => {
            unsubscribeAuth();
            unsubscribeProducts();
            unsubscribeServices();
        };
    }, []);

    // Sync cart to Firebase when it changes
    useEffect(() => {
        if (user && cart.length >= 0) {
            const cartData = {};
            cart.forEach(item => {
                cartData[item.id] = item;
            });
            writeData(`carts/${user.uid}`, cartData);
        }
    }, [cart, user]);

    // Sync wishlist to Firebase when it changes
    useEffect(() => {
        if (user && wishlist.length >= 0) {
            const wishlistData = {};
            wishlist.forEach(item => {
                wishlistData[item.id] = item;
            });
            writeData(`wishlists/${user.uid}`, wishlistData);
        }
    }, [wishlist, user]);

    const addToCart = (product) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (id) => {
        setCart(prev => prev.filter(item => item.id !== id));
    };

    const updateQuantity = (id, delta) => {
        setCart(prev => prev.map(item => {
            if (item.id === id) {
                return { ...item, quantity: Math.max(1, item.quantity + delta) };
            }
            return item;
        }));
    };

    const clearCart = () => {
        setCart([]);
        if (user) {
            deleteData(`carts/${user.uid}`);
        }
    };

    const placeOrder = async (orderDetails) => {
        const newOrder = {
            id: 'ORD' + Date.now(),
            date: new Date().toLocaleDateString(),
            timestamp: new Date().toISOString(),
            items: cart,
            total: cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
            status: 'Ordered',
            ...orderDetails
        };

        if (user) {
            // Save order to Firebase
            await writeData(`orders/${user.uid}/${newOrder.id}`, newOrder);
            // Also save to all orders for admin
            await writeData(`allOrders/${newOrder.id}`, {
                ...newOrder,
                userId: user.uid,
                userEmail: user.email
            });
        }

        setOrders(prev => [newOrder, ...prev]);
        clearCart();
        return newOrder.id;
    };

    const toggleWishlist = (product) => {
        setWishlist(prev => {
            if (prev.find(item => item.id === product.id)) {
                return prev.filter(item => item.id !== product.id);
            }
            return [...prev, product];
        });
    };

    // Default admin credentials
    const DEFAULT_ADMIN = {
        email: 'admin@aishu.com',
        password: 'admin123'
    };

    const login = async (email, password) => {
        setAuthError(null);

        // Check for default admin login (works without Firebase signup)
        if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
            const adminUser = {
                uid: 'admin-default',
                name: 'Aishu Admin',
                email: DEFAULT_ADMIN.email,
                role: 'admin'
            };
            setUser(adminUser);
            setLoading(false);
            return true;
        }

        // Regular Firebase authentication
        const result = await loginUser(email, password);
        if (!result.success) {
            setAuthError(result.error);
            return false;
        }
        return true;
    };

    const signup = async (email, password, name) => {
        setAuthError(null);
        const result = await registerUser(email, password);
        if (result.success) {
            // Create user profile in database
            const userData = {
                name: name || 'Customer',
                email: email,
                role: email === 'admin@aishu.com' ? 'admin' : 'user',
                createdAt: new Date().toISOString()
            };
            await writeData(`users/${result.user.uid}`, userData);
            return true;
        }
        setAuthError(result.error);
        return false;
    };

    const logout = async () => {
        await logoutUser();
        setUser(null);
        setCart([]);
        setWishlist([]);
        setOrders([]);
    };

    // Admin functions
    const addProduct = async (product) => {
        const newId = Date.now();
        const newProduct = { ...product, id: newId };
        await writeData(`products/${newId}`, newProduct);
        return newId;
    };

    const updateProduct = async (id, updates) => {
        await updateData(`products/${id}`, updates);
    };

    const deleteProduct = async (id) => {
        await deleteData(`products/${id}`);
    };

    const addService = async (service) => {
        const newId = Date.now();
        const newService = { ...service, id: newId };
        await writeData(`services/${newId}`, newService);
        return newId;
    };

    const getAllOrders = async () => {
        const result = await readData('allOrders');
        if (result.success && result.data) {
            return Object.values(result.data);
        }
        return [];
    };

    const updateOrderStatus = async (orderId, userId, status) => {
        await updateData(`orders/${userId}/${orderId}`, { status });
        await updateData(`allOrders/${orderId}`, { status });
    };

    return (
        <ShopContext.Provider value={{
            products,
            services,
            cart,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            wishlist,
            toggleWishlist,
            user,
            login,
            signup,
            logout,
            placeOrder,
            orders,
            loading,
            authError,
            // Admin functions
            addProduct,
            updateProduct,
            deleteProduct,
            addService,
            getAllOrders,
            updateOrderStatus
        }}>
            {children}
        </ShopContext.Provider>
    );
};
