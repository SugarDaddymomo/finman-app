'use client'

// pages/dashboard/admin.tsx
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getUserRole } from "@/util/checkUserRole";
import Navbar from "@/components/customComponents/Navbar";
import Footer from "@/components/customComponents/Footer";
import Sidebar from "@/components/customComponents/Sidebar";
import { getPaginatedUsers } from "@/util/apiService";

export default function Home() {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
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
        <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Navbar />
                <main className="container mx-auto p-8 bg-gray-100 flex-1">
                    <h1>Admin Dashboard</h1>
                    {/* Admin-specific content goes here */}
                </main>
                <Footer />
            </div>
        </div>
    );
}
