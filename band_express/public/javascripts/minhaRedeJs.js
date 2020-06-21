let seguindo = JSON.parse(seguindoJs);
let seguidores = JSON.parse(seguidoresJs);
let geral = JSON.parse(geralJs);


let divRedeGroup = document.getElementById('redeGroup');
let radios = document.getElementsByClassName('custom-control-input');
let formBuscar = document.getElementById('formBuscar');
let btnMais = document.getElementById('carregarMais');
let cont = 0;

//Função para gerar cards com os valores das buscas
function gerarCard (valor1, valor2, valor3){

    divCard = document.createElement('div')
    divCard.className = 'card-contato'
    divCard.id = 'rede'

    divRedeGroup.appendChild(divCard)


    let imagem = document.createElement('img')
    imagem.className = 'contato-img'
    imagem.src = valor1
    imagem.alt = 'Foto Contato'

    divCard.appendChild(imagem)


    let divNome = document.createElement('div')
    divNome.className = 'nome-contato'

    divCard.appendChild(divNome)

    let nomeLink = document.createElement('a')
    nomeLink.href = valor2
    nomeLink.innerHTML = valor3

    divNome.appendChild(nomeLink)

    // let seguir = document.createElement('button')
    // seguir.type = 'button' 
    // seguir.className = 'btn btn-Seguir btn2'
    // seguir.innerHTML = 'Seguir'

    // divCard.appendChild(seguir)
}

//Função para enviar mensagem nos cards
function msg(mensagem){
    let hResp = document.createElement('h5')
    hResp.id = 'idResp'
    hResp.innerHTML = mensagem
    divRedeGroup.appendChild(hResp)
}

//Função do botão carregar mais
function carregarMais(radio){
    let valorBtn = parseInt(btnMais.value);
    let qtdCards = valorBtn;
   
    if(valorBtn < radio.length){
        if(((valorBtn + 5) <= radio.length)){
            qtdCards += 5; 
        }else{
            qtdCards += (radio.length - valorBtn);
        }
        
        for (let index = valorBtn; index < qtdCards; index++) {
            gerarCard(`${radio[index].avatar}`, `${radio[index].link_perfil}`, `${radio[index].nome}`) 
        } 

        btnMais.value = valorBtn + 5
    }
    
    if(radio.length <= btnMais.value){
        btnMais.style= 'visibility: hidden;'
    }  
}

