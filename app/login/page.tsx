'use client'

import { useState, useEffect } from "react";
import Navbar from "@/components/customComponents/Navbar";
import Footer from "@/components/customComponents/Footer";
import Head from "next/head";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
//import GoogleIcon from '@mui/icons-material/Google';
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import SignupFailAlert from "@/components/customComponents/SignupFailAlert";
import SignupSuccessAlert from "@/components/customComponents/SignupSuccessAlert";
import { isUserLoggedIn } from "@/util/checkSession";

export default function Home() {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loading, setLoading] = useState(false);
    const [showFailAlert, setShowFailAlert] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [userRole, setUserRole] = useState('');

    const router = useRouter();

    useEffect(() => {
        if (isUserLoggedIn()) {
            if (userRole === 'ADMIN') {
                router.push('/dashboard/admin');
            } else {
                router.push('/dashboard/user');
            }
        }
        setLoading(false); // reset loading on initial load
    }, [router]);

    const handleLogin = async (event: React.FormEvent) => {

        event.preventDefault();

        setShowFailAlert(false);
        setShowSuccessAlert(false);
        setLoading(true);

        const requestBody = {
            email,
            password,
        };

        //apicall
        try {
            // const response = await fetch('http://localhost:8081/api/v1/auth/signup')
            const response = await fetch('http://localhost:8081/api/v1/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody)
            });

            const result = await response.json();

            console.log('login response: ', result);

            if (response.ok) {
                const userRole = result.role;
                setUserRole(userRole);
                const token = result.token;
                const user = result.user;
                localStorage.setItem('authToken', token);
                localStorage.setItem('userRole', userRole);
                console.log('USER: ', user);
                localStorage.setItem('user', JSON.stringify(user));
                setShowSuccessAlert(true);
                if (userRole === 'ADMIN') {
                    //router.push("/dashboard/admin");
                    await new Promise((resolve) => setTimeout(resolve, 2000));
                    router.push('/dashboard/admin');
                } else {
                    //router.push("/dashboard/user");
                    await new Promise((resolve) => setTimeout(resolve, 1500));
                    router.push('/dashboard/user');
                }
            } else {
                setErrorMessage(result?.error || 'Login failed');
                setShowFailAlert(true);
            }
        } catch (err) {
            setErrorMessage('Login failed!');
            setShowFailAlert(true);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        try {
            // Simulate API call delay
            window.location.href='http://localhost:8081/oauth2/authorization/google';
            //await new Promise((resolve) => setTimeout(resolve, 2000));
            // Handle successful Google login
        } catch (err) {
            // Handle login failure
        } finally {
            setLoading(false);
        }
    };

    const handleFacebookLogin = async () => {
        setLoading(true);
        try {
            // Implement Facebook login logic here
            await new Promise((resolve) => setTimeout(resolve, 2000));
        } catch (err) {
            // Handle login failure
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Head>
                <title>Login</title>
            </Head>
            <Navbar />
            <main className="container mx-auto flex-grow flex items-center justify-center py-8" style={{ filter: loading ? 'blur(4px)' : 'none' }}>
                <Card className="w-[350px] mb-20">
                    <CardHeader>
                        <CardTitle>Login</CardTitle>
                        <CardDescription>Login and let us take care of you</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {showFailAlert && <SignupFailAlert message={errorMessage} />}
                        {showSuccessAlert && <SignupSuccessAlert />}
                        <form onSubmit={handleLogin}>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="email">Email</Label>
                                    <Input 
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="me@example.com"
                                        required
                                    />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="password">Password</Label>
                                    <Input 
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Password"
                                        required
                                    />
                                </div>
                            </div>
                            <CardFooter className="flex justify-between mt-4">
                                <Button
                                    variant="outline"
                                    type="button"
                                    onClick={() => {
                                        setEmail('');
                                        setPassword('');
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={loading} className="hover:bg-secondaryColor hover:text-black">
                                    {
                                        loading ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Please wait
                                            </>
                                        ) : "Login"
                                    }
                                    
                                </Button>
                            </CardFooter>
                        </form>

                        <div className="relative my-6">
                            <Separator className="w-full" />
                            <span className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 bg-white px-2 text-sm text-gray-500 text-center">
                                OR
                            </span>
                        </div>

                        <div className="flex flex-col items-center">
                            <span className="text-sm text-gray-600 mb-2">Login with Google or Facebook</span>
                            {/* <Button variant="outline" className="flex items-center justify-center p-4 w-full">
                                <FcGoogle className="w-4 h-4" />
                            </Button> */}
                            <div className="flex space-x-4 w-full">
                                <Button 
                                    variant="outline" 
                                    className="flex items-center justify-center p-4 w-full" 
                                    onClick={handleGoogleLogin} 
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Loading
                                        </>
                                    ) : (
                                        <FcGoogle className="w-4 h-4" />
                                    )}
                                </Button>
                                <Button 
                                    variant="outline" 
                                    className="flex items-center justify-center p-4 w-full" 
                                    onClick={handleFacebookLogin} 
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Loading
                                        </>
                                    ) : (
                                        <FaFacebook className="w-4 h-4 text-blue-600" />
                                    )}
                                </Button>
                            </div>
                            {/* <Button 
                                variant="outline" 
                                className="flex items-center justify-center p-4 w-full" 
                                onClick={handleGoogleLogin} 
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Loading
                                    </>
                                ) : (
                                    <FcGoogle className="w-4 h-4" />
                                )}
                            </Button>
                            <Button 
                                variant="outline" 
                                className="flex items-center justify-center p-4 w-full" 
                                onClick={handleFacebookLogin} 
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Loading
                                    </>
                                ) : (
                                    <FaFacebook className="w-4 h-4 text-blue-600" />
                                )}
                            </Button> */}
                        </div>
                    </CardContent>
                </Card>
            </main>
            { loading && (
                <>
                    {/* Blur overlay */}
                    <div className="fixed inset-0 bg-gray-800 opacity-50 z-40"></div>
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
}