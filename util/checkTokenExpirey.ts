// utils/checkUserRole.ts
export const isTokenExpired = (token: string | null): boolean => {
    if (!token) return true;
    const payload = JSON.parse(atob(token.split('.')[1]));
    return (payload.exp * 1000) < Date.now();
};