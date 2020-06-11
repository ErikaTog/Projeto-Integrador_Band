const path = require('path');
const multer = require('multer');


const multerVideo = {
    
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './public/uploadsPost')
        },
        filename: (req, file, cb) => {
            cb(null, `${file.fieldname}${req.session.usuario.id_usuario}-${Date.now()}${path.extname(file.originalname)}`)
        }
    }),

    limits: {
        fileSize: 4 * 1024 * 1024 * 1024
    },

    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            'image/jpeg',
            'image/png',
            'image/gif',
            'image/tiff',
            'video/mp4',
            'video/webm'
        ]
        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        }else{
            cb(null, false);
            console.log("Erro de arquivo não suportado");
        }
    }

}

module.exports = multerVideo;