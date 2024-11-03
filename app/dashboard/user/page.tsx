'use client'

// pages/dashboard/user.tsx
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getUserRole } from "@/util/checkUserRole";
import Navbar from "@/components/customComponents/Navbar";
import Footer from "@/components/customComponents/Footer";
import { isUserLoggedIn } from "@/util/checkSession";
import { Loader2 } from "lucide-react";

interface User {
    email: string;
    firstName: string;
    lastName: string;
    mobile: string;
    occupation: string;
    // Add any other properties here
}

export default function Home() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        const role = localStorage.getItem('userRole');

        if (!token || !isUserLoggedIn() || (role !== 'USER' && role !== 'ADMIN')) {
            router.push('/login'); // Redirects if not authenticated or incorrect role
            return;
        } 

        if (role !== 'USER') {
            router.push('/dashboard/admin');
            return;
        }

        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser) as User);
        } else {
            router.push('/login');
        }

    }, [router]);


    return (
        <div>
            <Navbar />
            <div className="container mx-auto flex justify-between items-center flex-wrap">
                <h1>User Dashboard</h1>
                {/* User-specific content goes here */}
                    {user ? (
                        
                        <div>
                            <h1>Welcome, {user.firstName}</h1>
                            <p>Mobile: {user.mobile}</p>
                            {/* Display other user details as needed */}
                        </div>
                    ) : (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        // <p>Loading user data...</p>
                    )}
            </div>
            <Footer />
        </div>
    );
}
