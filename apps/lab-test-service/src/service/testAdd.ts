import { addTest } from "../utils/interfaces"
import { LabTest } from "../model/labTest"


export const addTestService = async (data: addTest) => {

    try {
        const { name, categoryId, authorDetailsId, description, sampleType, gender, ageGroup, reportDelivery, price, address } = data

        const addTest = await LabTest.create({ name, categoryId, authorDetailsId, description, sampleType, gender, ageGroup, reportDelivery, price, address })
        await addTest.populate(["categoryId", "authorDetailsId"])
        return addTest


    } catch (error: any) {
        throw new Error(error.message)
    }
}


export const listTestService = async (page: number, limit: number) => {
    try {
        const pages = (page - 1) * limit

        const listTest = await LabTest.find({ status: 1 }).populate(["categoryId", "authorDetailsId"]).skip(pages).limit(limit)

        return listTest
    } catch (error: any) {
        throw new Error(error.message)
    }
}


export const listTestOneService = async (id: String) => {
    try {


        const listTest = await LabTest.findOne({ _id: id, status: 1 }).populate(["categoryId", "authorDetailsId"])

        return listTest
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const upadateTestService = async (id: String, data: addTest) => {

    try {
        const payload = {
            ...data
        }

        const updateTest = await LabTest.findByIdAndUpdate(id, payload, { runValidators: true, new: true })

        return updateTest

    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const deleteTestService = async (id: String) => {
    try {
        await LabTest.findByIdAndUpdate(id, { status: 0 }, { runValidators: true, new: true })
    } catch (error: any) {
        throw new Error(error.message)
    }
}