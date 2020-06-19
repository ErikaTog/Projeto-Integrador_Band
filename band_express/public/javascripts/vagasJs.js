let feedVagas = [];
let minhasVagas = [];
let flag = 1;
let limite = 4;
let feedLimite = limite;
let minhasLimite = limite;

const clickDelete = async (evt) => {

    evt.preventDefault();

    let id = String(evt.target.id);
    id = id.slice(7)

    const data =  { 
        apagarVaga: vagas[id].id_vagas
     };

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    const response = await fetch('/vagas/dadosApagar', options);
    const dadosBack = await response.json();

    buscar();
}

const clickEditar = (evt) => {

    evt.preventDefault();

    // let id = String(evt.target.id);
    // console.log(id)


    // loadMinhasVagas();
}

const initFeed = () => {
    feedLimite = limite;
    flag = 1;
    buscar();
}

const initMinhasVagas = () => {
    minhasLimite = limite;
    flag = 0;
    buscar();
}

const buscarInit = () => {
    feedLimite = limite;
    minhasLimite = limite;
    buscar();
}

const buscarInitEnter = (evt) => {
    evt.preventDefault();
    buscarInit();
}

const btnFeed = () => {
    feedLimite = feedLimite + limite;
    buscar();
}

const btnMinhasVagas = () => {
    minhasLimite = minhasLimite + limite;
    buscar();
}

const buscar = async () => {

    feedVagas = [];
    minhasVagas = [];

    let radioBusca = document.getElementsByName('customRadio2');
    let buscarVaga = document.getElementById('buscarVaga').value;

    let tipo = "";
    for (var i = 0; i < 4; i++){
        if(radioBusca[i].checked){
            tipo = radioBusca[i].value
        }
    }

    const data =  { 
        tipo,
        buscarVaga,
        feedLimite,
        minhasLimite
     };

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    const response = await fetch('/vagas/dadosBuscar', options);
    const dadosBack = await response.json();

    for (let i = 0 ; i < dadosBack.buscaFeed.length ; i++) {

        feedVagas.push({
            cidade_vaga: dadosBack.buscaFeed[i].cidade_vaga,
            descricao: dadosBack.buscaFeed[i].descricao,
            estado_vaga: dadosBack.buscaFeed[i].estado_vaga,
            id_usuario: dadosBack.buscaFeed[i].id_usuario,
            id_vagas: dadosBack.buscaFeed[i].id_vagas,
            tipo_vaga: dadosBack.buscaFeed[i].tipo_vaga,
            titulo: dadosBack.buscaFeed[i].titulo,
            nome: dadosBack.buscaFeed[i].usuario.nome,
            link_perfil: dadosBack.buscaFeed[i].usuario.link_perfil
        });
    }

    for (let i = 0 ; i < dadosBack.buscaMinhasVagas.length ; i++) {

        minhasVagas.push({
            cidade_vaga: dadosBack.buscaMinhasVagas[i].cidade_vaga,
            descricao: dadosBack.buscaMinhasVagas[i].descricao,
            estado_vaga: dadosBack.buscaMinhasVagas[i].estado_vaga,
            id_usuario: dadosBack.buscaMinhasVagas[i].id_usuario,
            id_vagas: dadosBack.buscaMinhasVagas[i].id_vagas,
            tipo_vaga: dadosBack.buscaMinhasVagas[i].tipo_vaga,
            titulo: dadosBack.buscaMinhasVagas[i].titulo,
            nome: dadosBack.buscaMinhasVagas[i].usuario.nome,
            link_perfil: dadosBack.buscaMinhasVagas[i].usuario.link_perfil
        });
    }

    view();
}

