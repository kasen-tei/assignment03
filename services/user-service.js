const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Register
export async function register(userData) {
    const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message);
    }

    return data;
}

// Login
export async function login(userData) {
    const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message);
    }

    // Save token
    localStorage.setItem("token", data.token);

    return data;
}

// Get Token
function getToken() {
    return localStorage.getItem("token");
}

// Get Favourites
export async function getFavourites() {
    const res = await fetch(`${API_URL}/favourites`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.error);
    }

    return data;
}

// Add Favourite
export async function addFavourite(id) {
    const res = await fetch(`${API_URL}/favourites/${id}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.error);
    }

    return data;
}

// Remove Favourite
export async function removeFavourite(id) {
    const res = await fetch(`${API_URL}/favourites/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.error);
    }

    return data;
}