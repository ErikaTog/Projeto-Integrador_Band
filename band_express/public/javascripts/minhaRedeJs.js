let seguindo = JSON.parse(seguindoJs);
let seguidores = JSON.parse(seguidoresJs);
let geral = JSON.parse(geralJs);


let divRedeGroup = document.getElementById('redeGroup');
let radios = document.getElementsByClassName('custom-control-input');
let inputBusca = document.getElementById('buscarContato');
let classeBtn = document.querySelector('.btn');
let btnSeguir = document.getElementsByClassName('btn-Seguir');
let btnBuscar = document.getElementById('btnBuscar');
let formBuscar = document.getElementById('formBuscar');


//Função para gerar cards com os valores das buscas
function gerarCard (valor1, valor2, valor3){

    divCard = document.createElement('div')
    divCard.className = 'card-contato'
    divCard.id = 'rede'

    divRedeGroup.appendChild(divCard)


    let imagem = document.createElement('img')
    imagem.className = 'contato-img'
    imagem.id = 'avatar'
    imagem.src = valor1
    imagem.alt = 'Foto Contato'

    divCard.appendChild(imagem)


    let divNome = document.createElement('div')
    divNome.className = 'nome-contato'

    divCard.appendChild(divNome)

    let nomeLink = document.createElement('a')
    nomeLink.href = valor2
    nomeLink.id = 'nomeContato'
    nomeLink.innerHTML = valor3

    divNome.appendChild(nomeLink)

    let seguir = document.createElement('button')
    seguir.type = 'button' 
    seguir.className = 'btn btn-Seguir'
    seguir.innerHTML = 'Seguir'

    divCard.appendChild(seguir)
}

//Função para enviar mensagem nos cards
function msg(mensagem){
    let hResp = document.createElement('h5')
    hResp.id = 'idResp'
    hResp.innerHTML = mensagem
    divRedeGroup.appendChild(hResp)
}


//----------Ao carregar a página----------

window.onload = function () {
    //Limpando o filtro dos contatos
    divRedeGroup.innerText = "";

    //Incluindo mensagem de apoio
    msg("Selecione uma opção ou faça uma busca personalizada!")  
}

//----------Trabalhando com o filtro de Seguindo, Seguidores e Outros----------

function clicado() {

    if (document.getElementById('customRadio1').checked) {

        //Limpando o filtro para não haver duplicidade na busca
        divRedeGroup.innerText = "";

        //Mostrando mensagem de incentivo 
        if (!(seguindo.length)) {
            msg("Você ainda não segue ninguém!<br> Veja nossas recomendações ou procure um contato específico e inicie sua rede!")        
        }

        //Mostrando o resultado do filtro ao usuário
        for (let index = 0; index < seguindo.length; index++) {
            gerarCard(`${seguindo[index].avatar}`,`${seguindo[index].link_perfil}`, `${seguindo[index].nome}`)
        }

    } else if (document.getElementById('customRadio2').checked) {

        //Limpando o filtro para não haver duplicidade na busca
        divRedeGroup.innerText = "";

        //Mostrando mensagem de incentivo 
        if (!(seguidores.length)) {
            msg("Você ainda não tem nenhum seguidor!<br> Aproveite para revisar o seu perfil e deixá-lo mais atrativo para os outros usuários!")          
        }

        //Mostrando o resultado do filtro ao usuário
        for (let index = 0; index < seguidores.length; index++) {
            gerarCard(`${seguidores[index].avatar}`, `${seguidores[index].link_perfil}`, `${seguidores[index].nome}`)           
        }

    } else {

        //Limpando o filtro para não haver duplicidade na busca
        divRedeGroup.innerText = "";

        //Mostrando mensagem de incentivo 
        if (!(geral.length)) {
            msg("Ainda não temos sugestões nesta categoria.")            
        }

        //Mostrando o resultado do filtro ao usuário
        for (let index = 0; index < geral.length; index++) {
            gerarCard(`${geral[index].avatar}`, `${geral[index].link_perfil}`, `${geral[index].nome}`)            
        }        
    }
}

