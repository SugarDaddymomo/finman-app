// pages/account.tsx
'use client'

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Form, FormItem, FormLabel, FormControl, FormField, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/customComponents/Navbar";
import Footer from "@/components/customComponents/Footer";
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"

const personalFormSchema = z.object({
    firstName: z.string().min(2).max(50),
    lastName: z.string().min(2).max(50),
    mobile: z.string().min(10).max(10),
    password: z.string().min(8).max(15)
});

interface PersonalDetailsFormData {
    firstName: string;
    lastName: string;
}

interface BillingFormData {
    cardNumber: string;
    billingAddress: string;
}

interface SettingsFormData {
    notifications: boolean;
    password: string;
}

export default function AccountPage() {
    const [selectedTab, setSelectedTab] = useState('personalDetails');

    // Separate form setups for each section
    const personalForm = useForm<PersonalDetailsFormData>();
    const billingForm = useForm<BillingFormData>();
    const settingsForm = useForm<SettingsFormData>();

    const personalDetailsForm = useForm<z.infer<typeof personalFormSchema>>({
        resolver: zodResolver(personalFormSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            mobile: '',
            password: ''
        }
    });

    function onSubmitPersonalDetails(values: z.infer<typeof personalFormSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
      }

    const handleTabChange = (tab: string) => {
        setSelectedTab(tab);
    };

    // Submit handlers for each form
    const onSubmitPersonal: SubmitHandler<PersonalDetailsFormData> = (data) => {
        console.log("Personal Details Submitted", data);
    };
    
    const onSubmitBilling: SubmitHandler<BillingFormData> = (data) => {
        console.log("Billing Information Submitted", data);
    };
    
    const onSubmitSettings: SubmitHandler<SettingsFormData> = (data) => {
        console.log("Settings Submitted", data);
    };

    return (
        <div>
            <Navbar />
            <main className="container mx-auto p-8 bg-gray-100 min-h-screen">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Account Settings</h1>
                <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mb-8">
                    <TabsList>
                        <TabsTrigger value="personalDetails">Personal Details</TabsTrigger>
                        <TabsTrigger value="billing">Billing</TabsTrigger>
                        <TabsTrigger value="settings">Settings</TabsTrigger>
                    </TabsList>
                    <TabsContent value="personalDetails">
                        <Form {...personalDetailsForm}>
                            <form onSubmit={personalDetailsForm.handleSubmit(onSubmitPersonalDetails)} className="space-y-8">
                                <FormField 
                                    control={personalDetailsForm.control}
                                    name='firstName'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>First Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Ashutosh" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                Your legal First Name
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField 
                                    control={personalDetailsForm.control}
                                    name='lastName'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Last Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Yadav" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                Your legal Lirst Name.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField 
                                    control={personalDetailsForm.control}
                                    name='mobile'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Mobile no.</FormLabel>
                                            <FormControl>
                                                <Input placeholder="8765432145" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                Your mobile number.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField 
                                    control={personalDetailsForm.control}
                                    name='password'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Password" type="password" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                New Password.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="mt-4 hover:bg-secondaryColor hover:text-black">Save Changes</Button>
                            </form>
                        </Form>
                    </TabsContent>
                    <TabsContent value="billing">
                        
                    </TabsContent>
                    <TabsContent value="settings">
                        
                    </TabsContent>
                </Tabs>
            </main>
            <Footer />
        </div>
    );
}
