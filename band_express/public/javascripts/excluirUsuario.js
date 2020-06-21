const table = document.getElementById('tableUsuario');

// Excluir post - HTML
const excluirUsuarioHtml = (id) => {
    let tr = document.getElementById(id);
    table.removeChild(tr);
}

// Excluir post - BD
const excluirUsuarioBD = async (id) => {
    try {

        await fetch(`/admin/excluirUsuario/${id}`);

        return
    } catch (error) {
        console.log(error);
    }
}

// Excluir post selecionado
const excluirUsuario = (event) => {
    // event.target.id porque há <i> sem id
    if (event.target.tagName == 'I' && event.target.id) {
        let idUsuario = event.target.id.slice(7);
        excluirUsuarioHtml(idUsuario);
        alert(`Usuário com id ${idUsuario} excluído com sucesso!`)
        excluirUsuarioBD(idUsuario);
    }
}


table.addEventListener('click', excluirUsuario);