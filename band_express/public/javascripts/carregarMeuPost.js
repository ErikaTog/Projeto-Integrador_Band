// Curtidas do usuário (info de BD)
let curtidasJs = JSON.parse(curtidasJSON);
let comentariosJs = JSON.parse(comentariosJSON);

let publicacao = document.getElementById('publicacao');
let buttonCarregar = document.getElementById('carregarPost');

// Carregar novos Posts >> BD

async function maisPosts() {
    try {
        let page = buttonCarregar.value;
        let buscarPost = await fetch(`/minhaPublicacao/carregarPost/${page}`);
        let listaPosts = await buscarPost.json();

        return listaPosts;

    } catch (error) {
        console.log(error);
    }
}

// Criar elementos
const elementosHtmlPost = (list) => {

    for (const item of list) {
        
        let divCard = document.createElement('div');
        divCard.className = 'card-feed';
        
            let divMedia = document.createElement('div');
            divMedia.className = 'media';

                let aPerfil = document.createElement('a');
                aPerfil.href = item.link_perfil;

                    let imgAvatar = document.createElement('img');
                    imgAvatar.className = 'mini-avatar';
                    imgAvatar.src = item.avatar;
                    imgAvatar.alt = item.nome;
                    aPerfil.appendChild(imgAvatar);

                    let nomeUsuario = document.createElement('h5');
                    nomeUsuario.innerText = item.nome;
                    aPerfil.appendChild(nomeUsuario);

                divMedia.appendChild(aPerfil);
            
            divCard.appendChild(divMedia);
            
            if (item.imagem) {
                let imgPost = document.createElement('img');
                imgPost.className = 'img-public';
                imgPost.src = item.imagem;
                imgPost.alt = "Publicação";
                divCard.appendChild(imgPost);
            }

            if (item.video_arquivo) {
                let video = document.createElement('video');
                video.controls = true;

                    let sourceMp4 = document.createElement('source');
                    sourceMp4.src = item.video_arquivo;
                    sourceMp4.type = 'video/mp4';
                    video.appendChild(sourceMp4);

                    let sourceWebm = document.createElement('source');
                    sourceWebm.src = item.video_arquivo;
                    sourceWebm.type = 'video/webm';
                    video.appendChild(sourceWebm);

                    let aviso = document.createElement('p');
                    aviso.innerText = 'Seu browser não suporta este recurso';
                    video.appendChild(aviso);
                
                divCard.appendChild(video);
            }

            if (item.video_link) {
                let iframe = document.createElement('iframe');
                iframe.src = item.video_link;
                iframe.frameBorder = '0';
                iframe.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture';
                iframe.allowFullscreen = true;

                divCard.appendChild(iframe);
            }

            let textoPost = document.createElement('p');
            textoPost.style = 'white-space: pre-wrap';
            textoPost.innerText = item.texto;
            divCard.appendChild(textoPost);

            let divIcon = document.createElement('div');
            divIcon.className = 'curtir';
            divIcon.id = 'grupoIconPost';

                let divIconeCurtir = document.createElement('div');

                    let iconeCurtir = document.createElement('i');
                    iconeCurtir.className = 'fas fa-star';
                    divIconeCurtir.appendChild(iconeCurtir);

                    let quantCurtida = document.createElement('span');
                    curtidasJs.forEach(curtida => {
                        if (item.id_post == curtida.id_post) {
                            quantCurtida.innerText = curtida.curtidas;
                        }
                    });
                    divIconeCurtir.appendChild(quantCurtida);
                
                divIcon.appendChild(divIconeCurtir);

                let aComentario = document.createElement('a');
                aComentario.setAttribute('data-toggle', 'collapse');
                aComentario.href = `#collapseComentario${item.id_post}`;
                aComentario.setAttribute('role', 'button');
                aComentario.setAttribute('aria-expanded', 'false');
                aComentario.setAttribute('aria-controls', 'collapseExample');
                
                    let iconeComentario = document.createElement('img');
                    iconeComentario.src = '/img/icones/icon_comment.svg';
                    iconeComentario.alt = 'Comentar';
                    aComentario.appendChild(iconeComentario);
                
                divIcon.appendChild(aComentario);
            
            divCard.appendChild(divIcon);

            let grupoComentario = document.createElement('div');
            grupoComentario.className = 'collapse comentarios';
            grupoComentario.id = `collapseComentario${item.id_post}`;
                    
                let divComentarios = document.createElement('div');
                divComentarios.className = 'box-comentario';

                    comentariosJs.forEach(comentario => {
                        if (item.id_post == comentario.id_post) {
                            let divComentario = document.createElement('div');
                            divComentario.className = 'media comentario';

                                let aPerfilComentario = document.createElement('a');
                                aPerfilComentario.href = comentario.link_perfil;
                
                                    let imgAvatarComentario = document.createElement('img');
                                    imgAvatarComentario.className = 'mini-avatar';
                                    imgAvatarComentario.src = comentario.avatar;
                                    imgAvatarComentario.alt = comentario.nome;
                                    aPerfilComentario.appendChild(imgAvatarComentario);
                                
                                divComentario.appendChild(aPerfilComentario);

                                let divCardComentario = document.createElement('div');
                                divCardComentario.className = 'card-feed';
                                    
                                    let aPerfilCardComentario = document.createElement('a');
                                    aPerfilCardComentario.href = comentario.link_perfil;

                                        let nomeUsuarioComentario = document.createElement('p');
                                        nomeUsuarioComentario.className = 'nome-comentario';
                                        nomeUsuarioComentario.innerText = comentario.nome;
                                        aPerfilCardComentario.appendChild(nomeUsuarioComentario);
                                    
                                    divCardComentario.appendChild(aPerfilCardComentario);

                                    let textoComentario = document.createElement('p');
                                    textoComentario.className = 'texto-comentario';
                                    textoComentario.style = 'white-space: pre-wrap';
                                    textoComentario.innerText = comentario.comentario;

                                    divCardComentario.appendChild(textoComentario);
                                
                                divComentario.appendChild(divCardComentario);
                            
                            divComentarios.appendChild(divComentario);
                        }
                    })
                
                grupoComentario.appendChild(divComentarios);

                let formComentario = document.createElement('form');
                formComentario.action = '/minhaPublicacao';
                formComentario.method = 'POST';
                    
                    let divForm = document.createElement('div');
                    divForm.className = 'form-group';

                        let textareaComentario = document.createElement('textarea');
                        textareaComentario.className = 'form-control';
                        textareaComentario.id = 'inputComentario';
                        textareaComentario.rows = '1';
                        textareaComentario.placeholder = 'Adicione um comentário...';
                        textareaComentario.name = 'comentario';
                        textareaComentario.required = true;
                        divForm.appendChild(textareaComentario);

                        let inputIdPost = document.createElement('input');
                        inputIdPost.type = 'hidden';
                        inputIdPost.name = 'id_post';
                        inputIdPost.value = `${item.id_post}`;
                        divForm.appendChild(inputIdPost);

                        let buttonSend = document.createElement('button');
                        buttonSend.type = 'submit';
                        buttonSend.className = 'btn-submit';

                            let iconeSend = document.createElement('img');
                            iconeSend.src = '/img/icones/icon_send.svg';
                            iconeSend.alt = 'Enviar';
                            buttonSend.appendChild(iconeSend);

                        divForm.appendChild(buttonSend);
                    
                    formComentario.appendChild(divForm);

                grupoComentario.appendChild(formComentario);
            
            divCard.appendChild(grupoComentario);
        
        publicacao.appendChild(divCard);
    }
}

// Realizar busca e incrementar
let carregarPost = async () => {
    try {
        let postsBuscados = await maisPosts();

        await elementosHtmlPost(postsBuscados);

        if (postsBuscados.length < 4) {

            let divMsg = document.getElementById('msg');

            let msg = document.createElement('h5');
            msg.className = 'msg-carregar-musica';
            msg.innerText = 'Não tem mais post para carregar...';
            divMsg.appendChild(msg);

            buttonCarregar.classList.add('invisible');
            return
        }

        let cont = Number(buttonCarregar.value);
        cont += 1;
        buttonCarregar.value = cont;  

    } catch (error) {
        console.log(error)
    }
    
}

buttonCarregar.addEventListener('click', carregarPost);
