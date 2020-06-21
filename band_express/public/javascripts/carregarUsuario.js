let tableUsuario = document.getElementById('tableUsuario');
let buttonCarregar = document.getElementById('carregarUsuario');

// Buscar no BD
async function maisUsuario() {
    try {
        let page = buttonCarregar.value;
        let buscarUsuarios = await fetch(`/admin/carregarUsuario/${page}`);
        let listaUsuarios = buscarUsuarios.json();

        return listaUsuarios;

    } catch (error) {
        console.log(error);
    }
}

// Criar elementos
const elementosHtmlUsuario = (list) => {
    for (const item of list) {
        let trUsuario = document.createElement('tr');
        trUsuario.id = item.id_usuario;

            let thId = document.createElement('th');
            thId.scope = 'row';
            thId.innerText = item.id_usuario;
            trUsuario.appendChild(thId);

            let tdNome = document.createElement('td');
            tdNome.innerText = item.nome;
            trUsuario.appendChild(tdNome);
            
            let tdEmail = document.createElement('td');
            tdEmail.innerText = item.email;
            trUsuario.appendChild(tdEmail);

            let tdSenha = document.createElement('td');
                let aSenha = document.createElement('a');
                aSenha.setAttribute('data-toggle', 'modal');
                aSenha.setAttribute('data-target', '#alterarSenha');
                aSenha.href = '#';
                aSenha.innerText = 'Alterar';
                tdSenha.appendChild(aSenha);
            trUsuario.appendChild(tdSenha);

            let tdExcluir = document.createElement('td');
                let iconeTrash = document.createElement('i');
                iconeTrash.className = 'fas fa-trash fa-lg';
                iconeTrash.id = `excluir${item.id_usuario}`;
                tdExcluir.appendChild(iconeTrash);
            trUsuario.appendChild(tdExcluir);
        
        tableUsuario.appendChild(trUsuario);
    }
}


// Realizar busca e incrementar
let carregarUsuario = async () => {
    try {
        let usuariosBuscados = await maisUsuario();

        await elementosHtmlUsuario(usuariosBuscados);

        if (usuariosBuscados.length < 5) {
            
            buttonCarregar.classList.add('invisible');

            return
        }

        let cont = Number(buttonCarregar.value);
        cont += 1;
        buttonCarregar.value = cont;  

    } catch (error) {
        console.log(error)
    }
    
}

buttonCarregar.addEventListener('click', carregarUsuario);
