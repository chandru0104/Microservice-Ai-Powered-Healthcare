import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
    return (
        <nav className="bg-blue-600 text-white">
            <img src="/logo.png" alt="logo" />
            <ul className="flex gap-10 p-4">
                <li>
                    <Link href="/login">Buy Medicines</Link>
                </li>
                <li>
                    <Link href="/doctors">Find Doctors.</Link>
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
        </nav>
    );
};

export default Navbar;