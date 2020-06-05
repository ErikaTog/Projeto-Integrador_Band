const path = require('path');
const multer = require('multer');


const multerAudio = {
    
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './public/img/audio')
        },
        filename: (req, file, cb) => {
            cb(null, `${file.fieldname}${req.session.usuario.id_usuario}-${Date.now()}${path.extname(file.originalname)}`)
        }
    }),

    limits: {
        fileSize: 4 * 1024 * 1024 * 1024,
        // files: 1
    },

    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            'audio/mp3',
            'audio/AAC',
            'audio/WMA',
            'audio/WAVE',
            'audio/AIFF',
            'audio/Ogg',   
        ]
        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        }else{
            cb(null, false);
            console.log("Erro de arquivo não suportado");
        }
    }

}

module.exports = multerAudio;