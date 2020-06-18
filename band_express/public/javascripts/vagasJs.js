
let vagas = [];
let valor = 0;

const load = async () => {

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

    const response = await fetch('/vagas/dados', options);
    const dadosBack = await response.json();
    console.log(dadosBack)

    for (let i = 0 ; i < dadosBack.limite ; i++) {
        vagas.push({
            cidade_vaga: dadosBack.pagina[i].cidade_vaga,
            descricao: dadosBack.pagina[i].descricao,
            estado_vaga: dadosBack.pagina[i].estado_vaga,
            id_usuario: dadosBack.pagina[i].id_usuario,
            id_vagas: dadosBack.pagina[i].id_vagas,
            tipo_vaga: dadosBack.pagina[i].tipo_vaga,
            titulo: dadosBack.pagina[i].titulo,
            nome: dadosBack.pagina[i].usuario.nome
        });
    }
    console.log(valor)
    valor = dadosBack.limite;
    console.log(valor)
    view();
}

const view = () => {

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

            let linkVaga = document.createElement('a');
            linkVaga.innerText = vagas[i].nome;
            linkVaga.href = '';
            conteudoVaga.appendChild(linkVaga);

    }

        let botaoVaga = document.createElement('div');
        botaoVaga.className = 'botao';
        vagasJS.appendChild(botaoVaga);

            let botaoMaisVaga = document.createElement('button');
            botaoMaisVaga.className = 'btn btn-mais';
            botaoMaisVaga.innerText = '+ Vagas';
            botaoMaisVaga.type = 'button';
            botaoMaisVaga.addEventListener('click', load);
            botaoVaga.appendChild(botaoMaisVaga);
    
}

window.onload = load();