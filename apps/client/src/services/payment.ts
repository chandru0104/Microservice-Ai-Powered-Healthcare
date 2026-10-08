import axios from "axios"


declare global {
    interface Window {
        Razorpay: any;
    }
}

const API_GATEWAY_URL = process.env.NEXT_PUBLIC_API_GATEWAY_URL || process.env.API_GATEWAY_URL || "http://localhost:5000"
const keyId = process.env.NEXT_PUBLIC_RAZORPAY_API_KEY || process.env.RAZORPAY_API_KEY || "rzp_test_TF2ZuOVH6kAxq8"

export const paymentAdd = async (orderId: any, amount?: any) => {
    try {
        const token = localStorage.getItem("userAccessToken")
        const add = await axios.post(`${API_GATEWAY_URL}/api/v1/payment/add`, { orderId }, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
        const amountRec = add?.data?.data?.amount
        const receipt = add?.data?.data?.receipt
        const razorpayOrderId = add?.data?.data?.id

        const options = {
            key: keyId, 
            amount: amountRec, 
            currency: "INR",
            name: 'Care Hub',
            description: 'Healthcare',
            order_id: razorpayOrderId, 
            callback_url: 'http://localhost:3000/user-appointment',
            handler: async (response: any) => {
                try {
                    await paymentVerfiy({
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                        receipt: receipt,
                    })
                    if(typeof window === "object"){
                        window.location.href="http://localhost:3000/user-orders"
                    }
                } catch (error: any) {
                    throw new Error(error.message)
                }
            },
            prefill: {
                name: 'Chandru',
                email: 'chandrus0104@gmail.com',
                contact: '9900990090'
            },
            theme: {
                color: '#F37254'
            }
        };

        if (typeof window !== "undefined" && window.Razorpay) {
            const rzp = new window.Razorpay(options);
            rzp.open();
        } else {
            console.error("Razorpay SDK is not loaded on window.");
        }

        return add
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const paymentVerfiy = async (payload: any) => {
    try {
        const token = localStorage.getItem("userAccessToken")
        const verify = await axios.post(`${API_GATEWAY_URL}/api/v1/payment/verify`, payload,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
        return verify
    } catch (error: any) {
        throw new Error(error.message)
    }
}
