import multer from "multer";
import path from "path"

const storage =multer.diskStorage({
    destination(req, file, cb){
        cb(null, './uploads')
    },
    filename(req, file, cb){
        const name = path.extname(file.originalname);

        cb(null, `Avatar${Date.now()}${name}`)
    }
})

const upload = multer({storage})

export default upload;