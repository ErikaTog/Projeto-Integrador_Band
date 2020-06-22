let feedProduto = [];
let meusProdutos = [];
let flag = 1;
let limite = 4;
let feedLimite = limite;
let meusLimite = limite;

const clickDelete = async (evt) => {

    evt.preventDefault();

    let id = String(evt.target.id);
    id = id.slice(7)

    const data =  { 
        apagarProduto: meusProdutos[id].id_anuncie
     };

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    const response = await fetch('/anuncie/dadosApagar', options);
    const dadosBack = await response.json();

    buscar();
}

const clickEditarModal = (evt) => {

    evt.preventDefault();

    let id = String(evt.target.id);
    id = id.slice(6)

    let tituloProduto2 = document.getElementById('tituloNovoProduto2');
    tituloProduto2.innerText = meusProdutos[id].titulo;

    local(id);

    let valorProduto = document.getElementById('dinheiro2');
    valorProduto.innerText = meusProdutos[id].valor;

    let descricaoProduto2 = document.getElementById('descricaoNovoProduto2');
    descricaoProduto2.innerText = meusProdutos[id].descricao;

    produtoEditadaId = meusProdutos[id].id_anuncie;
}

const salvarEdicao = async (evt) => {

    let imgNova = document.getElementById('formControlFileImg2');
    let tituloVaga = document.getElementById('tituloNovoProduto2');
    let estado = document.getElementById('inputEstado2');
    let cidadeSelect = document.getElementById('inputCidade2');
    let valorProduto = document.getElementById('dinheiro2');
    let descricaoVaga = document.getElementById('descricaoNovoProduto2');

    const data =  { 
        imgNova: imgNova.value,
        id: produtoEditadaId,
        tituloNovo: tituloVaga.value,
        estadoNovo: estado.value,
        cidadeNova: cidadeSelect.value,
        valor: valorProduto.value,
        descricaoNova: descricaoVaga.value
     };

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    const response = await fetch('/anuncie/dadosEditar', options);
    const dadosBack = await response.json();

    buscar();
}

const initFeed = () => {
    feedLimite = limite;
    flag = 1;
    buscar();
}

const initMeusProdutos = () => {
    meusLimite = limite;
    flag = 0;
    buscar();
}

const buscarInit = () => {
    feedLimite = limite;
    meusLimite = limite;
    buscar();
}

const btnFeed = () => {
    feedLimite = feedLimite + limite;
    buscar();
}

const btnMeusProdutos = () => {
    meusLimite = meusLimite + limite;
    buscar();
}

const buscar = async () => {

    feedProduto = [];
    meusProdutos = [];

    let buscarProduto = document.getElementById('buscarProduto').value;

    const data =  { 
        buscarProduto,
        feedLimite,
        meusLimite
     };

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    const response = await fetch('/anuncie/dadosBuscar', options);
    const dadosBack = await response.json();
    
    for (let i = 0 ; i < dadosBack.buscaFeed.length ; i++) {

        feedProduto.push({
            id_anuncie: dadosBack.buscaFeed[i].id_anuncie,
            titulo: dadosBack.buscaFeed[i].titulo,
            descricao: dadosBack.buscaFeed[i].descricao,
            cidade_produto: dadosBack.buscaFeed[i].cidade_produto,
            estado_produto: dadosBack.buscaFeed[i].estado_produto,
            valor: dadosBack.buscaFeed[i].valor,
            img_anuncio: dadosBack.buscaFeed[i].img_anuncio,
            id_usuario: dadosBack.buscaFeed[i].id_usuario,
            nome: dadosBack.buscaFeed[i].usuario.nome,
            link_perfil: dadosBack.buscaFeed[i].usuario.link_perfil
        });
    }

    for (let i = 0 ; i < dadosBack.buscaMeusProdutos.length ; i++) {

        meusProdutos.push({
            id_anuncie: dadosBack.buscaMeusProdutos[i].id_anuncie,
            titulo: dadosBack.buscaMeusProdutos[i].titulo,
            descricao: dadosBack.buscaMeusProdutos[i].descricao,
            cidade_produto: dadosBack.buscaMeusProdutos[i].cidade_produto,
            estado_produto: dadosBack.buscaMeusProdutos[i].estado_produto,
            valor: dadosBack.buscaMeusProdutos[i].valor,
            img_anuncio: dadosBack.buscaMeusProdutos[i].img_anuncio,
            id_usuario: dadosBack.buscaMeusProdutos[i].id_usuario,
            nome: dadosBack.buscaMeusProdutos[i].usuario.nome,
            link_perfil: dadosBack.buscaMeusProdutos[i].usuario.link_perfil
        });
    }

    view();
}

