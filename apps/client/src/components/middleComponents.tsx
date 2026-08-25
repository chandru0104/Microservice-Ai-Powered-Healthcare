import Image from "next/image"
import Link from "next/link"
import newsJson from "../app/(site)/jsons/news.json"
export default function MiddleComponents() {

    const news = newsJson
    return (
        <>
            <div className="max-w-[1320px] mx-auto  pt-4 pb-4">
                <Link href="/ai-reports" className="relative block group overflow-hidden rounded-3xl shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-[#0284c7] via-[#0369a1] to-[#0f172a] p-8 md:p-10">
                    {/* Glowing background light spots */}
                    <div className="absolute -top-10 -left-10 w-64 h-64 bg-sky-400 opacity-20 rounded-full blur-3xl pointer-events-none"></div>
                    <div className="absolute -bottom-10 right-1/3 w-72 h-72 bg-indigo-500 opacity-20 rounded-full blur-3xl pointer-events-none"></div>

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                        {/* Left Side Content - Real HTML rendering UI's Google Sans font */}
                        <div className="max-w-2xl text-white">
                            <h2 className="text-2xl md:text-3xl lg:text-[36px] font-bold leading-tight tracking-tight text-white mb-3">
                                Ask anything about your health.
                            </h2>
                            <p className="text-sky-100 text-sm md:text-base opacity-90 mb-6 font-normal">
                                Get trusted AI-powered answers and health report insights directly from Care Hub.
                            </p>

                            <div className="inline-flex items-center gap-2 bg-[#0f172a]/90 hover:bg-[#0f172a] border border-sky-400/30 text-white text-sm md:text-base font-bold px-5 py-2.5 rounded-2xl shadow-sm group-hover:border-sky-400/60 transition-all duration-200">
                                <span className="text-sky-400 text-lg font-bold">+</span>
                                <span>Ask Care Hub</span>
                                <span className="text-xs text-sky-400 font-semibold ml-1">beta</span>
                            </div>
                        </div>

                        {/* Right Side Illustration Card */}
                        <div className="w-full md:w-[440px] shrink-0 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-xl">
                            <div className="flex items-center justify-between bg-[#0f172a]/60 border border-sky-400/20 rounded-xl px-3.5 py-2 mb-3">
                                <div className="flex items-center gap-2.5">
                                    <svg className="w-5 h-5 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                    <span className="text-white text-xs md:text-sm font-semibold">Smart Health Diagnostic Report</span>
                                </div>
                                <span className="bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                                    VERIFIED AI
                                </span>
                            </div>

                            <div className="grid grid-cols-3 gap-3">
                                <div className="col-span-2 bg-[#0f172a]/40 border border-white/10 rounded-xl p-3">
                                    <div className="text-[11px] text-slate-300 font-medium mb-1">Vitals Analysis</div>
                                    <div className="h-12 flex items-end">
                                        <svg className="w-full h-10 text-sky-400" fill="none" viewBox="0 0 200 60" stroke="currentColor" strokeWidth="2.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 30 L40 30 L50 15 L62 45 L74 5 L88 38 L98 30 L135 30 L145 20 L155 35 L190 30" />
                                        </svg>
                                    </div>
                                    <div className="text-emerald-400 text-xs font-bold mt-1">99.2% Health Accuracy</div>
                                </div>

                                <div className="bg-[#0f172a]/40 border border-white/10 rounded-xl p-2.5 flex flex-col justify-between text-[11px]">
                                    <div className="text-slate-300 font-bold text-[10px]">AI SUMMARY</div>
                                    <div className="space-y-1.5 text-slate-200">
                                        <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>Lab Check</div>
                                        <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>Doctor Chat</div>
                                        <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>Safe Vault</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
            <h1 className="flex max-w-7xl mx-auto items-center justify-center">Blogs and Articles for You</h1>
            <div className="flex max-w-7xl mx-auto items-center justify-center">


                {
                    news.map((data: any) => (

                        <div key={data.id} className=" w-[400px] p-4 ">
                            <div className="">
                                <Image src={data.image} width={200} height={20} alt="image news" className="rounded-lg" />
                                <p className="w-[200px]">{data.news}</p>
                                <p className="text-sm">{data.date}</p>
                            </div>

                        </div>
                    ))
                }
            </div>
            <div className="p-2 flex sm:flex item-center justify-center gap-20 py-4">
                <div className="flex flex-col items-center">
                    <Image src={"/secure.svg"} height={20} width={80} alt="secure svg" />
                    <p>Secure Payment</p>
                </div>
                <div className="flex flex-col items-center">
                    <Image src={"/genuine.svg"} height={20} width={80} alt="secure svg" />
                    <p>Trusted by 8 Crore Indians</p>
                </div>
                <div className="flex flex-col items-center">
                    <Image src={"/trust.svg"} height={20} width={80} alt="secure svg" />
                    <p>Genuine Products</p>
                </div>
            </div>
        </>
    )
}