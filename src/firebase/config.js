// Firebase configuration and initialization
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, get, push, onValue, remove, update } from 'firebase/database';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDwYUGCnBrL2g9ucn8hnc7gAMlXqdMIMBw",
    authDomain: "beauty-parlor-bb791.firebaseapp.com",
    databaseURL: "https://beauty-parlor-bb791-default-rtdb.firebaseio.com",
    projectId: "beauty-parlor-bb791",
    storageBucket: "beauty-parlor-bb791.firebasestorage.app",
    messagingSenderId: "690512776532",
    appId: "1:690512776532:web:2b60d9fda420f14906ccc1",
    measurementId: "G-8QDB41K5B0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database
const database = getDatabase(app);

// Initialize Authentication
const auth = getAuth(app);

// Database helper functions
export const dbRef = (path) => ref(database, path);

// Write data to database
export const writeData = async (path, data) => {
    try {
        await set(ref(database, path), data);
        return { success: true };
    } catch (error) {
        console.error('Error writing to database:', error);
        return { success: false, error };
    }
};

// Push new data (auto-generate key)
export const pushData = async (path, data) => {
    try {
        const newRef = push(ref(database, path));
        await set(newRef, data);
        return { success: true, key: newRef.key };
    } catch (error) {
        console.error('Error pushing to database:', error);
        return { success: false, error };
    }
};

// Read data once
export const readData = async (path) => {
    try {
        const snapshot = await get(ref(database, path));
        if (snapshot.exists()) {
            return { success: true, data: snapshot.val() };
        } else {
            return { success: true, data: null };
        }
    } catch (error) {
        console.error('Error reading from database:', error);
        return { success: false, error };
    }
};

// Update data
export const updateData = async (path, data) => {
    try {
        await update(ref(database, path), data);
        return { success: true };
    } catch (error) {
        console.error('Error updating database:', error);
        return { success: false, error };
    }
};

// Delete data
export const deleteData = async (path) => {
    try {
        await remove(ref(database, path));
        return { success: true };
    } catch (error) {
        console.error('Error deleting from database:', error);
        return { success: false, error };
    }
};

// Listen to real-time updates
export const subscribeToData = (path, callback) => {
    const unsubscribe = onValue(ref(database, path), (snapshot) => {
        callback(snapshot.val());
    });
    return unsubscribe;
};

// Authentication functions
export const registerUser = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return { success: true, user: userCredential.user };
    } catch (error) {
        console.error('Error registering user:', error);
        return { success: false, error: error.message };
    }
};

export const loginUser = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return { success: true, user: userCredential.user };
    } catch (error) {
        console.error('Error logging in:', error);
        return { success: false, error: error.message };
    }
};

export const logoutUser = async () => {
    try {
        await signOut(auth);
        return { success: true };
    } catch (error) {
        console.error('Error logging out:', error);
        return { success: false, error: error.message };
    }
};

// Auth state observer
export const onAuthChange = (callback) => {
    return onAuthStateChanged(auth, callback);
};

export { app, database, auth };
