"use client";

import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { userAppointmentList } from "../../../services/appointment";
import { Loading } from "../../../components/Loading";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, Video, UserCheck, CheckCircle2, AlertCircle, Stethoscope } from "lucide-react";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";

export default function UserAppointmentPage() {
    const [appointments, setAppointments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const fetchAppointments = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("userAccessToken");
            const userId = localStorage.getItem("userId");
            if (!token || !userId) {
                setLoading(false);
                return;
            }
            const res = await userAppointmentList(userId);
            const appointmentData = res?.data?.data;
            if (Array.isArray(appointmentData)) {
                setAppointments(appointmentData);
            } else if (appointmentData) {
                setAppointments([appointmentData]);
            }
        } catch (err: any) {
            console.error("Error fetching appointments:", err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    const getStatusBadge = (status: string) => {
        const s = (status || "confirmed").toLowerCase();
        if (s === "confirmed" || s === "completed" || s === "paid") {
            return (
                <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200">
                    <CheckCircle2 size={13} /> {status || "Confirmed"}
                </span>
            );
        } else if (s === "cancelled" || s === "failed") {
            return (
                <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-700 border border-red-200">
                    <AlertCircle size={13} /> {status || "Cancelled"}
                </span>
            );
        }
        return (
            <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full bg-amber-100 text-amber-700 border border-amber-200">
                <Clock size={13} /> {status || "Scheduled"}
            </span>
        );
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />

            <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8">
                {/* Header Banner */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                            <Calendar size={28} />
                        </div>
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Appointments</h1>
                            <p className="text-sm text-gray-500 mt-0.5">Manage your scheduled doctor consultations and video meetings</p>
                        </div>
                    </div>
                    <Link href="/doctor">
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: "#7c3aed !important",
                                textTransform: "none",
                                borderRadius: "10px",
                                px: 3,
                                py: 1,
                                fontWeight: 600,
                                "&:hover": { backgroundColor: "#6d28d9 !important" }
                            }}
                        >
                            Book New Doctor
                        </Button>
                    </Link>
                </div>

                {/* Content */}
                {loading ? (
                    <div className="py-20">
                        <Loading />
                    </div>
                ) : appointments.length === 0 ? (
                    <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center max-w-lg mx-auto shadow-sm">
                        <div className="w-20 h-20 bg-purple-50 text-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Stethoscope size={36} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">No Appointments Yet</h3>
                        <p className="text-gray-500 text-sm mb-6">
                            You haven't scheduled any doctor consultations. Choose from our expert doctors across multiple specialties!
                        </p>
                        <Button
                            onClick={() => router.push("/doctor")}
                            variant="contained"
                            sx={{
                                backgroundColor: "#7c3aed !important",
                                textTransform: "none",
                                borderRadius: "8px",
                                px: 4,
                                py: 1.2,
                                fontWeight: 600,
                                "&:hover": { backgroundColor: "#6d28d9 !important" }
                            }}
                        >
                            Find & Book Doctors
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {appointments.map((appt: any, idx: number) => {
                            const doctor = appt?.doctor || {};
                            return (
                                <div
                                    key={appt?._id || idx}
                                    className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between"
                                >
                                    <div>
                                        {/* Top Info */}
                                        <div className="flex items-start justify-between gap-4 mb-4 pb-4 border-b border-gray-100">
                                            <div className="flex items-center gap-3">
                                                <div className="w-14 h-14 rounded-full bg-purple-100 border border-purple-200 overflow-hidden flex items-center justify-center shrink-0">
                                                    {doctor?.profile ? (
                                                        <Image
                                                            src={doctor.profile}
                                                            alt={doctor?.name || "Doctor"}
                                                            width={56}
                                                            height={56}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <UserCheck size={26} className="text-purple-600" />
                                                    )}
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-gray-900 text-base">
                                                        {doctor?.name ? `Dr. ${doctor.name}` : "Consultant Doctor"}
                                                    </h3>
                                                    <p className="text-xs text-purple-600 font-medium">
                                                        {doctor?.specialties || "General Physician"}
                                                    </p>
                                                </div>
                                            </div>
                                            <div>{getStatusBadge(appt?.payment || appt?.status || "Confirmed")}</div>
                                        </div>

                                        {/* Date & Time Slot Grid */}
                                        <div className="grid grid-cols-2 gap-3 mb-4 bg-gray-50 p-3 rounded-xl">
                                            <div className="flex items-center gap-2 text-xs text-gray-700">
                                                <Calendar size={16} className="text-purple-600 shrink-0" />
                                                <div>
                                                    <div className="text-[11px] text-gray-400 font-medium">Date</div>
                                                    <div className="font-semibold">
                                                        {appt?.date
                                                            ? new Date(appt.date).toLocaleDateString("en-IN", {
                                                                  day: "numeric",
                                                                  month: "short",
                                                                  year: "numeric",
                                                              })
                                                            : appt?.day || "Scheduled"}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-gray-700">
                                                <Clock size={16} className="text-purple-600 shrink-0" />
                                                <div>
                                                    <div className="text-[11px] text-gray-400 font-medium">Time Slot</div>
                                                    <div className="font-semibold">{appt?.time || "10:00 AM"}</div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Patient Details */}
                                        <div className="text-xs text-gray-500 space-y-1 mb-4">
                                            <div className="flex items-center justify-between">
                                                <span>Consultation Fee:</span>
                                                <span className="font-bold text-gray-800 text-sm">
                                                    ₹{appt?.fees || doctor?.price || 500}
                                                </span>
                                            </div>
                                            {appt?.phone && (
                                                <div className="flex items-center justify-between">
                                                    <span>Patient Phone:</span>
                                                    <span className="text-gray-700">{appt.phone}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="pt-3 border-t border-gray-100 flex items-center gap-2">
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            startIcon={<Video size={16} />}
                                            onClick={() => {
                                                if (appt?._id) {
                                                    router.push(`/video-call?appointmentId=${appt._id}`);
                                                }
                                            }}
                                            sx={{
                                                backgroundColor: "#7c3aed !important",
                                                textTransform: "none",
                                                borderRadius: "8px",
                                                fontWeight: 600,
                                                py: 1,
                                                "&:hover": { backgroundColor: "#6d28d9 !important" }
                                            }}
                                        >
                                            Join Video Call
                                        </Button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
