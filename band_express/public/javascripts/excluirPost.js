const grupoPublicacao = document.getElementById('publicacao');

// Excluir post - HTML
const excluirPostHtml = (id) => {
    let cardFeed = document.getElementById(id);
    grupoPublicacao.removeChild(cardFeed);
}

// Excluir post - BD
const excluirPostBD = async (id) => {
    try {

        await fetch(`/minhaPublicacao/excluirPost/${id}`);

        return
    } catch (error) {
        console.log(error);
    }
}

// Excluir post selecionado
const excluirPost = (event) => {
    if (event.target.tagName == 'I' && event.target.id) {
        let idPost = event.target.id.slice(7);
        excluirPostHtml(idPost);
        excluirPostBD(idPost);
    }
}


grupoPublicacao.addEventListener('click', excluirPost);