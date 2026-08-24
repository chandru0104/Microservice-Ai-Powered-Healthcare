
import Link from "next/link";
const NavMenu = () => {
    return (
        <>
            <div className="absolute w-full sticky top-[70px] z-50">
                <div className="bg-primary-bg text-white">
                    <ol className="p-1">
                        <li className="p-2 m-1 bg-white text-black rounded-md"><Link href="/buy-medicines">Buy Medicines</Link></li>
                        <li className="p-2 m-1 bg-white text-black rounded-md"><Link href="/doctors">Find Doctors</Link></li>
                        <li className="p-2 m-1 bg-white text-black rounded-md"><Link href="/lab-tests">Lab Tests</Link></li>
                        <li className="p-2 m-1 bg-white text-black rounded-md"><Link href="/ai-reports">AI Reports</Link></li>
                        <li className="p-2 m-1 bg-white text-black rounded-md"><Link href="/about">About</Link></li>
                    </ol>

                </div>
            </div>
        </>
    )
}

export default NavMenu