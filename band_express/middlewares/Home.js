const { validationResult } = require('express-validator');
const fs = require('fs');

const home = {
    error: async (req, res, next) => {
        let errors = validationResult(req).array({ onlyFirstError: true });
        console.log(errors)
        
        if(errors.length) {
            // Excluir o arquivo da pasta
            fs.unlinkSync(`./public/uploadsPost/${req.files[0].filename}`);

            req.flash('errorValidator', errors);
            res.redirect('/home')
            return 
        } 

        next();
    }
}

module.exports = home;