import multer from "multer"

// const filePath = path.resolve(__dirname, "../uploads")

// if(!fs.existsSync(filePath)){
//     mkdirSync(filePath,{recursive:true})
// }


const storage = multer.memoryStorage()


export const uploader = multer({
    storage
})