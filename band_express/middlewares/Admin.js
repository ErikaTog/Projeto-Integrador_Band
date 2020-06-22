const { validationResult } = require('express-validator');

const admin = {
    error: async (req, res, next) => {
        let errors = validationResult(req).array({ onlyFirstError: true });
        console.log(errors)

        if(errors.length) {
            req.flash('errorValidator', errors);
            res.redirect(`/admin`);
            return
        } 

        next();
    }
}

module.exports = admin;