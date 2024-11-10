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
} from '@/components/ui/table'

export default function UsersPage() {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
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
                                <TableHead className="text-right">Occupation</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                users.map((user: any) => (
                                    <TableRow key={user.email}>
                                        <TableCell className="font-medium">{user.email}</TableCell>
                                        <TableCell>{user.firstName} {user.lastName}</TableCell>
                                        <TableCell>{user.mobile}</TableCell>
                                        <TableCell className="text-right">{user.occupation}</TableCell>
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
        </div>
    );
}
