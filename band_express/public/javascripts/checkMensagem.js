const table = document.getElementById('tableMsg');

// Resolvido - BD
const resolvidoBD = async (id) => {
    try {

        await fetch(`/admin/faleConosco/resolvido/${id}`);

        return
    } catch (error) {
        console.log(error);
    }
}


// Check Mensagem resolvida
const checkMsg = (event) => {
    if (event.target.tagName == 'I' && event.target.classList[1] == 'fa-check-square') {
        let idMsg = event.target.id.slice(5);
        event.target.classList.add('check');
        resolvidoBD(idMsg);
    }
}


table.addEventListener('click', checkMsg);