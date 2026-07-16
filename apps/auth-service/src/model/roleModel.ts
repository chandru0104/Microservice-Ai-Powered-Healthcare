import mongoose from "mongoose";

const role = new mongoose.Schema({
    name:{
        type:String
    }
})

const permission = new mongoose.Schema({
    name:{
        type:String
    }
})


const rolePermission = new mongoose.Schema({
    userRole:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Role"
    },
    userPermission:{
        type:mongoose.Schema.ObjectId,
        ref:"Permission"
    }
})


export const Role = mongoose.model("Role",role)
export const Permission = mongoose.model("Permission",permission)
export const RolePermission = mongoose.model("RolePermission",rolePermission)