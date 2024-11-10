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
        // <div>
        //     <Navbar />
        //     <div className="container mx-auto flex justify-between items-center flex-wrap">
        //         <h1>User Dashboard</h1>
        //         {/* User-specific content goes here */}
        //             {user ? (
                        
        //                 <div>
        //                     <h1>Welcome, {user.firstName}</h1>
        //                     <p>Mobile: {user.mobile}</p>
        //                     {/* Display other user details as needed */}
        //                 </div>
        //             ) : (
        //                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        //                 // <p>Loading user data...</p>
        //             )}
        //     </div>
        //     <Footer />
        // </div>
        <div>
            <Navbar />
            <main className="container mx-auto p-8 bg-gray-100 min-h-screen">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Welcome, {user?.firstName || 'User'}!</h1>

                {user ? (
                    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {/* Profile Information Card */}
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h2 className="text-xl font-semibold mb-2 text-gray-700">Profile Information</h2>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Mobile:</strong> {user.mobile}</p>
                            <p><strong>Occupation:</strong> {user.occupation}</p>
                        </div>

                        {/* Score Generator Quick Access */}
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h2 className="text-xl font-semibold mb-2 text-gray-700">Score Generator</h2>
                            <p>Generate and view your latest scores here.</p>
                            <button 
                                className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                                onClick={() => router.push('/dashboard/score-generator')}
                            >
                                Go to Score Generator
                            </button>
                        </div>

                        {/* Services Quick Access */}
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h2 className="text-xl font-semibold mb-2 text-gray-700">Our Services</h2>
                            <p>Explore the range of services we offer to enhance your experience.</p>
                            <button 
                                className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                                onClick={() => router.push('/dashboard/services')}
                            >
                                View Services
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex justify-center items-center h-64">
                        <Loader2 className="animate-spin text-blue-500 h-8 w-8" />
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}
