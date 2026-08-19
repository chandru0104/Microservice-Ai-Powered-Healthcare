'use client';

import Link from "next/link";
import Button from '@mui/material/Button';
import { User } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
    const [open, setOpen] = useState(false);

    function toggleDrawer(newOpen: boolean) {
        setOpen(newOpen);
    }
    return (
        <nav className="bg-blue-000 text-black flex gap-10 p-4 items-center justify-between border-b-2 ">
            <div>
                <img src="/logo.png" alt="logo" height={40} width={40} />
            </div>
            <ul className="flex gap-10">
                <li>
                    <Link href="/buy-medicines">Buy Medicines</Link>
                </li>
                <li>
                    <Link href="/doctors">Find Doctors</Link>
                </li>
                <li>
                    <Link href="/lab-tests">Lab Tests</Link>
                </li>
                <li>
                    <Link href="/ai-summary">AI Summary</Link>
                </li>
                <li>
                    <Link href="/about">About</Link>
                </li>
            </ul>
            <div>
                <Button onClick={() => toggleDrawer(true)}><User />Login</Button>
                
            </div>

        </nav>
    );
};

export default Navbar;