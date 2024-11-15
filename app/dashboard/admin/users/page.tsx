'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getPaginatedUsers, deleteUser } from '@/util/apiService';
import { getUserRole } from "@/util/checkUserRole";
import Navbar from '@/components/customComponents/Navbar';
import Footer from '@/components/customComponents/Footer';
import { Loader2 } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { FaLock, FaUnlock } from 'react-icons/fa';
import { MdDeleteForever, MdToggleOn, MdToggleOff } from "react-icons/md";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/customComponents/AppSidebar';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
  } from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';

function LoadingOverlay() {
    return (
        <div>
            <div className="fixed inset-0 bg-gray-800 opacity-50 z-40"></div>
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <Button variant="outline" disabled className="flex items-center space-x-2">
                    <Loader2 className="h-6 w-6 animate-spin" />
                    <span>Please wait...</span>
                </Button>
            </div>
        </div>
    );
}

export default function UsersPage() {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedUserEmail, setSelectedUserEmail] = useState<string | null>(null);
    const [actionType, setActionType] = useState<'delete' | 'lock' | 'enable' | null>(null);
    const router = useRouter();

    useEffect(() => {
        const role = getUserRole();
        if (!role) {
            router.push('/login');
        } else if (role !== 'ADMIN') {
            router.push('/dashboard/user');
        }
    }, [router]);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const data = await getPaginatedUsers(page, size);
                setUsers(data.content);
                setTotalPages(data.totalPages);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        
        fetchUsers();
    }, [page, size]);

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    const openDialog = (email: string, action: 'delete' | 'lock' | 'enable') => {
        setSelectedUserEmail(email);
        setActionType(action);
        setIsDialogOpen(true);
    };

    const handleConfirm = async () => {
        if (selectedUserEmail) {
            let deleteResponse;
            try {
                if (actionType === 'delete') {
                    deleteResponse = await deleteUser(selectedUserEmail);
                } else if (actionType === 'lock') {
                    //await toggleUserLock(selectedUserEmail);
                } else if (actionType === 'enable') {
                    //await toggleUserEnable(selectedUserEmail);
                }

                if (deleteResponse?.result) {
                    toast.success('User deleted successfully.');
                } else {
                    toast.error('Failed to delete user.');
                }
                // Refetch users to refresh the list
                const data = await getPaginatedUsers(page, size);
                setUsers(data.content);
            } catch (error) {
                console.error('Error performing action:', error);
            } finally {
                setLoading(false);
                setIsDialogOpen(false);
                setSelectedUserEmail(null);
                setActionType(null);
            }
        }
    };


    return (

        <SidebarProvider>
            {loading && <LoadingOverlay />}
            <AppSidebar />
            <SidebarInset>
                <Navbar />
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href='/dashboard/admin'>
                                    Dashboard
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink href='/dashboard/admin/users'>
                                    Users
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>
                <main className="container mx-auto p-8 bg-gray-100 flex-1">
                    <h1 className="text-2xl font-bold mb-4">Users</h1>
                    <Table>
                        <TableCaption>List of All Users</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Email</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Mobile</TableHead>
                                <TableHead>Occupation</TableHead>
                                <TableHead className='text-right'>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                users.map((user: any) => (
                                    <TableRow key={user.email}>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.firstName} {user.lastName}</TableCell>
                                        <TableCell>{user.mobile}</TableCell>
                                        <TableCell>{user.occupation}</TableCell>
                                        <TableCell className="text-right space-x-2">
                                            <Button className='p-1 text-yellow-500 hover:bg-yellow-500' variant='ghost' size='icon' onClick={() => openDialog(user.email, 'lock')}>
                                                {
                                                    user.accountNonLocked ? <FaUnlock size={16} /> : <FaLock size={16} />
                                                }
                                            </Button>
                                            <Button className='p-1 text-blue-500 hover:bg-blue-500' variant='ghost' size='icon' onClick={() => openDialog(user.email, 'enable')}>
                                                {
                                                    user.enabled ? <MdToggleOn size={16} /> : <MdToggleOff size={16} />
                                                }
                                            </Button>
                                            <Button className='p-1 text-red-500 hover:bg-red-500' variant='ghost' size='icon' onClick={() => openDialog(user.email, 'delete')}>
                                                <MdDeleteForever size={16} />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                    <div className="mt-4">
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    {page > 0 ? (
                                        <PaginationPrevious href="#" onClick={() => handlePageChange(page - 1)} />
                                    ) : (
                                        <span className="text-gray-400 cursor-not-allowed">Previous</span>
                                    )}
                                </PaginationItem>
                                {Array.from({ length: totalPages }, (_, index) => (
                                    <PaginationItem key={index}>
                                        <PaginationLink
                                            href="#"
                                            isActive={index === page}
                                            onClick={() => handlePageChange(index)}
                                        >
                                            {index + 1}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}
                                <PaginationItem>
                                    {page < totalPages - 1 ? (
                                        <PaginationNext href="#" onClick={() => handlePageChange(page + 1)} />
                                    ) : (
                                        <span className="text-gray-400 cursor-not-allowed">Next</span>
                                    )}
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                </main>
                <Footer />
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                {
                                    actionType === 'delete'
                                    ? 'Confirm Deletion'
                                    : actionType === 'lock'
                                    ? 'Confirm Lock'
                                    : actionType === 'enable' || actionType === 'disable'
                                    ? (users.find(u => u.email === selectedUserEmail)?.enabled ? 'Confirm Disable' : 'Confirm Enable')
                                    : ''
                                }
                            </DialogTitle>
                        </DialogHeader>
                        <p>
                            {actionType === 'delete'
                                ? 'Are you sure you want to delete this user?'
                                : actionType === 'lock'
                                ? `Are you sure you want to ${users.find(u => u.email === selectedUserEmail)?.accountNonLocked ? 'lock' : 'unlock'} this user?`
                                : `Are you sure you want to ${users.find(u => u.email === selectedUserEmail)?.enabled ? 'disable' : 'enable'} this user?`}
                        </p>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>No</Button>
                            <Button variant="destructive" onClick={handleConfirm}>Yes</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </SidebarInset>
        </SidebarProvider>
    );
}
