const { Usuario, Musico, Banda, Estabelecimento, Minha_rede, Cidade} = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const minhaRedeController = {
    show: async (req, res) => {

        // console.log(req.session.usuario)

        const dadosMusico = await Musico.findOne({ 
            where: { id_usuario: req.session.usuario.id_usuario },
            raw: true,
            attributes: ['id_musico'] 
        });

        const dadosBanda = await Banda.findOne({
            raw: true,
            attributes: ['id_banda'],
            where: {
                id_usuario: req.session.usuario.id_usuario
            }
        });

        const dadosEstab = await Estabelecimento.findOne({ 
            where: { id_usuario: req.session.usuario.id_usuario },
            raw: true,
            attributes: ['id_estab'] 
        });



        //********************Seguindo********************
          
        //Pessoas que o usuário da sessão está seguindo
        let seguindo = await Minha_rede.findAll({
            raw: true,
            attributes: ['id_usuario_seguido', 'usuario_seguido.nome', 'usuario_seguido.avatar', 'usuario_seguido.id_tipos_perfil', 'usuario_seguido.link_perfil' ],
            include: [{
                attributes: [],
                model: Usuario,
                as: 'usuario_seguido'
            }], 
            
            where: {
                id_usuario: req.session.usuario.id_usuario
            }
        });
        // console.log(seguindo)


        //********************Seguidores********************
        
        //Pessoas que estão seguindo o usuário da sessão
        let seguidores = await Minha_rede.findAll({
            raw: true,
            attributes: ['id_usuario', 'usuario.nome', 'usuario.avatar', 'usuario.id_tipos_perfil', 'usuario.link_perfil'],
            include: [{
                attributes: [],
                model: Usuario,
                as: 'usuario'
            }], 
            where: {
                id_usuario_seguido: req.session.usuario.id_usuario
            }
        });
        // console.log(seguidores)

               
       //********************Recomendados********************
           
        //Buscando a cidade do usuário da sessão
        let localUsuario = await Usuario.findOne({
            raw: true,
            attributes:['id_cidade', 'id_estado'],
            where: {
                id_usuario: req.session.usuario.id_usuario                
            }
        });
        // console.log(localUsuario.id_cidade)

        //Pessoas com a mesma cidade do usuário da sessão
        let usuariosCidade = await Usuario.findAll({
            raw: true,
            attributes: ['id_usuario', 'nome', 'avatar'],
            where:{
                id_cidade: localUsuario.id_cidade
            }
        });
        // console.log(usuariosCidade)

        //Criando lista de id_usuários que tem a mesma cidade
        let ids = []
        usuariosCidade.forEach(usuario => {
            ids.push(usuario.id_usuario)
        });
        // console.log(ids)

        //Criando lista de id_usuários seguidos 
        let idSeguindo = []
        seguindo.forEach(usuario => {
            idSeguindo.push(usuario.id_usuario_seguido)
        });
        // console.log(idSeguindo)

        //Iterando sobre idSeguindo, comparando com ids e retirando ele mesmo e os que ele já segue
        idSeguindo.forEach(idseg => {
            if (ids.indexOf(idseg) != -1){
                ids.splice(ids.indexOf(idseg), 1)
                // console.log(ids)
            }
        });
        ids.splice(ids.indexOf(req.session.usuario.id_usuario), 1)
        // console.log(ids)

        //Buscando somente os usuários com os ids que sobraram em ids para recomendar ao usuário
        let recomendados = await Usuario.findAll({
            raw: true,
            attributes: ['id_usuario', 'nome', 'avatar', 'link_perfil'],
            where:{
                id_usuario: ids
            },
            limit: 10
        });
        // console.log(recomendados)


        //********************Geral********************

        //Pessoas com o mesmo estado do usuário da sessão
        let usuariosEstado = await Usuario.findAll({
            raw: true,
            attributes: ['id_usuario', 'nome', 'avatar'],
            where:{
                id_estado: localUsuario.id_estado
            }
        });
        // console.log(usuariosEstado)

        //Criando lista de id_usuários que tem o mesmo estado
        let idsEst = []
        usuariosEstado.forEach(usuario => {
            idsEst.push(usuario.id_usuario)
        });
        // console.log(idsEst)

        //Iterando sobre idSeguindo, comparando com idsEstados e retirando ele mesmo e os que ele já segue
        idSeguindo.forEach(idseg => {
            if (idsEst.indexOf(idseg) != -1){
                idsEst.splice(idsEst.indexOf(idseg), 1)
                console.log(idsEst)
            }
        });
        idsEst.splice(idsEst.indexOf(req.session.usuario.id_usuario), 1)
        // console.log(idsEst)


        //Criando lista de id_usuários seguidores
        let idSeguidores = []
        seguidores.forEach(usuario => {
            idSeguidores.push(usuario.id_usuario)
        });
        // console.log(idSeguidores)

        //Iterando sobre idSeguidores, comparando com o que sobrou em idsEst e retirando seus seguidores
         idSeguidores.forEach(idseg => {
            if (idsEst.indexOf(idseg) != -1){
                idsEst.splice(idsEst.indexOf(idseg), 1)
                console.log(idsEst)
            }
        });         

        //Buscando somente os usuários com os ids que sobraram em idsEst para mostrar no geral
        let geral = await Usuario.findAll({
            raw: true,
            attributes: ['id_usuario', 'nome', 'avatar', 'link_perfil'],
            where:{
                id_usuario: idsEst
            },
            limit: 20
        });
        // console.log(geral)
        
        return res.render('minhaRede', { 
            title: 'Minha Rede', 
            usuario: req.session.usuario, 
            dadosMusico, 
            dadosBanda, 
            dadosEstab, 
            seguindo,
            seguidores,
            recomendados,
            geral
        })    
    }, 

    busca: async (req, res) => {   
        let {buscar} = req.body
        console.log(buscar)

        let encontrado = await Usuario.findAll({
            raw: true,
            attributes: ['id_usuario', 'nome', 'avatar', 'link_perfil'],
            where:{
                nome: {[Op.like]:'%'+buscar+'%'} 
            }           
        });
        // console.log(encontrado)
        

         //********************Seguidores********************
        
        //Pessoas que estão seguindo o usuário da sessão
        let seguidoresEncontrados = await Minha_rede.findAll({
            raw: true,
            attributes: ['id_usuario', 'usuario.nome', 'usuario.avatar', 'usuario.id_tipos_perfil', 'usuario.link_perfil'],
            include: [{
                attributes: [],
                model: Usuario,
                as: 'usuario',
                where:{
                    nome: {[Op.like]:'%'+buscar+'%'}
                }
            }], 
            where: {
                id_usuario_seguido: req.session.usuario.id_usuario
            }
        });
        console.log(seguidoresEncontrados)


         //********************Seguindo********************
          
        //Pessoas que o usuário da sessão está seguindo
        let seguindoEncontrados = await Minha_rede.findAll({
            raw: true,
            attributes: ['id_usuario_seguido', 'usuario_seguido.nome', 'usuario_seguido.avatar', 'usuario_seguido.id_tipos_perfil', 'usuario_seguido.link_perfil' ],
            include: [{
                attributes: [],
                model: Usuario,
                as: 'usuario_seguido',
                where:{
                    nome: {[Op.like]:'%'+buscar+'%'}
                }
            }],             
            where: {
                id_usuario: req.session.usuario.id_usuario
            }
        });
        console.log(seguindoEncontrados)


        //********************Geral********************

        //Base de usuários
        let usuarios = await Usuario.findAll({
            raw: true,
            attributes: ['id_usuario', 'nome', 'avatar'],
            where:{
                 nome: {[Op.like]:'%'+buscar+'%'}
            }
        });
        console.log(usuarios)

        //Criando lista de id_usuários
        let idUsers = []
        usuarios.forEach(usuario => {
            idUsers.push(usuario.id_usuario)
        });
        console.log(idUsers)


        //Criando lista de id_usuários seguindo
        let idSeguindo = []
        seguindoEncontrados.forEach(usuario => {
            idSeguindo.push(usuario.id_usuario)
        });
        console.log(idSeguindo)


        //Iterando sobre idSeguindo, comparando com idUsers e retirando ele mesmo e os que ele já segue
        idSeguindo.forEach(idseg => {
            if (idUsers.indexOf(idseg) != -1){
                idUsers.splice(idUsers.indexOf(idseg), 1)
                console.log(idUsers)
            }
        });
        // idUsers.splice(idUsers.indexOf(req.session.usuario.id_usuario), 1)
        // console.log(idUsers)


        //Criando lista de id_usuários seguidores
        let idSeguidores = []
        seguidoresEncontrados.forEach(usuario => {
            idSeguidores.push(usuario.id_usuario)
        });
        console.log(idSeguidores)

        //Iterando sobre idSeguidores, comparando com o que sobrou em idUsers e retirando seus seguidores
         idSeguidores.forEach(idseg => {
            if (idUsers.indexOf(idseg) != -1){
                idUsers.splice(idUsers.indexOf(idseg), 1)
                console.log(idUsers)
            }
        });         

        //Buscando somente os usuários com os ids que sobraram em idUsers para mostrar no geral
        let geral = await Usuario.findAll({
            raw: true,
            attributes: ['id_usuario', 'nome', 'avatar', 'link_perfil'],
            where:{
                id_usuario: idUsers
            },
            limit: 20
        });
        console.log(geral)

        
       
    }
    
}

module.exports = minhaRedeController;
