let seguindo = JSON.parse(seguindoJs);
let seguidores = JSON.parse(seguidoresJs);
let geral = JSON.parse(geralJs);


let divRedeGroup = document.getElementById('redeGroup');
let inputBusca = document.getElementById('buscarContato');
let classeBtn = document.querySelector('.btn');
let btnSeguir = document.getElementsByClassName('btn-Seguir');
let btnBuscar = document.getElementById('btnBuscar');
let changeClasse = document.querySelector('.btn-disabled');



//----------Ao carregar a página----------

window.onload = function () {
    //Limpando o filtro dos contatos
    divRedeGroup.innerText = "";

    //Incluindo mensagem de apoio
    let hResp = document.createElement('h5')
    hResp.id = 'idResp'
    hResp.innerHTML = "Selecione uma opção!";
    divRedeGroup.appendChild(hResp)

    //Desabilitando o botão Buscar
    btnBuscar.disabled = true;
}


//----------Trabalhando com o filtro de Seguindo, Seguidores e Outros----------

function clicado() {


    if (document.getElementById('customRadio1').checked) {

        //Limpando o filtro para não haver duplicidade na busca
        divRedeGroup.innerText = "";

        //Mostrando mensagem de incentivo 
        if (!(seguindo.length)) {
            let hResp = document.createElement('h5')
            hResp.id = 'idResp'
            hResp.innerHTML = "Você ainda não segue ninguém!<br> Veja nossas recomendações ou procure um contato específico e inicie sua rede!";
            divRedeGroup.appendChild(hResp)
        }

        //Mostrando o resultado do filtro ao usuário
        for (let index = 0; index < seguindo.length; index++) {

            divCard = document.createElement('div')
            divCard.className = 'card-contato'
            divCard.id = 'rede'

            divRedeGroup.appendChild(divCard)


            let imagem = document.createElement('img')
            imagem.className = 'contato-img'
            imagem.id = 'avatar'
            imagem.src = `${seguindo[index].avatar}`
            imagem.alt = 'Foto Contato'

            divCard.appendChild(imagem)


            let divNome = document.createElement('div')
            divNome.className = 'nome-contato'

            divCard.appendChild(divNome)

            let nomeLink = document.createElement('a')
            nomeLink.href = `${seguindo[index].link_perfil}`
            nomeLink.id = 'nomeContato'
            nomeLink.innerHTML = `${seguindo[index].nome}`

            divNome.appendChild(nomeLink)

            let seguir = document.createElement('button')
            seguir.type = 'button' // desenvolver esta parte
            seguir.className = 'btn btn-Seguir'
            seguir.innerHTML = 'Seguir'

            divCard.appendChild(seguir)
        }


    } else if (document.getElementById('customRadio2').checked) {

        //Limpando o filtro para não haver duplicidade na busca
        divRedeGroup.innerText = "";

        //Mostrando mensagem de incentivo 
        if (!(seguindo.length)) {
            let hResp = document.createElement('h5')
            hResp.id = 'idResp'
            hResp.innerHTML = "Você ainda não tem nenhum seguidor!<br> Aproveite para revisar o seu perfil e deixá-lo mais atrativo para os outros usuários! ";
            divRedeGroup.appendChild(hResp)
        }

        //Mostrando o resultado do filtro ao usuário
        for (let index = 0; index < seguidores.length; index++) {

            divCard = document.createElement('div')
            divCard.className = 'card-contato'
            divCard.id = 'rede'

            divRedeGroup.appendChild(divCard)

            let imagem = document.createElement('img')
            imagem.className = 'contato-img'
            imagem.id = 'avatar'
            imagem.src = `${seguidores[index].avatar}`
            imagem.alt = 'Foto Contato'

            divCard.appendChild(imagem)


            let divNome = document.createElement('div')
            divNome.className = 'nome-contato'

            divCard.appendChild(divNome)

            let nomeLink = document.createElement('a')
            nomeLink.href = `${seguidores[index].link_perfil}`
            nomeLink.id = 'nomeContato'
            nomeLink.innerHTML = `${seguidores[index].nome}`

            divNome.appendChild(nomeLink)

            let seguir = document.createElement('button')
            seguir.type = 'button' // desenvolver esta parte
            seguir.className = 'btn btn-Seguir'
            seguir.innerHTML = 'Seguir'

            divCard.appendChild(seguir)
        }

    } else {

        //Limpando o filtro para não haver duplicidade na busca
        divRedeGroup.innerText = "";

        //Mostrando mensagem de incentivo 
        if (!(geral.length)) {
            let hResp = document.createElement('h5')
            hResp.id = 'idResp'
            hResp.innerHTML = "Ainda não temos sugestões nesta categoria.";
            divRedeGroup.appendChild(hResp)
        }

        //Mostrando o resultado do filtro ao usuário
        for (let index = 0; index < geral.length; index++) {

            divCard = document.createElement('div')
            divCard.className = 'card-contato'
            divCard.id = 'rede'

            divRedeGroup.appendChild(divCard)

            let imagem = document.createElement('img')
            imagem.className = 'contato-img'
            imagem.id = 'avatar'
            imagem.src = `${geral[index].avatar}`
            imagem.alt = 'Foto Contato'

            divCard.appendChild(imagem)


            let divNome = document.createElement('div')
            divNome.className = 'nome-contato'

            divCard.appendChild(divNome)

            let nomeLink = document.createElement('a')
            nomeLink.href = `${geral[index].link_perfil}`
            nomeLink.id = 'nomeContato'
            nomeLink.innerHTML = `${geral[index].nome}`

            divNome.appendChild(nomeLink)

            let seguir = document.createElement('button')
            seguir.type = 'button' // desenvolver esta parte
            seguir.className = 'btn btn-Seguir'
            seguir.innerHTML = 'Seguir'

            divCard.appendChild(seguir)
        }
        
    }

}

let radios = document.getElementsByClassName('custom-control-input');

for (let index = 0; index < radios.length; index++) {
    radios[index].addEventListener('click', clicado, false)
}


//----------Tratando o input e o botão de buscar---------- 

inputBusca.addEventListener('focus', function () {
    //Incluindo uma cor de destaque na borda
    this.style.borderColor = '#fb754b';

    //Limpando o filtro dos contatos
    divRedeGroup.innerText = "";

    //Incluindo nova mensagem de suporte
    let hResp = document.createElement('h5');
    hResp.id = 'idResp';
    hResp.innerHTML = "Clique em buscar e depois selecione uma opção!";
    divRedeGroup.appendChild(hResp);

    //Desabilitando os radios
    for (let index = 0; index < radios.length; index++) {
        radios[index].checked = false
    }

    //Habilitando o botão buscar
    btnBuscar.disabled = false;
    changeClasse.classList.add('btn', 'btn-Buscar');   
    changeClasse.classList.remove('btn-disabled');
   
})

inputBusca.addEventListener('blur', function () {
    //voltando à cor original
    this.style.borderColor = '#999999' // verificar essa cor

    //excluindo valor
    inputBusca.value = "";

    //Limpando o filtro dos contatos
    divRedeGroup.innerText = "";

    //Incluindo nova mensagem de suporte
    let hResp = document.createElement('h5');
    hResp.id = 'idResp';
    hResp.innerHTML = "Selecione uma opção!";
    divRedeGroup.appendChild(hResp);

    //Desabilitando o botão Buscar
    btnBuscar.disabled = true;
    let classeBtnBuscar = document.querySelector('btn-Buscar');
    changeClasse.classList.add('btn-disabled');
    changeClasse.classList.remove('btn', 'btn-Buscar'); 
  
})

