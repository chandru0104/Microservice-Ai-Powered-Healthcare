"use client"

import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import Image from 'next/image';
import { OtpUser, OtpDoctor } from 'apps/client/src/services/authService';
import { useRouter } from "next/navigation"
import { useParams } from 'next/navigation';

const OtpSend: React.FC = () => {

    const [loading, setLoading] = useState(false)

    const router = useRouter()
    const params = useParams()

    const onFinish = async (values: { otp: string }) => {
        try {
            setLoading(true)
            if (params.role === "user") {
                const getOtp = await OtpUser(Number(values.otp))
                if (getOtp) {
                    router.push("/user-login")
                }
                localStorage.setItem("tempEmailUser", values.toString())
            } else if (params.role === "doctor") {
                const getOtpdoc = await OtpDoctor(Number(values.otp))
                if (getOtpdoc) {
                    router.push("/doctor-login")
                }
                localStorage.set("tempEmailDoctor", values.toString())
            }
        } catch (error: any) {
            console.error(error.message);
        } finally {
            setLoading(false)
        }

    };

    return (
        <div className='min-h-screen flex items-center justify-center'>

            <Form
                name="login"
                initialValues={{ remember: true }}
                style={{ maxWidth: 360, padding: "50px", borderRadius: "20px" }}
                onFinish={onFinish}
                className='shadow-2xl border-gray-900 border-1 w-[800px]'
            >
                <div className='flex items-center justify-center'>
                    <Image src={"/logo.png"} height={60} width={60} alt='logo' />
                    <h2 className='text-center'>Care Hub</h2>

                </div>
                <h2 className='text-center p-8'>Otp verify</h2>
                <Form.Item
                    name="otp"
                    rules={[{ required: true, message: 'Please enter your Otp!' }]}
                >
                    <Input placeholder="Otp" />
                </Form.Item>


                <Form.Item>
                    <Button block type="primary" htmlType="submit" loading={loading}>
                        verify
                    </Button>

                </Form.Item>
            </Form>
        </div>
    );
};

export default OtpSend;