const view = () => {

    let clickFeed = document.getElementById('customRadio7');
    clickFeed.addEventListener('click', initFeed);

    let clickMinhasVagas = document.getElementById('customRadio8');
    clickMinhasVagas.addEventListener('click', initMinhasVagas);
    
    let clickBuscar = document.getElementById('btnPesquisar');
    clickBuscar.addEventListener('click', buscarInit);

    let clickBuscarForm = document.getElementById('buscarVagaForm');
    clickBuscarForm.addEventListener('keypress', buscarInitEnter);

    let vagasJS = document.getElementById('vagasJS');
    vagasJS.innerHTML = '';

    if(flag) {

        for( let i = 0; i < feedVagas.length; i++ ) {

            let conteudoVaga = document.createElement('div');
            conteudoVaga.className = 'conteudo-vaga';
            conteudoVaga.id = 'conteudoVaga';
            vagasJS.appendChild(conteudoVaga);

                let tituloVaga = document.createElement('h5');
                tituloVaga.innerText = feedVagas[i].titulo;
                conteudoVaga.appendChild(tituloVaga);

                let descricaoVaga = document.createElement('p');
                descricaoVaga.innerText = feedVagas[i].descricao;
                conteudoVaga.appendChild(descricaoVaga);

                let localVaga = document.createElement('p');
                localVaga.innerText = feedVagas[i].cidade_vaga + ' / ' + feedVagas[i].estado_vaga;
                conteudoVaga.appendChild(localVaga);

                    let linkVaga = document.createElement('a');
                    linkVaga.innerText = feedVagas[i].nome;
                    linkVaga.href = feedVagas[i].link_perfil;
                    conteudoVaga.appendChild(linkVaga);
        }
        
    } else {

        for( let i = 0; i < minhasVagas.length; i++ ) {

            let conteudoVaga = document.createElement('div');
            conteudoVaga.className = 'conteudo-vaga';
            conteudoVaga.id = 'conteudoVaga';
            vagasJS.appendChild(conteudoVaga);

                let tituloVaga = document.createElement('h5');
                tituloVaga.innerText = minhasVagas[i].titulo;
                conteudoVaga.appendChild(tituloVaga);

                let descricaoVaga = document.createElement('p');
                descricaoVaga.innerText = minhasVagas[i].descricao;
                conteudoVaga.appendChild(descricaoVaga);

                let localVaga = document.createElement('p');
                localVaga.innerText = minhasVagas[i].cidade_vaga + ' / ' + minhasVagas[i].estado_vaga;
                conteudoVaga.appendChild(localVaga);

                    let linksDiv = document.createElement('div');
                    linksDiv.id = 'linksDiv';
                    conteudoVaga.appendChild(linksDiv);

                        let editarVaga = document.createElement('a');
                        editarVaga.innerText = 'Editar';
                        editarVaga.id = 'editar' + i;
                        editarVaga.href = '';
                        // editarVaga.addEventListener('click', clickEditar);
                        linksDiv.appendChild(editarVaga);

                        let excluirVaga = document.createElement('a');
                        excluirVaga.innerText = 'Excluir';
                        excluirVaga.id = 'excluir' + i;
                        excluirVaga.href = '';
                        excluirVaga.addEventListener('click', clickDelete);
                        linksDiv.appendChild(excluirVaga);
        }
    }

    let botaoVaga = document.createElement('div');
    botaoVaga.className = 'botao';
    vagasJS.appendChild(botaoVaga);

        if(flag) {
            let botaoMaisVaga = document.createElement('button');
            botaoMaisVaga.className = 'btn btn-mais';
            botaoMaisVaga.innerText = '+ Vagas';
            botaoMaisVaga.type = 'button';
            botaoMaisVaga.addEventListener('click', btnFeed);
            botaoVaga.appendChild(botaoMaisVaga);

        } else {
            let botaoMaisVaga = document.createElement('button');
            botaoMaisVaga.className = 'btn btn-mais';
            botaoMaisVaga.innerText = '+ Vagas';
            botaoMaisVaga.type = 'button';
            botaoMaisVaga.addEventListener('click', btnMinhasVagas);
            botaoVaga.appendChild(botaoMaisVaga);
        }
}

window.onload = buscar();