// Feito a busca de todas as cidades no BD
let cidadeJs = JSON.parse(cidadesJSON);

let estado = document.getElementById('inputEstado');
let cidadeSelect = document.getElementById('inputCidade');

estado.addEventListener('change', function(event) {
    cidadeSelect.innerText = "";

    // Tirar estilo do Select readonly
    cidadeSelect.tabIndex = 0;
    cidadeSelect.disabled = false;
    cidadeSelect.classList.remove('readonly');

    // Criar primeiro option
    let cidadeOptionFirst = document.createElement("option");
    cidadeOptionFirst.value = "";
    cidadeOptionFirst.disabled = true;
    cidadeOptionFirst.selected = true;
    cidadeOptionFirst.hidden = true;
    cidadeOptionFirst.innerText = "Escolha uma cidade";

    cidadeSelect.appendChild(cidadeOptionFirst);
    

    cidadeJs.forEach(cidade => {
        if (event.target.value == cidade.id_estado) {

            // Criar options das cidades
            let cidadeOption = document.createElement("option");
            cidadeOption.value = cidade.id_cidade;
            cidadeOption.innerText = cidade.cidade;
            // console.log(cidadeOption);

            cidadeSelect.appendChild(cidadeOption);
        }
    });

})