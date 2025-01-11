import { useState } from 'react';
import Login from './Login';
import Signup from './Signup';

const AuthContainer = ({ onAuthSuccess }) => {
    const [isLogin, setIsLogin] = useState(true);

    const toggleAuthMode = () => {
        setIsLogin(!isLogin);
    };

    return (
        <div>
            {isLogin ? (
                <Login onLoginSuccess={onAuthSuccess} />
            ) : (
                <Signup onSignupSuccess={onAuthSuccess} />
            )}
            <div className="text-center mt-4">
                <button
                    onClick={toggleAuthMode}
                    className="text-blue-500 hover:text-blue-700"
                >
                    {isLogin
                        ? "Don't have an account? Sign up"
                        : 'Already have an account? Login'}
                </button>
            </div>
        </div>
    );
};

export default AuthContainer;