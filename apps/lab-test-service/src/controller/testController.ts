
import { addTestService, listTestService, upadateTestService, deleteTestService,listTestOneService } from "../service/testAdd"
import { Request, Response } from "express"

export const testAddController = async (req: Request, res: Response) => {
    try {
        const data = req.body

        const addTest = await addTestService(data)

        res.status(201).json({
            success: true,
            message: "Lab test added",
            data: addTest
        })
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}


export const testListController = async (req: any, res: Response) => {
    try {
        const page = req.query.page
        const limit = req.query.limit
        const listTest = await listTestService(page,limit)

        res.status(200).json({
            success: true,
            message: "Lab test listed successfully",
            data: listTest
        })

    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const testListOneController = async (req: any, res: Response) => {
    try {
        const {id}= req.params
        const listTest = await listTestOneService(id)

        res.status(200).json({
            success: true,
            message: "Lab test listed successfully",
            data: listTest
        })

    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}


export const testUpdatController = async (req:Request,res:Response)=>{
    try{
        const {id}=req.params
        const data=req.body
        const testUpdate = await upadateTestService(id,data)

        res.status(201).json({
            success:true,
            message:"Lab test updated successfully",
            data:testUpdate
        })
    }catch(error:any){
         res.status(400).json({
            success:false,
            message:error.message,
         })
    }
}

export const testDeleteController = async (req:Request,res:Response)=>{
    try{
        const {id}=req.params
         await deleteTestService(id)

        res.status(200).json({
            success:true,
            message:"Lab test deleted successfully"
        })
    }catch(error:any){
        res.status(400).json({
             success:false,
             message:error.message
        })
    }
}