//Verificando se algum botão radio foi clicado e chamando a função clicado
for (let index = 0; index < radios.length; index++) {
    radios[index].addEventListener('click', clicado, false)
}



//----------Trabalhando com o filtro de Seguindo, Seguidores e Outros de Buscar----------


formBuscar.addEventListener('submit', async(evt) => {
    
    //evitar o comportamento padrão do form
    evt.preventDefault();    

    //Pegando o que foi escrito no input
    let valor = document.getElementById('buscarContato').value;

    //Tirando os espaços
    let texto = valor.trim();

    //Verificando se o valor está vazio 
    if(texto == ""){
        divRedeGroup.innerText = "";
        location.reload();
        return        
    }

    //Se tiver valor: fazendo a busca no BD e mostrando  resultado ao usuário
    const data = {texto}
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    };
    const response = await fetch('/minhaRede/buscar', options);
    const json = await response.json();
    console.log(json);

    let seguindoEncontrados = json.seguindoEncontrados;
    let seguidoresEncontrados = json.seguidoresEncontrados;
    let outrosEncontrados = json.outrosEncontrados;

    // console.log(seguindoEncontrados)
    // console.log(seguidoresEncontrados)
    // console.log(outrosEncontrados)

    
    //Limpando o filtro dos contatos
    divRedeGroup.innerText = "";

    //Desabilitando os radios
    for (let index = 0; index < radios.length; index++) {
        radios[index].checked = false
    }

    //Incluindo nova mensagem de suporte
    msg("Selecione uma opção para mostrar o resultado da busca!")

   
    //Gerando os cards com dados dos usuários encontrados ou msg de não encontrado
    function clicadoBuscar() {

        if (document.getElementById('customRadio1').checked) {

            //Limpando o filtro para não haver duplicidade na busca
            divRedeGroup.innerText = "";
    
            //Mostrando mensagem de retorno
            if (!(seguindoEncontrados.length)) {
                msg("Não foi possível encontrar nenhum contato com o valor pesquisado.")               
            }
    
            //Mostrando o resultado do filtro ao usuário
            for (let index = 0; index < seguindo.length; index++) {
                gerarCard(`${seguindoEncontrados[index].avatar}`,`${seguindoEncontrados[index].link_perfil}`, `${seguindoEncontrados[index].nome}`)
            }
    
        } else if (document.getElementById('customRadio2').checked) {
    
            //Limpando o filtro para não haver duplicidade na busca
            divRedeGroup.innerText = "";
    
            //Mostrando mensagem de retorno 
            if (!(seguidoresEncontrados.length)) {
                msg("Não foi possível encontrar nenhum contato com o valor pesquisado.")
            }
    
            //Mostrando o resultado do filtro ao usuário
            for (let index = 0; index < seguidores.length; index++) {    
                gerarCard(`${seguidoresEncontrados[index].avatar}`, `${seguidoresEncontrados[index].link_perfil}`, `${seguidoresEncontrados[index].nome}`)           
            }
    
        } else {
    
            //Limpando o filtro para não haver duplicidade na busca
            divRedeGroup.innerText = "";
    
            //Mostrando mensagem de retorno
            if (!(outrosEncontrados.length)) {
                msg("Não foi possível encontrar nenhum contato com o valor pesquisado.")
            }
    
            //Mostrando o resultado do filtro ao usuário
            for (let index = 0; index < geral.length; index++) {    
                gerarCard(`${outrosEncontrados[index].avatar}`, `${outrosEncontrados[index].link_perfil}`, `${outrosEncontrados[index].nome}`)            
            }            
        }
    }
    
    //Verificando se algum botão radio foi clicado e chamando a função clicadoBuscar
    for (let index = 0; index < radios.length; index++) {
        radios[index].addEventListener('click', clicadoBuscar, false)
    }   
});




