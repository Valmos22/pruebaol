
export const fetchWithAuth = async (url, options = {}) => {
    const token = localStorage.getItem('token');

    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${url}`, {
        ...options,
        headers,
    });

    // if (!response.ok) {
    //     const error = await response.json();
    //     throw new Error(error.message || 'Error en la petición');
    // }

    // Si la respuesta no tiene contenido, simplemente devuelve un objeto vacío
    if (response.status === 204 || response.status === 205) {
        return {};
    }

    // Si la respuesta tiene contenido, intenta parsearlo como JSON
    const text = await response.text();
    try {
        return text ? JSON.parse(text) : {}; // Si no hay texto, devuelve un objeto vacío
    } catch (error) {
        throw new Error('Error al parsear la respuesta como JSON');
    }
};
