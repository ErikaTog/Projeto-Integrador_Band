const { validationResult } = require('express-validator');
const {Usuario, Banda, BandaIntegrantes, Cidade, Estado, Minha_rede, Audio, Video} = require('../models')

const perfilBanda = {
    error: async (req, res, next) => {
        let errors = validationResult(req).array({ onlyFirstError: true });
        console.log(errors)

        //Selecionando o id da banda
        const dadosBanda = await Banda.findOne({
            raw: true,
            attributes: ['id_banda'],
            where: {
                id_banda: req.params.id
            }
        })
  
        if(errors.length) {
            req.flash('errorValidator', errors);
            res.redirect(`/perfil/banda/${dadosBanda.id_banda}`)
            return 
        } 

        next();
    }
}

module.exports = perfilBanda;
    

