import { useState, useEffect } from 'react';
import PageNav from "../../components/PageNav/PageNav";
import { authService } from '../../services/auth';
import AuthContainer from '../../components/Auth/AuthContainer';

const HomePage = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Check if user is already logged in
        const currentUser = authService.getCurrentUser();
        if (currentUser) {
            setUser(currentUser);
        }
    }, []);

    const handleAuthSuccess = (userData) => {
        setUser(userData);
    };

    const handleLogout = () => {
        authService.logout();
        setUser(null);
    };

    if (!user) {
        return (
            <>
                <PageNav />
                <AuthContainer onAuthSuccess={handleAuthSuccess} />
            </>
        );
    }

    return (
        <>
            <PageNav />
            <div className="max-w-4xl mx-auto p-6">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Welcome, {user.name}!</h1>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                        Logout
                    </button>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-4">Your Dashboard</h2>
                    <p>This is your personalized dashboard. You're logged in as {user.email}</p>
                </div>
            </div>
        </>
    );
};

export default HomePage;
