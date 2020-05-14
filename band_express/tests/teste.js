
const Sequelize = require ('sequelize');
const config = require ('../config/database');
const {Usuario, Banda, BandaIntegrantes} = require('../models')
    
    
    // inserindo banda nova na tabela usuario  
    //  const resultado1 = Usuario.create({
    //     nome:"Banda Teste", 
    //     email:"banda@gmail.com",
    //     senha:"123456",
    //     data_cadastro:"2020/05/12 19:50:00",
    //     admin: 0,
    //     perfil_id_perfil: 2
    // });

    // buscando o id do usuario banda criado acima
    async function busca(){
        const buscaId = await Usuario.findOne({
            where: {
                nome: "Banda Teste"
            }
        })
        
        const idUsuario = buscaId.dataValues.id_usuario;
        
        console.log("idUsuario: ", idUsuario)
       // inserindo dados complementares de banda na tabela banda
        // const resultado2 = await Banda.create({
        //     id_usuario: idUsuario,
        //     genero:"jazz",
        //     sobre:"minha banda é 10!",
        //     estado:"SP",
        //     cidade:"Osasco",
        //     site:"www.banda.com.br",
        //     canal:"youtube.com/banda",
        //     email:"outroemailbanda@gmail.com"
        // }); 

        // buscando id da banda na tabela banda
        const buscaIdBanda = await Banda.findOne({
            where: {
                id_usuario: 5
            }
        })
        const idBanda = buscaIdBanda.dataValues.id_banda;        
        


        // console.log("idBanda: ", idBanda)

        // buscando o id dos integrantes na tabela usuario 
        // const buscaIdMusico = await Usuario.findOne({
        //     where: {
        //         nome: "Erika"
        //     }
        // })
        // const idMusico = await buscaIdMusico.dataValues.id_usuario;
        //  console.log("idMusico: ", idMusico)
   
       
        // //inserindo o id da banda e dos integrantes na tabela intermediaria
        // const resultado4 = await BandaIntegrantes.create({
        //     id_banda: 1,
        //     id_integrante: idMusico,
        //     funcao:"vocalista"
        // });

    }

busca()

    console.log("terminei")