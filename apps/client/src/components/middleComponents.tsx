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

            <div >
                <h1>Blogs and Articles for You</h1>

                {
                    news.map((data: any) => (

                        <div key={data.id} className="flex flex-col">

                            <Image src={data.image} width={200} height={20} alt="image news" />
                            <div>{data.news}</div>
                            <div>{data.date}</div>

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