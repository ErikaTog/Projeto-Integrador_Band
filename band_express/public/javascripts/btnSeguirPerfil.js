let grupoSeguir = document.getElementById('grupoBtnSeguir');
let buttonSeguir = document.getElementById('btnSeguir');



// Criando o button deixar de seguir
const elementoButtonNaoSegue = () => {
    buttonSeguir.value = 0;
    buttonSeguir.classList.remove("btn-seguindo");

    // grupoSeguir.innerHTML = '';

    // let button = document.createElement('button');
    // button.type = 'button';
    // button.id = 'btnSeguir';
    // button.className = 'btn-config';
    // button.value = 0;

    //     let iconeFone = document.createElement('i');
    //     iconeFone.className = 'fas fa-headphones-alt';
    //     button.appendChild(iconeFone);

    // grupoSeguir.appendChild(button);
}

// Criando o button seguir
const elementoButtonSegue = () => {
    buttonSeguir.value = 1;
    buttonSeguir.classList.add("btn-seguindo");

    // grupoSeguir.innerHTML = '';
    
    // let button = document.createElement('button');
    // button.type = 'button';
    // button.id = 'btnSeguir';
    // button.className = 'btn-config btn-seguindo';
    // button.value = 1;

    //     let iconeFone = document.createElement('i');
    //     iconeFone.className = 'fas fa-headphones-alt';
    //     button.appendChild(iconeFone);

    // grupoSeguir.appendChild(button);
}

// BD >> deixar de seguir
async function deixarDeSeguir() {
    try {
        await fetch(`/perfil/musico/deixarDeSeguir/${id_usuario}`);
        
        return;
    } catch (error) {
        console.log(error);
    }
}

// BD >> seguir
async function seguir() {
    try {
        await fetch(`/perfil/musico/seguir/${id_usuario}`);
        
        return;
    } catch (error) {
        console.log(error);
    }
}

// Verificar o valor do value >> criar button >> salvar no BD
async function funcionamentoButtonSeguir() {
    try {
        console.log(buttonSeguir.value)
        
        if (buttonSeguir.value == 1) {
            elementoButtonNaoSegue();
            alert(`Você deixou de seguir ${nome_usuario}`);
        
            await deixarDeSeguir();

        } else {
            elementoButtonSegue();
            alert(`Você está seguindo ${nome_usuario}`);
            
            await seguir();
        }

    } catch (error) {
        console.log(error)
    }
}

grupoSeguir.addEventListener('click', funcionamentoButtonSeguir);