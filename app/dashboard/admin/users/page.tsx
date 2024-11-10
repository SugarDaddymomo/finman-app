// pages/dashboard/admin/users.tsx

'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getPaginatedUsers } from '@/util/apiService';
import { getUserRole } from "@/util/checkUserRole";
import Sidebar from '@/components/customComponents/Sidebar';
import Navbar from '@/components/customComponents/Navbar';
import Footer from '@/components/customComponents/Footer';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
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
    TableFooter,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { FaLock, FaUnlock } from 'react-icons/fa';
import { MdDeleteForever, MdToggleOn, MdToggleOff } from "react-icons/md";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

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
            try {
                if (actionType === 'delete') {
                    //await deleteUser(selectedUserEmail);
                } else if (actionType === 'lock') {
                    //await toggleUserLock(selectedUserEmail);
                } else if (actionType === 'enable') {
                    //await toggleUserEnable(selectedUserEmail);
                }
                // Refetch users to refresh the list
                const data = await getPaginatedUsers(page, size);
                setUsers(data.content);
            } catch (error) {
                console.error('Error performing action:', error);
            } finally {
                setIsDialogOpen(false);
                setSelectedUserEmail(null);
                setActionType(null);
            }
        }
    };

    // const handleDeleteClick = (email: string) => {
    //     setSelectedUserEmail(email);
    //     setIsDialogOpen(true);
    // };

    // const handleDeleteConfirm = async () => {
    //     if (selectedUserEmail) {
    //         console.log('Deleting user with email:', selectedUserEmail);
    //         // Call your delete API here
    //         setIsDialogOpen(false);
    //         setSelectedUserEmail(null);
    //     }
    // };

    // const handleDelete = async (email: string) => {
    //     //1.popup to confirm deletion
    //     //2.api call to delete user
    //     //3. show small notification for success or failure
    //     console.log('Deleting user with email:', email);
    // };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Navbar />
                <main className="container mx-auto p-8 bg-gray-100 flex-1">
                    <h1 className="text-2xl font-bold mb-4">Users</h1>
                    {/* <ul>
                        {users.map((user: any) => (
                            <li key={user.email} className="mb-2">
                                <div className="p-4 border rounded shadow">
                                    <p><strong>Email:</strong> {user.email}</p>
                                    <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
                                    <p><strong>Mobile:</strong> {user.mobile}</p>
                                    <p><strong>Occupation:</strong> {user.occupation}</p>
                                </div>
                            </li>
                        ))}
                    </ul> */}
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
                        {/* <TableFooter>
                            <TableRow>
                                <TableCell colSpan={3}>Total</TableCell>
                                <TableCell className="text-right">$2,500.00</TableCell>
                            </TableRow>
                        </TableFooter> */}
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
            </div>
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
        </div>
    );
}
