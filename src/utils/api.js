import { store } from '../store/store';
import { logout, updateToken } from '../store/userSlice';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;
const REFRESH_URL = "https://www.lextorah-elearning.com/ap/laravel/api/refresh-token";

export const apiClient = async (endpoint, options = {}) => {
    let state = store.getState();
    let token = state.user.token;

    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (options.body instanceof FormData) {
        delete headers['Content-Type'];
    }

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const config = {
        ...options,
        headers,
    };
    
    // Handle full URL or relative path
    const url = endpoint.startsWith('http') ? endpoint : `${BASE_URL}${endpoint}`;

    try {
        let response = await fetch(url, config);

        if (response.status === 401) {
            console.log("Got 401 for", url, "- attempting refresh...");
            // Attempt to refresh token
            try {
                const refreshResponse = await fetch(REFRESH_URL, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                
                console.log("Refresh response status:", refreshResponse.status);

                if (refreshResponse.ok) {
                    const data = await refreshResponse.json();
                    console.log("Refresh data:", data);
                    const newToken = data.token || data.access_token; 
                    
                    if (newToken) {
                        console.log("Got new token, retrying...");
                        store.dispatch(updateToken(newToken));
                        
                        // Retry original request with new token
                        config.headers['Authorization'] = `Bearer ${newToken}`;
                        return await fetch(url, config);
                    } else {
                        console.error("No token in refresh response");
                    }
                } 
                
                // Only logout if checking refresh token explicitly failed auth
                if (refreshResponse.status === 401 || refreshResponse.status === 403) {
                    console.warn("Refresh failed with 401/403, logging out.");
                    store.dispatch(logout());
                }
                
                return response;

            } catch (refreshError) {
                console.error("Token refresh failed:", refreshError);
                // Do not logout on network errors, just return original 401
                return response; 
            }
        }

        return response;
    } catch (error) {
        console.error("API request failed:", error);
        throw error;
    }
};
