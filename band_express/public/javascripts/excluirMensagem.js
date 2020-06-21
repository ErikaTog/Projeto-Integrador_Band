const tableMsg = document.getElementById('tableMsg');

// Excluir post - HTML
const excluirMsgHtml = (id) => {
    let tr = document.getElementById(id);
    tableMsg.removeChild(tr);
}

// Excluir post - BD
const excluirMsgBD = async (id) => {
    try {

        await fetch(`/admin/faleConosco/excluir/${id}`);

        return
    } catch (error) {
        console.log(error);
    }
}

// Excluir post selecionado
const excluirMsg = (event) => {
    if (event.target.tagName == 'I' && event.target.classList[1] == 'fa-trash') {
        let idMsg = event.target.id.slice(7);
        excluirMsgHtml(idMsg);
        alert(`Mensagem excluída com sucesso!`)
        excluirMsgBD(idMsg);
    }
}


tableMsg.addEventListener('click', excluirMsg);