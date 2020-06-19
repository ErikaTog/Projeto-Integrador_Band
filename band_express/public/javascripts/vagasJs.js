let vagas = [];
let valor = 0;
let flag = 1;

const loadFeed = async () => {

    vagas = [];
    const data =  { 
        valor
     };

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    const response = await fetch('/vagas/dadosFeed', options);
    const dadosBack = await response.json();

    for (let i = 0 ; i < dadosBack.limite ; i++) {
        vagas.push({
            cidade_vaga: dadosBack.pagina[i].cidade_vaga,
            descricao: dadosBack.pagina[i].descricao,
            estado_vaga: dadosBack.pagina[i].estado_vaga,
            id_usuario: dadosBack.pagina[i].id_usuario,
            id_vagas: dadosBack.pagina[i].id_vagas,
            tipo_vaga: dadosBack.pagina[i].tipo_vaga,
            titulo: dadosBack.pagina[i].titulo,
            nome: dadosBack.pagina[i].usuario.nome,
            link_perfil: dadosBack.pagina[i].usuario.link_perfil
        });
    }

    valor = dadosBack.limite;

    view();
}

const initFeed = async () => {
    vagas = [];
    valor = 0;
    flag = 1;
    loadFeed();
}

const loadMinhasVagas = async () => {

    vagas = [];
    const data =  { 
        valor
     };

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    const response = await fetch('/vagas/dadosMinhasVagas', options);
    const dadosBack = await response.json();

    for (let i = 0 ; i < dadosBack.limite ; i++) {
        vagas.push({
            cidade_vaga: dadosBack.pagina[i].cidade_vaga,
            descricao: dadosBack.pagina[i].descricao,
            estado_vaga: dadosBack.pagina[i].estado_vaga,
            id_usuario: dadosBack.pagina[i].id_usuario,
            id_vagas: dadosBack.pagina[i].id_vagas,
            tipo_vaga: dadosBack.pagina[i].tipo_vaga,
            titulo: dadosBack.pagina[i].titulo,
            nome: dadosBack.pagina[i].usuario.nome,
            link_perfil: dadosBack.pagina[i].usuario.link_perfil
        });
    }

    valor = dadosBack.limite;

    view();
}

const initMinhasVagas = async () => {
    vagas = [];
    valor = 0;
    flag = 0;
    loadMinhasVagas();
}

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

    initMinhasVagas();
}

const clickEditar = (evt) => {

    // evt.preventDefault();

    // let id = String(evt.target.id);
    // console.log(id)


    // loadMinhasVagas();
}

const view = () => {

    let clickFeed = document.getElementById('customRadio7');
    clickFeed.addEventListener('click', initFeed);

    let clickMinhasVagas = document.getElementById('customRadio8');
    clickMinhasVagas.addEventListener('click', initMinhasVagas);

    let vagasJS = document.getElementById('vagasJS');
    vagasJS.innerHTML = '';

    for( let i = 0; i < vagas.length; i++ ) {

        let conteudoVaga = document.createElement('div');
        conteudoVaga.className = 'conteudo-vaga';
        conteudoVaga.id = 'conteudoVaga';
        vagasJS.appendChild(conteudoVaga);

            let tituloVaga = document.createElement('h5');
            tituloVaga.innerText = vagas[i].titulo;
            conteudoVaga.appendChild(tituloVaga);

            let descricaoVaga = document.createElement('p');
            descricaoVaga.innerText = vagas[i].descricao;
            conteudoVaga.appendChild(descricaoVaga);

            let localVaga = document.createElement('p');
            localVaga.innerText = vagas[i].cidade_vaga + ' / ' + vagas[i].estado_vaga;
            conteudoVaga.appendChild(localVaga);

            if(flag) {
                let linkVaga = document.createElement('a');
                linkVaga.innerText = vagas[i].nome;
                linkVaga.href = vagas[i].link_perfil;
                conteudoVaga.appendChild(linkVaga);
                
            } else {
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
            botaoMaisVaga.addEventListener('click', loadFeed);
            botaoVaga.appendChild(botaoMaisVaga);

    } else {
            let botaoMaisVaga = document.createElement('button');
            botaoMaisVaga.className = 'btn btn-mais';
            botaoMaisVaga.innerText = '+ Vagas';
            botaoMaisVaga.type = 'button';
            botaoMaisVaga.addEventListener('click', loadMinhasVagas);
            botaoVaga.appendChild(botaoMaisVaga);
    }
}

window.onload = loadFeed();