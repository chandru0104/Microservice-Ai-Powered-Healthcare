import multer from "multer"
import path from "path"
import fs, { mkdirSync } from "fs"

const filePath = path.resolve(__dirname, "../uploads")

if(!fs.existsSync(filePath)){
    mkdirSync(filePath,{recursive:true})
}


const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,filePath)
    },
    filename :function(req,file,cb){
        const fileName = Date.now() + "-" + file.originalname
        
        cb(null,fileName)
    }
})


export const uploader = multer({
    storage
})