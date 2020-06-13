let seguindo = JSON.parse(seguindoJs);
let seguidores = JSON.parse(seguidoresJs);
let geral = JSON.parse(geralJs);

// console.log(seguidores)
// console.log(seguindo)
// console.log(geral)
// console.log(seguidores[0].nome)
// console.log(`"${seguidores[0].avatar}"`)

window.onload = function(){
    let divRedeGroup = document.getElementById('redeGroup')
    divRedeGroup.innerText = "";

    let hResp = document.createElement('h5')
            hResp.id = 'idResp'

            divRedeGroup.appendChild(hResp)

            hResp.innerHTML = "Selecione uma opção!";

}


function clicado() {


    if (document.getElementById('customRadio1').checked) {

        let divRedeGroup = document.getElementById('redeGroup')
        divRedeGroup.innerText = "";

        if (seguindo.length) {
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
        } else {
            let hResp = document.createElement('h5')
            hResp.id = 'idResp'

            divRedeGroup.appendChild(hResp)

            hResp.innerHTML = "Você ainda não segue ninguém!<br> Veja nossas recomendações ou procure um contato específico e inicie sua rede!";

        }
    } else if (document.getElementById('customRadio2').checked) {

        let divRedeGroup = document.getElementById('redeGroup')
        divRedeGroup.innerText = "";

        if (seguidores.length) {
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
            let hResp = document.createElement('h5')
            hResp.id = 'idResp'

            divRedeGroup.appendChild(hResp)

            hResp.innerHTML = "Você ainda não tem nenhum seguidor!<br> Aproveite para revisar o seu perfil e deixá-lo mais atrativo para os outros usuários! ";
        }
    } else {

        let divRedeGroup = document.getElementById('redeGroup')
        divRedeGroup.innerText = "";

        if (geral.length) {
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

}

let radios = document.getElementsByClassName('custom-control-input');

for (let index = 0; index < radios.length; index++) {
    radios[index].addEventListener('click', clicado, false)
}