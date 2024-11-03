// utils/checkSession.ts
export function isUserLoggedIn(): boolean {
    const token = localStorage.getItem('authToken');
    return token !== null && token !== undefined;
}
