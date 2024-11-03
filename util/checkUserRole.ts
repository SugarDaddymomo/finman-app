// utils/checkUserRole.ts
export const getUserRole = (): string | null => {
    if (typeof window !== "undefined") {
        return localStorage.getItem("userRole");
    }
    return null;
};