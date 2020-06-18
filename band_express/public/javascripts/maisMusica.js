let buttonCarregar = document.getElementById('carregarMusica');
let grupoMusic = document.getElementById('groupMusic');

// Realizar a busca de mais video e audio
async function buscarVideo() {
    try {
        let page = buttonCarregar.value;
        let musicasBuscadas = await fetch(`/perfil/musico/carregarVideo/${page}`);
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

// Realizar a busca e incrementar
async function addMusicas() {
    try {
        let musicasBuscadas = await buscarVideo();
        elementosHtmlVideo(musicasBuscadas);

        let cont = Number(buttonCarregar.value);
        cont += 1;
        buttonCarregar.value = cont;    
    } catch (error) {
        console.log(error);        
    }
}


buttonCarregar.addEventListener('click', addMusicas);
// () => {
//     console.log(buttonCarregar.value);

//     // Requisição de mais video e audio
    
//     // Criar elementos com os dados


//     // Incrementando value do button
//     let cont = Number(buttonCarregar.value);
//     cont += 1;
//     buttonCarregar.value = cont;
// }