const view = () => {

    let clickFeed = document.getElementById('customRadio7');
    clickFeed.addEventListener('click', initFeed);

    let clickMeusProdutos = document.getElementById('customRadio8');
    clickMeusProdutos.addEventListener('click', initMeusProdutos);

    let clickBuscar = document.getElementById('btnPesquisar');
    clickBuscar.addEventListener('click', buscarInit);

    let salvar = document.getElementById('salvarEdicao');
    salvar.addEventListener('click', salvarEdicao);

    let produtoJS = document.getElementById('produtoJS');
    produtoJS.innerHTML = '';

    if(flag) {

        for( let i = 0; i < feedProduto.length; i++ ) {

            let conteudoProduto = document.createElement('div');
            conteudoProduto.className = 'conteudo-produto';
            conteudoProduto.id = 'conteudoProduto';
            produtoJS.appendChild(conteudoProduto);  

                let conteudoProdutoDiv = document.createElement('div');
                conteudoProdutoDiv.className = 'conteudo-produto-div';
                conteudoProdutoDiv.id = 'conteudoProdutoDiv';
                conteudoProduto.appendChild(conteudoProdutoDiv); 

                    let produtoImgDiv = document.createElement('div');
                    produtoImgDiv.className = 'conteudo-produto-info-img';
                    conteudoProdutoDiv.appendChild(produtoImgDiv);
                    
                        let produtoImg = document.createElement('img');
                        produtoImg.className = 'avatar';
                        produtoImg.src = feedProduto[i].img_anuncio;
                        produtoImg.setAttribute("alt", "Foto do Produto");
                        produtoImgDiv.appendChild(produtoImg); 

                    let conteudoProdutoInfo = document.createElement('div');
                    conteudoProdutoInfo.className = 'conteudo-produto-info';
                    conteudoProdutoDiv.appendChild(conteudoProdutoInfo);

                        let tituloFeed = document.createElement('h5');
                        tituloFeed.innerText = feedProduto[i].titulo
                        conteudoProdutoInfo.appendChild(tituloFeed);

                        let info2 = document.createElement('div');
                        info2.className = 'conteudo-produto-info2';
                        conteudoProdutoInfo.appendChild(info2);

                            let valorProduto = document.createElement('p');
                            valorProduto.className = 'produtoP';
                            valorProduto.innerText = `R$${feedProduto[i].valor}`;
                            info2.appendChild(valorProduto);

                            let localProduto = document.createElement('p');
                            localProduto.className = 'produtoP';
                            localProduto.innerText = feedProduto[i].cidade_produto + ' / ' + feedProduto[i].estado_produto;
                            info2.appendChild(localProduto);

                        let descricaoProduto = document.createElement('p');
                        descricaoProduto.innerText = feedProduto[i].descricao
                        conteudoProdutoInfo.appendChild(descricaoProduto);

                        let linkUsuario = document.createElement('a');
                        linkUsuario.innerText = feedProduto[i].nome;
                        linkUsuario.href = feedProduto[i].link_perfil;
                        conteudoProdutoInfo.appendChild(linkUsuario);            
        }

    } else {
        for( let i = 0; i < meusProdutos.length; i++ ) {

            let conteudoProduto = document.createElement('div');
            conteudoProduto.className = 'conteudo-produto';
            conteudoProduto.id = 'conteudoProduto';
            produtoJS.appendChild(conteudoProduto);  

                let conteudoProdutoDiv = document.createElement('div');
                conteudoProdutoDiv.className = 'conteudo-produto-div';
                conteudoProdutoDiv.id = 'conteudoProdutoDiv';
                conteudoProduto.appendChild(conteudoProdutoDiv); 

                    let produtoImgDiv = document.createElement('div');
                    produtoImgDiv.className = 'conteudo-produto-info-img';
                    conteudoProdutoDiv.appendChild(produtoImgDiv);
                    
                        let produtoImg = document.createElement('img');
                        produtoImg.className = 'avatar';
                        produtoImg.src = meusProdutos[i].img_anuncio;
                        produtoImg.setAttribute("alt", "Foto do Produto");
                        produtoImgDiv.appendChild(produtoImg); 

                    let conteudoProdutoInfo = document.createElement('div');
                    conteudoProdutoInfo.className = 'conteudo-produto-info';
                    conteudoProdutoDiv.appendChild(conteudoProdutoInfo);

                        let tituloFeed = document.createElement('h5');
                        tituloFeed.innerText = meusProdutos[i].titulo
                        conteudoProdutoInfo.appendChild(tituloFeed);

                        let info2 = document.createElement('div');
                        info2.className = 'conteudo-produto-info2';
                        conteudoProdutoInfo.appendChild(info2);

                            let valorProduto = document.createElement('p');
                            valorProduto.className = 'produtoP';
                            valorProduto.innerText = `R$${meusProdutos[i].valor}`
                            info2.appendChild(valorProduto);

                            let localProduto = document.createElement('p');
                            localProduto.className = 'produtoP';
                            localProduto.innerText = meusProdutos[i].cidade_produto + ' / ' + meusProdutos[i].estado_produto;
                            info2.appendChild(localProduto);

                        let descricaoProduto = document.createElement('p');
                        descricaoProduto.innerText = meusProdutos[i].descricao
                        conteudoProdutoInfo.appendChild(descricaoProduto);

                        let linksDiv = document.createElement('div');
                        linksDiv.id = 'linksDiv';
                        conteudoProdutoInfo.appendChild(linksDiv);
    
                            let editarProduto = document.createElement('a');
                            editarProduto.innerText = 'Editar';
                            editarProduto.id = 'editar' + i;
                            editarProduto.href = '';
                            editarProduto.setAttribute("data-toggle", "modal");
                            editarProduto.setAttribute("data-target", "#editarProduto");
                            editarProduto.addEventListener('click', clickEditarModal);
                            linksDiv.appendChild(editarProduto);
    
                            let excluirProduto = document.createElement('a');
                            excluirProduto.innerText = 'Excluir';
                            excluirProduto.id = 'excluir' + i;
                            excluirProduto.href = '';
                            excluirProduto.addEventListener('click', clickDelete);
                            linksDiv.appendChild(excluirProduto);
        }
    }

    if(flag == 1 && feedProduto.length >= 4){ 
        let botaoProduto = document.createElement('div');
        botaoProduto.className = 'botao';
        produtoJS.appendChild(botaoProduto);

            let botaoMaisProdutos = document.createElement('button');
            botaoMaisProdutos.className = 'btn btn-mais';
            botaoMaisProdutos.innerText = '+ Vagas';
            botaoMaisProdutos.type = 'button';
            botaoMaisProdutos.addEventListener('click', btnFeed);
            botaoProduto.appendChild(botaoMaisProdutos);
    }

    if(flag == 0 && meusProdutos.length >= 4){ 
        let botaoProduto = document.createElement('div');
        botaoProduto.className = 'botao';
        produtoJS.appendChild(botaoProduto);

                let botaoMaisProdutos = document.createElement('button');
                botaoMaisProdutos.className = 'btn btn-mais';
                botaoMaisProdutos.innerText = '+ Vagas';
                botaoMaisProdutos.type = 'button';
                botaoMaisProdutos.addEventListener('click', btnMeusProdutos);
                botaoProduto.appendChild(botaoMaisProdutos);
    }

    if((flag == 1 && feedProduto.length == 0) || (flag == 0 && meusProdutos.length == 0)){ 
        let mensagemdiv = document.createElement('div');
        mensagemdiv.className = 'msg-incentivoDiv';
        produtoJS.appendChild(mensagemdiv);

            let mensagem = document.createElement('p');
            mensagem.className = 'msg-incentivo';
            mensagem.innerText = 'Não foi possível encontrar nenhum produto com o valor pesquisado';
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
        if(estadoJs2[i].uf == meusProdutos[id].estado_produto){
            indexEstado = estadoJs2[i].id_estado;
        }
    }
    estado2.value = indexEstado;

    let indexCidade = 0;
    for(let i = 0; i < cidadeJs2.length; i++){
        if(cidadeJs2[i].cidade == meusProdutos[id].cidade_produto){
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