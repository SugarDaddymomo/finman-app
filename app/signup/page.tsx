'use client'

import { useState, useEffect } from "react";
import Navbar from "@/components/customComponents/Navbar";
import Footer from "@/components/customComponents/Footer";
import Head from "next/head";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import SignupFailAlert from "@/components/customComponents/SignupFailAlert";
import SignupSuccessAlert from "@/components/customComponents/SignupSuccessAlert";
import PasswordHint from "@/components/customComponents/PasswordHint";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { isUserLoggedIn } from "@/util/checkSession";

export default function Home() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [mobile, setMobile] = useState('');
    const [occupation, setOccupation] = useState('');

    const [showFailAlert, setShowFailAlert] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [loading, setLoading] = useState(false); // Loading state
    const router = useRouter();

    useEffect(() => {
        const userRole = localStorage.getItem('userRole');
        if (isUserLoggedIn()) {
            if (userRole === 'ADMIN') {
                router.push('/dashboard/admin');
            } else {
                router.push('/dashboard/user');
            }
        }
        setLoading(false); // reset loading on initial load
    }, []);

    const fetchOccupations = ['Corporate', 'Govt', 'Business', 'Student'];


    // Password validation checks
    const isValidLength = password.length >= 8;
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const handleSignup = async (event: React.FormEvent) => {

        event.preventDefault();

        setShowFailAlert(false);
        setShowSuccessAlert(false);
        setLoading(true);

        if (!isValidLength || !hasLowercase || !hasUppercase || !hasDigit || !hasSpecialChar) {
            setErrorMessage("Password does not meet the required criteria.");
            setShowFailAlert(true);
            setLoading(false);
            return;
        }

        const requestBody = {
            email,
            password,
            firstName,
            lastName,
            mobile,
            occupation
        };

        //apicall
        try {
            
            const response = await fetch('http://localhost:8081/api/v1/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody)
            });

            const resultJson = await response.json();

            if (response.ok) {
                if (resultJson?.result) {
                    await new Promise((resolve) => setTimeout(resolve, 2000));
                    setShowSuccessAlert(true);
                    setTimeout(() => router.push('/login'), 3000);
                } else {
                    setErrorMessage(resultJson?.message);
                    setShowFailAlert(true);
                }
            } else {
                setErrorMessage(resultJson?.message || "Signup failed");
                setShowFailAlert(true);
            }
        } catch (err) {
            setErrorMessage('Technical error');
            setShowFailAlert(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Head>
                <title>Signup</title>
            </Head>
            <Navbar />
            <main className="container mx-auto flex-grow flex items-center justify-center py-8" style={{ filter: loading ? 'blur(4px)' : 'none' }}>
                <Card className="w-[350px] mb-20">
                    <CardHeader>
                        <CardTitle>Signup</CardTitle>
                        <CardDescription>Signup and become a member</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {showFailAlert && <SignupFailAlert message={errorMessage} />}
                        {showSuccessAlert && <SignupSuccessAlert />}
                        <form onSubmit={handleSignup}>
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
                                        placeholder="Password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        onFocus={() => setIsPasswordFocused(true)}
                                        onBlur={() => setIsPasswordFocused(false)}
                                        required
                                    />
                                    { isPasswordFocused && 
                                        (<div className="mt-2">
                                            <PasswordHint valid={isValidLength} label="At least 8 characters" />
                                            <PasswordHint valid={hasLowercase} label="At least one lowercase letter" />
                                            <PasswordHint valid={hasUppercase} label="At least one uppercase letter" />
                                            <PasswordHint valid={hasDigit} label="At least one digit" />
                                            <PasswordHint valid={hasSpecialChar} label="At least one special character" />
                                        </div>)
                                    }
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input 
                                        id="firstName"
                                        type="firstName"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        placeholder="First name"
                                        required
                                    />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input 
                                        id="lastName"
                                        type="lastName"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        placeholder="Last name"
                                    />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="mobile">Mobile</Label>
                                    <Input 
                                        id="mobile"
                                        type="mobile"
                                        value={mobile}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            if (/^\d*$/.test(value) && value.length <= 10) { // Allow only digits and limit to 10
                                                setMobile(value);
                                            }
                                        }}
                                        maxLength={10}
                                        //onChange={(e) => setMobile(e.target.value)}
                                        placeholder="9868934876"
                                        required
                                    />
                                    { mobile && mobile.length !== 10 && (
                                        <p className="text-red-500 text-sm">Mobile number must be exactly 10 digits.</p>
                                    )}
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="occupation">Occupation</Label>
                                    <Select onValueChange={(value) => setOccupation(value)}>
                                        <SelectTrigger id="occupation">
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent position="popper">
                                            {
                                                fetchOccupations.map((occupation) => (
                                                    <SelectItem key={occupation} value={occupation}>
                                                        {occupation}
                                                    </SelectItem>
                                                ))
                                            }
                                            {/* <SelectItem value="CORPORATE">Corporate</SelectItem>
                                            <SelectItem value="GOVT">Govt</SelectItem>
                                            <SelectItem value="BUSINESS">Business</SelectItem>
                                            <SelectItem value="STUDENT">Student</SelectItem> */}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <CardFooter className="flex justify-between mt-4">
                                {/* <Button variant="outline" type="reset">Cancel</Button> */}
                                <Button
                                    variant="outline"
                                    type="button"
                                    onClick={() => {
                                        setEmail('');
                                        setPassword('');
                                        setFirstName('');
                                        setLastName('');
                                        setMobile('');
                                        setOccupation('');
                                        setErrorMessage('');
                                        setShowFailAlert(false);
                                        setShowSuccessAlert(false);
                                        setIsPasswordFocused(false);
                                        setLoading(false);
                                    }}
                                >
                                    Cancel
                                </Button>
                                {/* <Button type="submit" className="hover:bg-secondaryColor hover:text-black">Signup</Button> */}
                                <Button type="submit" disabled={loading} className="hover:bg-secondaryColor hover:text-black">
                                    {
                                        loading ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Please wait
                                            </>
                                        ) : "Signup"
                                    }
                                </Button>
                            </CardFooter>
                        </form>
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