'use client'

// pages/dashboard/admin.tsx
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getUserRole } from "@/util/checkUserRole";
import Navbar from "@/components/customComponents/Navbar";
import Footer from "@/components/customComponents/Footer";
import Sidebar from "@/components/customComponents/Sidebar";
import { getPaginatedUsers } from "@/util/apiService";
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/customComponents/AppSidebar';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from '@/components/ui/breadcrumb';
  import { Separator } from '@/components/ui/separator';

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
        // <div className="flex min-h-screen">
        //     {/* <Sidebar /> */}
        //     <div className="flex-1 flex flex-col">
        //         <Navbar />
        //         <main className="container mx-auto p-8 bg-gray-100 flex-1">
        //             <h1>Admin Dashboard</h1>
        //             {/* Admin-specific content goes here */}
        //         </main>
        //         <Footer />
        //     </div>
        // </div>
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <Navbar />
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="">
                                <BreadcrumbLink href="/dashboard/admin">
                                Dashboard
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4">
                    <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                        <div className="aspect-video rounded-xl bg-muted/50" />
                        <div className="aspect-video rounded-xl bg-muted/50" />
                        <div className="aspect-video rounded-xl bg-muted/50" />
                    </div>
                <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
                </div>
                <Footer />
            </SidebarInset>
        </SidebarProvider>
    );
}
