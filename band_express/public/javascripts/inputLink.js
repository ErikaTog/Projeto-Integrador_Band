let iconLink = document.getElementById('iconLink');
let inputLink = document.getElementById('linkVideo');

// Retirar class invisible
const removeInvisible = () => {
    inputLink.classList.toggle('invisible');
}

iconLink.addEventListener('click', removeInvisible);