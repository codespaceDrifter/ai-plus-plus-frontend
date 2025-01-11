// Authentication service

export const AUTH_TOKEN_KEY = 'auth_token';
export const USER_DATA_KEY = 'user_data';

// Simulated authentication API calls
// In a real application, these would make actual API calls to your backend
export const authService = {
    login: async (email, password) => {
        try {
            // Validate email and password
            if (!email || !password) {
                throw new Error('Email and password are required');
            }

            if (!email.includes('@')) {
                throw new Error('Invalid email format');
            }

            // Here you would typically make an API call to your backend
            // For now, we'll simulate a successful login if the email contains '@'
            const userData = {
                email,
                id: Math.random().toString(36).substr(2, 9),
                name: email.split('@')[0]
            };

            // Store authentication data
            localStorage.setItem(AUTH_TOKEN_KEY, `dummy-token-${userData.id}`);
            localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));

            return userData;
        } catch (error) {
            throw error;
        }
    },

    signup: async (email, password) => {
        try {
            // Validate email and password
            if (!email || !password) {
                throw new Error('Email and password are required');
            }

            if (!email.includes('@')) {
                throw new Error('Invalid email format');
            }

            if (password.length < 6) {
                throw new Error('Password must be at least 6 characters long');
            }

            // Here you would typically make an API call to your backend
            const userData = {
                email,
                id: Math.random().toString(36).substr(2, 9),
                name: email.split('@')[0]
            };

            // Store authentication data
            localStorage.setItem(AUTH_TOKEN_KEY, `dummy-token-${userData.id}`);
            localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));

            return userData;
        } catch (error) {
            throw error;
        }
    },

    logout: () => {
        localStorage.removeItem(AUTH_TOKEN_KEY);
        localStorage.removeItem(USER_DATA_KEY);
    },

    getCurrentUser: () => {
        const userDataString = localStorage.getItem(USER_DATA_KEY);
        return userDataString ? JSON.parse(userDataString) : null;
    },

    isAuthenticated: () => {
        return !!localStorage.getItem(AUTH_TOKEN_KEY);
    }
};