import React, { useState } from 'react';
import Login from './Login';
import Register from './Signup';

const Account = () => {
    const [isLoginActive, setIsLoginActive] = useState(true);

    const toggleActiveComponent = () => {
        setIsLoginActive(!isLoginActive);
    };

    return (
        <div style={styles.container}>
            <div style={styles.left}>
                <Login />
                {isLoginActive && (
                    <div style={{ ...styles.box, opacity: isLoginActive ? 1 : 0 }}>
                        <p>Don't have an account? Sign up now!</p>
                        <button onClick={toggleActiveComponent} style={styles.button}>
                            Go to Sign Up
                        </button>
                    </div>
                )}
            </div>
            <div style={styles.right}>
                <Register />
                {!isLoginActive && (
                    <div style={{ ...styles.box, opacity: isLoginActive ? 0 : 1 }}>
                        <p>Already have an account? Log in here!</p>
                        <button onClick={toggleActiveComponent} style={styles.button}>
                            Go to Login
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'row' as 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100vh',
    },
    left: {
        flex: 1,
        padding: '20px',
        textAlign: 'center' as 'center',
        borderRight: '1px solid #ccc',
        position: 'relative' as 'relative',
        height: '100vh', // Full height for the left section
    },
    right: {
        flex: 1,
        padding: '20px',
        textAlign: 'center' as 'center',
        position: 'relative' as 'relative',
        height: '100vh', // Full height for the right section
    },
    box: {
        position: 'absolute' as 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column' as 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 20px',
        backgroundColor: 'rgba(255, 255, 255, 0.9)', // Semi-transparent background
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        zIndex: 1, // Ensure the box is on top
        transition: 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out', // Smooth transition
        transform: 'scale(1)', // Initial scale (no zoom)
    },
    button: {
        marginTop: '10px',
        padding: '10px 20px',
        backgroundColor: '#007BFF',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};

export default Account;
