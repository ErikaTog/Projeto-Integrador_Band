let grupoSeguir = document.getElementById('grupoBtnSeguir');
let buttonSeguir = document.getElementById('btnSeguir');

// Criando o button deixar de seguir
const elementoButtonNaoSegue = () => {
    buttonSeguir.value = 0;
    buttonSeguir.classList.remove("btn-seguindo");

}

// Criando o button seguir
const elementoButtonSegue = () => {
    buttonSeguir.value = 1;
    buttonSeguir.classList.add("btn-seguindo");
}

// BD >> deixar de seguir
async function deixarDeSeguir() {
    try {
        await fetch(`/perfil/estabelecimento/deixarDeSeguir/${id_usuario}`);
        
        return;
    } catch (error) {
        console.log(error);
    }
}

// BD >> seguir
async function seguir() {
    try {
        await fetch(`/perfil/estabelecimento/seguir/${id_usuario}`);
        
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