import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { FC, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

interface UserAvatarProps {
    onLogout: () => void; // Define the type for the onLogout prop
}

const UserAvatar: FC<UserAvatarProps> = ({ onLogout }) =>  {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const [userRole, setUserRole] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        // Get user role from localStorage after component mounts
        const role = localStorage.getItem("userRole");
        setUserRole(role);
    }, []);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const handleLogout = () => {
        onLogout(); // Call the logout function passed from the Navbar
        setDropdownOpen(false); // Close the dropdown after logout
    };

    const handleAccountClick = () => {
        if (userRole === "ADMIN") {
            router.push("/dashboard/admin/account");
        } else {
            router.push("/dashboard/user/account");
        }
        setDropdownOpen(false); // Close the dropdown after navigating
    };

    useEffect(() => {
        const  handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        };

        if (isDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDropdownOpen]);


    return (
        <div className="relative inline-block" ref={dropdownRef}>
            <Avatar onClick={toggleDropdown} className="cursor-pointer">
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-10">
                    <ul className="py-1">
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={handleAccountClick}>
                            Account
                        </li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Premium</li>
                        {/* <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Contact</li> */}
                        <Link href="/contact" className="px-4 py-2 hover:bg-gray-100 cursor-pointer" >Contact</Link>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={handleLogout}>Logout</li>
                    </ul>
                </div>
            )}
        </div>
    //   <Avatar>
    //     <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
    //     <AvatarFallback>CN</AvatarFallback>
    //   </Avatar>
    )
};

export default UserAvatar;