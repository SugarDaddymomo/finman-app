// components/customComponents/Sidebar.tsx
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Sidebar = () => {
    const router = useRouter();

    return (
        
        // <aside className="w-64 bg-sidebar shadow-lg min-h-screen p-6 text-sidebar-foreground">
        <aside className="hidden md:block w-64 bg-sidebar shadow-lg min-h-screen p-6 text-sidebar-foreground">

            <h3 className="text-lg font-bold mb-6">Admin Menu</h3>
            <nav className="space-y-4">
                <Link href="/dashboard/admin/users" className="block text-sidebar-primary hover:text-sidebar-primary-foreground">Users</Link>
                <Link href="/dashboard/admin/admins" className="block text-sidebar-primary hover:text-sidebar-primary-foreground">Admins</Link>
                <Link href="/dashboard/admin/occupations" className="block text-sidebar-primary hover:text-sidebar-primary-foreground">Occupations</Link>
                {/* Add more links as needed */}
            </nav>
        </aside>
    );
};

export default Sidebar;
