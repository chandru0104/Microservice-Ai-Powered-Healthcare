import Image from "next/image"


const AiSection =()=>{
    return(
        <>
        <div className="hidden sm:block relative">
            <Image src={"/ai-banner1.jpg"} alt="ai image" height={1000} width={2000}/>
            <p className="absolute left-[300px] top-[150px] text-[90px] font-semibold text-white drop-shadow-2xl">Your Health, Simplified by AI</p>
            <p className="absolute left-[200px] top-[300px] text-[25px] font-medium text-white drop-shadow-2xl">Understand your symptoms and medical reports with clear, AI-powered insights—so you can make better-informed health decisions.</p>
        </div>
        </>
    )
}

export default AiSection