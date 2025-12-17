export const getToken = () => {
    return localStorage.getItem('token');
};

export const decode = async(token) => {
    try {
        const response = await fetch('http://localhost:8000/decode?token=' + token, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const data = await response.json();
        console.log("Decoded:", data);
        return data.decoded;
    } catch (e) {
        console.error("Decode error:", e);
        return null; // Return null if decode fails
    }
}


// Client-side synchronous decode for UI checks
export const decodeToken = (token) => {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    } catch (e) {
        return null;
    }
};


export const isAdmin = () => {
    const role = localStorage.getItem('role');
    if (!role) return false;
    return role.toLowerCase() === 'admin';
};
