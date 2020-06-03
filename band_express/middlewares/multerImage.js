const path = require('path');
const multer = require('multer');


const multerAvatar = {
    
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve('__dirname','..','public', 'img', 'uploads'))
        },
        filename: (req, file, cb) => {
            cb(null, `${file.fieldname}${req.session.usuario.id_usuario}-${Date.now()}${path.extname(file.originalname)}`)
        }
    }),

    limits: {
        fileSize: 2 * 1024 * 1024,
        files: 1
    },

    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            'image/jpeg',
            'image/png',
            'image/gif',
            'image/tiff',   
        ]
        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        }else{
            cb(null, false);
            console.log("Erro de arquivo não suportado");
        }
    }

}

module.exports = multerAvatar;