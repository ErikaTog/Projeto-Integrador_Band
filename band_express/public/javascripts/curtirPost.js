const grupoPublicacao = document.getElementById('publicacao');

// BD >> deixar de curtir
async function desCurtir(id) {
    try {
        await fetch(`/home/deixarDeCurtir/${id}`);
        
        return;
    } catch (error) {
        console.log(error);
    }
}

// BD >> curtir
async function curtir(id) {
    try {
        await fetch(`/home/curtir/${id}`);
        
        return;
    } catch (error) {
        console.log(error);
    }
}

// Excluir post selecionado
const funcionamentoButtonCurtir = async (event) => {

    try {
        // selecionar <i> star
        if (event.target.tagName == 'I') {
            
            let iconeCurtir = event.target;
            
            const id_post = iconeCurtir.id.slice(11);
    
            if (iconeCurtir.classList.contains('curtiu')) { //retorna false true       
                iconeCurtir.classList.remove('curtiu')
                await desCurtir(id_post);
            } else {
                iconeCurtir.classList.add('curtiu')
                await curtir(id_post);
            }
        }
        
    } catch (error) {
        console.log(error)
    }

}

grupoPublicacao.addEventListener('click', funcionamentoButtonCurtir);