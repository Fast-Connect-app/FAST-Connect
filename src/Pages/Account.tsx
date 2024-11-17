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
            <div style={{...styles.left,  transform : isLoginActive ? 'translateX(0)' : 'translateX(100%)', opacity : isLoginActive ? 1 : 0}}>
                <Login />
                <div
                    style={{
                        ...styles.box,
                        transform: isLoginActive ? 'translateX(100%)' : 'translateX(0)', // Box moves right when switching
                        opacity: isLoginActive ? 1 : 0, // Fade out when the box moves
                    }}
                >
                    <p>Don't have an account? Sign up now!</p>
                    <button onClick={toggleActiveComponent} style={styles.button}>
                        Go to Sign up
                    </button>
                </div>
            </div>
            <div style={{...styles.right, transform : isLoginActive ? 'translateX(-100%)' : 'translateX(0)', opacity : isLoginActive ? 0 : 1}}>
                <Register />
                <div
                    style={{
                        ...styles.box,
                        transform: isLoginActive ? 'translateX(0)' : 'translateX(-100%)', // Box moves left when switching
                        opacity: isLoginActive ? 0 : 1, // Fade out when the box moves
                    }}
                >
                    <p>Already have an account? Log in here!</p>
                    <button onClick={toggleActiveComponent} style={styles.button}>
                        Go to Login
                    </button>
                </div>
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
        position: 'relative' as 'relative',
        overflow: 'hidden', // Prevent overflow when transitioning
    },
    left: {
        flex: 1,
        padding: '20px',
        textAlign: 'center' as 'center',
        position: 'relative' as 'relative',
        height: '100vh',
        transition: 'transform 0.5s ease-in-out, opacity 0.5s ease-in-out', // Add transition for sliding and fading
    },
    right: {
        flex: 1,
        padding: '20px',
        textAlign: 'center' as 'center',
        position: 'relative' as 'relative',
        height: '100vh',
        transition: 'transform 0.5s ease-in-out, opacity 0.5s ease-in-out', // Add transition for sliding and fading
    },
    box: {
        position: 'absolute' as 'absolute',
        top: '0',
        left: '0%',
        transform: 'translateX(-50%)', // Center the box horizontally
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column' as 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 20px',
        backgroundColor: '#D5BA98',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        zIndex: 1,
        transition: 'transform 0.5s ease-in-out, opacity 0.5s ease-in-out', // Add transition for sliding and fading
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
