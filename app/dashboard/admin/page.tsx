'use client'

// pages/dashboard/admin.tsx
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getUserRole } from "@/util/checkUserRole";

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        const role = getUserRole();

        if (!role) {
            router.push('/login');
        }
        
        // Redirect to user dashboard if role is not 'admin'
        if (role !== 'ADMIN') {
            router.push('/dashboard/user');
        }
    }, [router]);

    return (
        <div>
            <h1>Admin Dashboard</h1>
            {/* Admin-specific content goes here */}
        </div>
    );
}