//Função para verificar a qtd de cards a serem criados na primeira visualização
function contadorCards(radio){
    if(radio.length > 5){
        cont = 5
    }else{
        cont = radio.length
    }
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

        //Inicializando o valor do bntMais
        btnMais.value = 5;

        //Verificando se o botão de +contatos deve ser exibido
        if(seguindo.length > 5){
            btnMais.style= 'visibility: visible;'
        }else{
            btnMais.style= 'visibility: hidden;'
        }

        // Ação do botão ao ser clicado
         btnMais.onclick = function (){            
            carregarMais(seguindo);            
        }     
       
        //Gerando os primeiros cards (até 5)      
        contadorCards(seguindo)
         
        for (let index = 0; index < cont; index++) {
            gerarCard(`${seguindo[index].avatar}`,`${seguindo[index].link_perfil}`, `${seguindo[index].nome}`)
        }

    } else if (document.getElementById('customRadio2').checked) {

        //Limpando o filtro para não haver duplicidade na busca
        divRedeGroup.innerText = "";
        
        //Mostrando mensagem de incentivo 
        if (!(seguidores.length)) {
            msg("Você ainda não tem nenhum seguidor!<br> Aproveite para revisar o seu perfil e deixá-lo mais atrativo para os outros usuários!")          
        }

        //Inicializando o valor do bntMais
        btnMais.value = 5;

        //Verificando se o botão de +contatos deve ser exibido
         if(seguidores.length > 5){
            btnMais.style= 'visibility: visible;'
        }else{
            btnMais.style= 'visibility: hidden;'
        }
        
        // Ação do botão ao ser clicado
           btnMais.onclick = function (){            
            carregarMais(seguidores);            
        }     
       
        //Gerando os primeiros cards (até 5)      
        contadorCards(seguidores)
      
        for (let index = 0; index < cont; index++) {
            gerarCard(`${seguidores[index].avatar}`, `${seguidores[index].link_perfil}`, `${seguidores[index].nome}`)           
        }

    } else {

        //Limpando o filtro para não haver duplicidade na busca
        divRedeGroup.innerText = "";
    
        //Mostrando mensagem de incentivo 
        if(!(geral.length)) {
            msg("Ainda não temos sugestões nesta categoria.")            
        }

        //Inicializando o valor do bntMais
        btnMais.value = 5;
         
        //Verificando se o botão de +contatos deve ser exibido
        if(geral.length > 5){
            btnMais.style= 'visibility: visible;'
        }else{
            btnMais.style= 'visibility: hidden;'
        }
        
        // Ação do botão ao ser clicado
        btnMais.onclick = function (){            
            carregarMais(geral);            
        }     
       
        //Gerando os primeiros cards (até 5)      
        contadorCards(geral)

        for (let index = 0; index < cont; index++) {
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
    
    //Evitar o comportamento padrão do form
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

    //Se tiver valor: fazendo a busca no BD e mostrando o resultado ao usuário
    const data = {texto}
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    };
    const response = await fetch('/minhaRede/buscar', options);
    const json = await response.json();
    
    let seguindoEncontrados = json.seguindoEncontrados;
    let seguidoresEncontrados = json.seguidoresEncontrados;
    let outrosEncontrados = json.outrosEncontrados;

    
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
    
            //Inicializando o valor do bntMais
            btnMais.value = 5;

            //Verificando se o botão de +contatos deve ser exibido
            if(seguindoEncontrados.length > 5){
                btnMais.style= 'visibility: visible;'
            }else{
                btnMais.style= 'visibility: hidden;'
            }

            // Ação do botão ao ser clicado
            btnMais.onclick = function (){            
                carregarMais(seguindoEncontrados);            
            } 
            
            //Gerando os primeiros cards (até 5)      
            contadorCards(seguindoEncontrados)

            for (let index = 0; index < cont; index++) {
                gerarCard(`${seguindoEncontrados[index].avatar}`,`${seguindoEncontrados[index].link_perfil}`, `${seguindoEncontrados[index].nome}`)
            }

    
        } else if (document.getElementById('customRadio2').checked) {
    
            //Limpando o filtro para não haver duplicidade na busca
            divRedeGroup.innerText = "";
    
            //Mostrando mensagem de retorno 
            if (!(seguidoresEncontrados.length)) {
                msg("Não foi possível encontrar nenhum contato com o valor pesquisado.")
            }    
            
            //Inicializando o valor do bntMais
            btnMais.value = 5;
            
            //Verificando se o botão de +contatos deve ser exibido
            if(seguidoresEncontrados.length > 5){
                btnMais.style= 'visibility: visible;'
            }else{
                btnMais.style= 'visibility: hidden;'
            }
            
            // Ação do botão ao ser clicado
            btnMais.onclick = function (){            
                carregarMais(seguidoresEncontrados);            
            }     
           
            //Gerando os primeiros cards (até 5)      
            contadorCards(seguidoresEncontrados) 

            for (let index = 0; index < cont; index++) {    
                gerarCard(`${seguidoresEncontrados[index].avatar}`, `${seguidoresEncontrados[index].link_perfil}`, `${seguidoresEncontrados[index].nome}`)           
            }
            
        } else {
    
            //Limpando o filtro para não haver duplicidade na busca
            divRedeGroup.innerText = "";
    
            //Mostrando mensagem de retorno
            if (!(outrosEncontrados.length)) {
                msg("Não foi possível encontrar nenhum contato com o valor pesquisado.")
            }    
            
            //Inicializando o valor do bntMais
            btnMais.value = 5;
            
            //Verificando se o botão de +contatos deve ser exibido
            if(outrosEncontrados.length > 5){
                btnMais.style= 'visibility: visible;'
            }else{
                btnMais.style= 'visibility: hidden;'
            }
            
            // Ação do botão ao ser clicado
            btnMais.onclick = function (){            
                carregarMais(outrosEncontrados);            
            }     
         
            //Gerando os primeiros cards (até 5)      
            contadorCards(outrosEncontrados) 

            for (let index = 0; index < cont; index++) {    
                gerarCard(`${outrosEncontrados[index].avatar}`, `${outrosEncontrados[index].link_perfil}`, `${outrosEncontrados[index].nome}`)            
            }  
        }
    }
    
    //Verificando se algum botão radio foi clicado e chamando a função clicadoBuscar
    for (let index = 0; index < radios.length; index++) {
        radios[index].addEventListener('click', clicadoBuscar, false)
    }   
});