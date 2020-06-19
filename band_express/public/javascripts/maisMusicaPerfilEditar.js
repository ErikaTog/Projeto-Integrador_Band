let buttonCarregar = document.getElementById('carregarMusica');
let grupoMusic = document.getElementById('groupMusic');

// Realizar a busca de mais video
async function buscarVideo() {
    try {
        let page = buttonCarregar.value;
        let musicasBuscadas = await fetch(`/perfil/musico/carregarVideo/${id_usuario}/${page}`);
        let listaMusicas = await musicasBuscadas.json();

        return listaMusicas;

    } catch (error) {
        console.log(error);
    }
}

// Criar elementos
const elementosHtmlVideo = list => {    

    for (const item of list) {

        let divVideo = document.createElement('div');
        divVideo.className = 'musica-item col-xl-6 col-sm-12';

            let divLixo = document.createElement('div');
            divLixo.className = 'icon-border-none';

                let aLixo = document.createElement('a');
                aLixo.href = `/perfil/editar/musico/deletarVideo/${item.id_video}`

                    let iconeLixo = document.createElement('i');
                    iconeLixo.className = 'fas fa-trash fa-lg';
                    aLixo.appendChild(iconeLixo);
                
                divLixo.appendChild(aLixo);
            
            divVideo.appendChild(divLixo);

        if (item.tipo == 'arquivo') {
            let video = document.createElement('video');
            video.controls = true;

                let sourceMp4 = document.createElement('source');
                sourceMp4.src = item.caminho;
                sourceMp4.type = 'video/mp4';
                video.appendChild(sourceMp4);

                let sourceWebm = document.createElement('source');
                sourceWebm.src = item.caminho;
                sourceWebm.type = 'video/webm';
                video.appendChild(sourceWebm);

                let aviso = document.createElement('p');
                aviso.innerText = 'Seu browser não suporta este recurso';
                video.appendChild(aviso);
            
            divVideo.appendChild(video);

        } else if (item.tipo == 'link') {
            let iframe = document.createElement('iframe');
            iframe.src = item.caminho;
            iframe.frameBorder = '0';
            iframe.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture';
            iframe.allowFullscreen = true;

            divVideo.appendChild(iframe);
        }

        let tituloVideo = document.createElement('h5');
        tituloVideo.innerText = item.titulo;
        divVideo.appendChild(tituloVideo);

        grupoMusic.appendChild(divVideo);
    }
    
}

// Realizar a busca de mais áudio
async function buscarAudio() {
    try {
        let page = buttonCarregar.value;
        let musicasBuscadas = await fetch(`/perfil/musico/carregarAudio/${id_usuario}/${page}`);
        let listaMusicas = await musicasBuscadas.json();

        return listaMusicas;

    } catch (error) {
        console.log(error);
    }
}

// Criar elementos
const elementosHtmlAudio = list => {    

    for (const item of list) {

        let divAudio = document.createElement('div');
        divAudio.className = 'musica-item col-xl-6 col-sm-12';

        let divLixo = document.createElement('div');
            divLixo.className = 'icon-border-none';

                let aLixo = document.createElement('a');
                aLixo.href = `/perfil/editar/musico/deletarAudio/${item.id_audio}`;

                    let iconeLixo = document.createElement('i');
                    iconeLixo.className = 'fas fa-trash fa-lg';
                    aLixo.appendChild(iconeLixo);
                
                divLixo.appendChild(aLixo);
            
            divAudio.appendChild(divLixo);

        if (item.tipo == 'arquivo') {
            let divAudioPlayer = document.createElement('div');
            divAudioPlayer.className = 'player';

                let audio = document.createElement('audio');
                audio.controls = true;

                    let sourceMp3 = document.createElement('source');
                    sourceMp3.src = item.caminho;
                    sourceMp3.type = 'video/mp3';
                    audio.appendChild(sourceMp3);
                    
                    let sourceOgg = document.createElement('source');
                    sourceOgg.src = item.caminho;
                    sourceOgg.type = 'video/ogg';
                    audio.appendChild(sourceOgg);

                    let sourceAiff = document.createElement('source');
                    sourceAiff.src = item.caminho;
                    sourceAiff.type = 'video/aiff';
                    audio.appendChild(sourceAiff);
                    
                    let sourceFlac = document.createElement('source');
                    sourceFlac.src = item.caminho;
                    sourceFlac.type = 'video/flac';
                    audio.appendChild(sourceFlac);

                    let aviso = document.createElement('p');
                    aviso.innerText = 'Seu browser não suporta este recurso';
                    audio.appendChild(aviso);
                
                divAudioPlayer.appendChild(audio);
            
            divAudio.appendChild(divAudioPlayer);

        } else if (item.tipo == 'link') {
            let iframe = document.createElement('iframe');
            iframe.src = item.caminho;
            iframe.frameBorder = 'no';
            iframe.allow = 'autoplay';
            iframe.scrolling = 'no';

            divAudio.appendChild(iframe);
        }

        let tituloAudio = document.createElement('h5');
        tituloAudio.innerText = item.titulo;
        divAudio.appendChild(tituloAudio);

        grupoMusic.appendChild(divAudio);
    }
    
}


// Realizar a busca e incrementar
async function addMusicas() {
    try {
        let videosBuscados = await buscarVideo();
        let audiosBuscados = await buscarAudio();

        elementosHtmlVideo(videosBuscados);
        elementosHtmlAudio(audiosBuscados);
        
        if (videosBuscados.length < 4 && audiosBuscados.length < 4) {

            let divMsg = document.getElementById('msg');

            let msg = document.createElement('h5');
            msg.className = 'msg-carregar-musica';
            msg.innerText = 'Não tem mais música para carregar...';
            divMsg.appendChild(msg);

            buttonCarregar.classList.add('invisible');
            return
        }

        let cont = Number(buttonCarregar.value);
        cont += 1;
        buttonCarregar.value = cont;    
        
    } catch (error) {
        console.log(error);        
    }
}


buttonCarregar.addEventListener('click', addMusicas);