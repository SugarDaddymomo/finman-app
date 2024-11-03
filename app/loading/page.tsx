'use client'

import Footer from "@/components/customComponents/Footer";
import Navbar from "@/components/customComponents/Navbar";
import { Button } from "@/components/ui/button";
import { isTokenExpired } from "@/util/checkTokenExpirey";
import { Loader2 } from "lucide-react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface User {
    email: string;
    firstName: string;
    lastName: string;
    mobile: string;
    occupation: string;
    // Add other properties as needed
}

const Loading = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async (urlToken: string | null) => {
            if (urlToken) {
                console.log("TOKEN IN CLIENT: ",  urlToken);
                
                try {
                    const response = await fetch('http://localhost:8081/api/v1/user/', {
                        method: 'GET', // Use POST or GET depending on your API design
                        headers: {
                            'Authorization': `Bearer ${urlToken}`
                        },
                    });
    
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
    
                    const data = await response.json();
                    const { result, message, token, role, user } = data;
                    localStorage.setItem('authToken', token);
                    localStorage.setItem('userRole', role);
                    localStorage.setItem('user', JSON.stringify(user));
                    setUser(user);
                    setIsLoggedIn(true);

                    await new Promise(resolve => setTimeout(resolve, 1000));

                    // Redirect to the appropriate dashboard
                    router.push('/dashboard/user');
                } catch (err) {
                    console.error('Error fetching user data:', err);
                    router.push('/login');
                }
            } else {
                const token = localStorage.getItem('authToken');
                if (token && !isTokenExpired(token)) {
                    setIsLoggedIn(true);
                    const userData = localStorage.getItem('user');
                    if (userData) {
                        setUser(JSON.parse(userData) as User);
                        router.push('/dashboard/user');
                    }
                } else {
                    setIsLoggedIn(false);
                    router.push('/login');
                }
            }
            setLoading(false);
        };
        const urlParams = new URLSearchParams(window.location.search);
        const urlToken = urlParams.get('token');
        fetchData(urlToken);
    }, [router]);


    return (
        <div className="relative flex flex-col min-h-screen">
            <Head>
                <title>Loading</title>
            </Head>
            <Navbar />
            <main className="container mx-auto flex-grow py-8" style={{ filter: loading ? 'blur sm' : 'none' }}>
            
            </main>
            { loading && (
                <>
                    {/* Blur overlay */}
                    <div className="fixed inset-0 bg-black bg-opacity-30 z-40"></div>
                    {/* <div className="fixed inset-0 bg-gray-800 opacity-50 z-40"></div> */}
                    {/* Loading button overlay */}
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        <Button variant="outline" disabled className="flex items-center space-x-2">
                            <Loader2 className="h-6 w-6 animate-spin" />
                            <span>Please wait...</span>
                        </Button>
                    </div>
                </>
            )}
            <Footer />
        </div>
    );
};

export default Loading;