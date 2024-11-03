'use client'

import { useState } from "react";
import Navbar from "@/components/customComponents/Navbar";
import Footer from "@/components/customComponents/Footer";
import Head from "next/head";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Home() {

    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [userType, setUserType] = useState('');
    const [query, setQuery] = useState('');


    return (
        <div className="flex flex-col min-h-screen">
            <Head>
                <title>Contact</title>
            </Head>
            <Navbar />
            <main className="container mx-auto flex-grow flex items-center justify-center py-8 space-y-8">
                {/* Contact Info Section */}
                <div className="flex flex-col md:flex-row bg-gray-100 rounded-lg p-6 shadow-lg text-center md:text-left w-full md:max-w-4xl">
                    <div className="flex-1 mb-4 md:mb-0">
                        <h2 className="text-xl font-semibold text-gray-700 mb-2">Contact Us</h2>
                        <p className="text-sm text-gray-500">We’d love to hear from you! Reach out to us directly or fill out the form below.</p>
                    </div>
                    <div className="flex-1 space-y-2">
                        <p className="text-sm text-gray-600"><strong>Email:</strong> support@glowandrise.com</p>
                        <p className="text-sm text-gray-600"><strong>Phone:</strong> +1 (555) 123-4567</p>
                        <p className="text-sm text-gray-600"><strong>Location:</strong> 123 Glow Street, Rise City, US</p>
                    </div>
                </div>

                {/* Contact Form Section */}
                <Card className="w-full md:max-w-4xl">
                    <CardHeader>
                        <CardTitle>Get in Touch</CardTitle>
                        <CardDescription>Fill out the form below, and we’ll get back to you soon.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="email">Email</Label>
                                    <Input 
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="me@example.com"
                                    />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="phone">Phone</Label>
                                    <Input 
                                        id="phone"
                                        type="tel"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder="5551234567"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="userType">Are you a...</Label>
                                <Select onValueChange={(value) => setUserType(value)}>
                                    <SelectTrigger id="userType">
                                        <SelectValue placeholder="Select your role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="brand">Brand</SelectItem>
                                        <SelectItem value="influencer">Influencer</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="query">Your Message</Label>
                                <Input
                                    type="textarea"
                                    aria-setsize={4}
                                    id="query"
                                    
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="How can we help you?"
                                />
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                        <Button type="submit" className="hover:bg-secondaryColor hover:text-black">Submit</Button>
                    </CardFooter>
                </Card>
            </main>
            <Footer />
        </div>
    );
}