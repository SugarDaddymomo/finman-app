'use client'

import Link from 'next/link';
import Loginbutton from './Loginbutton';
import Signupbutton from './Signupbutton';
import { useEffect, useState } from 'react';
import { isTokenExpired } from '@/util/checkTokenExpirey';
import { useRouter } from 'next/navigation';
import UserAvatar from './UserAvatar';

interface User {
    email: string;
    firstName: string;
    lastName: string;
    mobile: string;
    occupation: string;
    // Add other properties as needed
}

const Navbar = () => {

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token && !isTokenExpired(token)) {
            setIsLoggedIn(true);
            const userData = localStorage.getItem('user');
            console.log('USERDATD: ', userData);
            if (userData) {
                setUser(JSON.parse(userData) as User);
                console.log('USER SET ALL');
            }
            //const userData = JSON.parse(localStorage.getItem('user') || '{}') as User;
            // setUser(userData);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const handleLogout = async () => {
        // Call your backend logout API if necessary
        await fetch('http://localhost:8081/api/v1/auth/logout', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
            },
        });

        // Clear local storage and update state
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        localStorage.removeItem('userRole');
        setIsLoggedIn(false);
        setUser(null);
        router.push('/login');
    };

    return (
        <nav className="bg-primaryColor text-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center flex-wrap">
                <div className="text-lg font-bold">
                    <Link href="/">FinMan</Link>
                </div>
                <div className="flex-grow md:flex md:justify-center md:space-x-4">
                    {/* <Link href="/services" className="mx-2" >Services</Link> */}
                    {/* <Link href="/about" className="mx-2" >About</Link> */}
                    {/* <Link href="/contact" className="mx-2" >Contact</Link> */}
                </div>
                <div className="flex items-center space-x-2 md:space-x-4">
                    {/** avatar with menu */}
                    {/* <UserAvatar /> */}
                    {isLoggedIn ? (
                        // <>
                        //     <div className="relative">
                        //         <button onClick={handleLogout} className="flex items-center">
                        //             <img src="/path/to/avatar.png" alt="User Avatar" className="w-8 h-8 rounded-full" />
                        //         </button>
                        //         {/* Dropdown for user options can be implemented here */}
                        //     </div>
                        // </>
                        <UserAvatar onLogout={handleLogout} />
                    ) : (
                        <>
                            <Signupbutton />
                            <Loginbutton />
                        </>
                    )}
                    {/* <Signupbutton />
                    <Loginbutton /> */}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;