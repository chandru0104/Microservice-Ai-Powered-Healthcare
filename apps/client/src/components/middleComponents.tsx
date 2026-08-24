import Image from "next/image"
import Button from "@mui/material/Button"
import newsJson from "../app/(site)/jsons/news.json"
export default function MiddleComponents() {

    const news = newsJson
    return (
        <>
            <div className="pt-8 ">
                <Image src={"/ai-poster.svg"} alt="ai poster" height={20} width={1300} />
                <Button className="">Use Ai Feature</Button>
            </div>
                <h1>Blogs and Articles for You</h1>
            <div className="flex max-w-7xl mx-auto items-center justify-center">


                {
                    news.map((data: any) => (

                        <div key={data.id} className=" w-[400px] p-4 ">
                            <div className="">
                            <Image src={data.image} width={200} height={20} alt="image news"  className="rounded-lg"/>
                            <p className="w-[200px]">{data.news}</p>
                            <p className="text-sm">{data.date}</p>
                            </div>

                        </div>
                    ))
                }
            </div>
            <div className="flex item-center justify-center gap-20">
                <div >
                    <Image src={"/secure.svg"} height={20} width={80} alt="secure svg" />
                    <p>Secure Payment</p>
                </div>
                <div >
                    <Image src={"/genuine.svg"} height={20} width={80} alt="secure svg" />
                    <p>Trusted by 8 Crore Indians</p>
                </div>
                <div >
                    <Image src={"/trust.svg"} height={20} width={80} alt="secure svg" />
                    <p>Genuine Products</p>
                </div>
            </div>
        </>
    )
}