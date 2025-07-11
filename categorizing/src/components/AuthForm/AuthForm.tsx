import React, { useState } from 'react';
import './AuthForm.css';
import PasswordInput from './PasswordInput/PasswordInput';

type Props = {
    isSignup?: boolean;
    onSubmit: (email: string, password: string) => void;
    onGoogleLogin: () => void;
    switchForm: () => void;
};

const AuthForm: React.FC<Props> = ({ isSignup, onSubmit, onGoogleLogin, switchForm }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false); // only for signup

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isSignup && password !== confirmPassword) return alert('Passwords do not match');
        onSubmit(email, password);
    };

    return (
        <form className="auth-form" onSubmit={handleSubmit}>
            <h2>{isSignup ? 'Sign Up' : 'Login'}</h2>
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

            <label>Password</label>
            <PasswordInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
            />

            {isSignup && (
                <>
                    <label>Confirm Password</label>
                    <PasswordInput
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        showPassword={showConfirm}
                        setShowPassword={setShowConfirm}
                    />
                </>
            )}

            <button type="submit">{isSignup ? 'Sign Up' : 'Login'}</button>
            <button type="button" onClick={onGoogleLogin}>Continue with Google</button>
            <p>
                {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
                <span className="link" onClick={switchForm}>
                    {isSignup ? 'Login' : 'Sign Up'}
                </span>
            </p>
        </form>
    );
};

export default AuthForm;