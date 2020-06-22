let feedVagas = [];
let minhasVagas = [];
let flag = 1;
let limite = 4;
let feedLimite = limite;
let minhasLimite = limite;
let vagaEditadaId = 0;

const clickDelete = async (evt) => {

    evt.preventDefault();

    let id = String(evt.target.id);
    id = id.slice(7)

    const data =  { 
        apagarVaga: minhasVagas[id].id_vagas
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

const clickEditarModal = (evt) => {

    evt.preventDefault();

    let id = String(evt.target.id);
    id = id.slice(6)

    let radioEditar = document.getElementsByName('tipoVagaEditar');
    
    for (let i = 0; i < 3; i++) {
        if( radioEditar[i].value == minhasVagas[id].tipo_vaga){
            radioEditar[i].checked = true
        }
    }

    let tituloVaga = document.getElementById('textareaTituloVaga');
    tituloVaga.innerText = minhasVagas[id].titulo;

    local(id);

    let descricaoVaga = document.getElementById('textareaDescricaoVaga');
    descricaoVaga.innerText = minhasVagas[id].descricao;

    vagaEditadaId = minhasVagas[id].id_vagas;

}

const salvarEdicao = async (evt) => {

    let tituloVaga = document.getElementById('textareaTituloVaga');
    let estado = document.getElementById('inputEstado2');
    let cidadeSelect = document.getElementById('inputCidade2');
    let descricaoVaga = document.getElementById('textareaDescricaoVaga');

    let radioSalvar = document.getElementsByName('tipoVagaEditar');

    let tipo = "";
    for (var i = 0; i < 3; i++){
        if(radioSalvar[i].checked){
            tipo = radioSalvar[i].value
        }
    }

    const data =  { 
        tipo: tipo,
        id: vagaEditadaId,
        tituloNovo: tituloVaga.value,
        estadoNovo: estado.value,
        cidadeNova: cidadeSelect.value,
        descricaoNova: descricaoVaga.value
     };

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    const response = await fetch('/vagas/dadosEditar', options);
    const dadosBack = await response.json();

    buscar();
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

    let salvar = document.getElementById('salvarEdicao');
    salvar.addEventListener('click', salvarEdicao);

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
                        editarVaga.setAttribute("data-toggle", "modal");
                        editarVaga.setAttribute("data-target", "#editarVaga");
                        editarVaga.addEventListener('click', clickEditarModal);
                        linksDiv.appendChild(editarVaga);

                        let excluirVaga = document.createElement('a');
                        excluirVaga.innerText = 'Excluir';
                        excluirVaga.id = 'excluir' + i;
                        excluirVaga.href = '';
                        excluirVaga.addEventListener('click', clickDelete);
                        linksDiv.appendChild(excluirVaga);
        }
    }

    if(flag == 1 && feedVagas.length >= 4){ 
        let botaoVaga = document.createElement('div');
        botaoVaga.className = 'botao';
        vagasJS.appendChild(botaoVaga);

            let botaoMaisVaga = document.createElement('button');
            botaoMaisVaga.className = 'btn btn-mais';
            botaoMaisVaga.innerText = '+ Vagas';
            botaoMaisVaga.type = 'button';
            botaoMaisVaga.addEventListener('click', btnFeed);
            botaoVaga.appendChild(botaoMaisVaga);
    }

    if(flag == 0 && minhasVagas.length >= 4){ 
        let botaoVaga = document.createElement('div');
        botaoVaga.className = 'botao';
        vagasJS.appendChild(botaoVaga);

                let botaoMaisVaga = document.createElement('button');
                botaoMaisVaga.className = 'btn btn-mais';
                botaoMaisVaga.innerText = '+ Vagas';
                botaoMaisVaga.type = 'button';
                botaoMaisVaga.addEventListener('click', btnMinhasVagas);
                botaoVaga.appendChild(botaoMaisVaga);
    }

    if((flag == 1 && feedVagas.length == 0) || (flag == 0 && minhasVagas.length == 0)){ 
        let mensagemdiv = document.createElement('div');
        mensagemdiv.className = 'msg-incentivoDiv';
        vagasJS.appendChild(mensagemdiv);

            let mensagem = document.createElement('p');
            mensagem.className = 'msg-incentivo';
            mensagem.innerText = 'Não foi possível encontrar nenhuma vaga com o valor pesquisado';
            mensagemdiv.appendChild(mensagem);
    }    
}

const local = (id) => {

    let cidadeJs2 = JSON.parse(cidadesJSON2);
    let estadoJs2 = JSON.parse(estadosJSON2);
    let estado2 = document.getElementById('inputEstado2');
    let cidadeSelect2 = document.getElementById('inputCidade2');

    let indexEstado = 0;
    for(let i = 0; i < estadoJs2.length; i++){
        if(estadoJs2[i].uf == minhasVagas[id].estado_vaga){
            indexEstado = estadoJs2[i].id_estado;
        }
    }
    estado2.value = indexEstado;

    let indexCidade = 0;
    for(let i = 0; i < cidadeJs2.length; i++){
        if(cidadeJs2[i].cidade == minhasVagas[id].cidade_vaga){
            indexCidade = cidadeJs2[i].id_cidade;
        }
    }

    cidadeJs2.forEach(cidade => {
        if (indexEstado == cidade.id_estado) {
            let cidadeOption2 = document.createElement("option");
            cidadeOption2.value = cidade.id_cidade;
            cidadeOption2.innerText = cidade.cidade;
            cidadeSelect2.appendChild(cidadeOption2);
        }
    });
    cidadeSelect2.value = indexCidade;

    estado2.addEventListener('change', function(event) {
        cidadeSelect2.innerHTML = '';
        cidadeJs2.forEach(cidade => {
            if (event.target.value == cidade.id_estado) {
                
                let cidadeOption2 = document.createElement("option");
                cidadeOption2.value = cidade.id_cidade;
                cidadeOption2.innerText = cidade.cidade;
                cidadeSelect2.appendChild(cidadeOption2);
            }
        });
    })
}

window.onload = buscar();