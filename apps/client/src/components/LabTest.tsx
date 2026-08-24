import Image from "next/image"
import Link from "next/link"

const LabTest = () => {

    return (
        <div className="flex max-w-7xl mx-auto items-center justify-center p-4 gap-10">
            <Link href={"/buy-medicines"}>
                <div className="bg-green-100 p-4 rounded-2xl w-[300px]">
                    <div className="flex items-center">
                        <Image src={"/tabtest.svg"} alt="icon" height={30} width={30} className="m-3" />
                        <div className="pt-2">
                            Buy Medicines
                            <br />
                            <span className="text-sm uppercase">within 24 hours</span>
                        </div>
                    </div>
                </div>
            </Link>

            <Link href={"/doctors"}>
                <div className="bg-yellow-100 p-4 rounded-2xl w-[300px]">
                    <div className="flex items-center">
                        <Image src={"/tabtest.svg"} alt="icon" height={30} width={30} className="m-3" />
                        <div className="pt-2">
                            Find Doctors
                            <br />
                            <span className="text-sm uppercase">Book now</span>
                        </div>
                    </div>
                </div>
            </Link>

            <Link href={"/lab-tests"}>
                <div className="bg-pink-100 p-4 rounded-2xl w-[300px]">
                    <div className="flex items-center">
                        <Image src={"/tabtest.svg"} alt="icon" height={30} width={30} className="m-3" />
                        <div className="pt-2">
                            Lab test
                            <br />
                            <span className="text-sm uppercase">within 24 hours</span>
                        </div>
                    </div>
                </div>
            </Link>

            <Link href={"/ai-reports"}>
                <div className="bg-blue-200 p-4 rounded-2xl w-[300px]">
                    <div className="flex items-center">
                        <Image src={"/tabtest.svg"} alt="icon" height={30} width={30} className="m-3" />
                        <div className="pt-2">
                            AI Reports
                            <br />
                            <span className="text-sm uppercase">Instant you got</span>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default LabTest