let diasDaSemana = [ 
    { dia: "Segunda" }, 
    { dia: "Terça" }, 
    { dia: "Quarta" }, 
    { dia: "Quinta" }, 
    { dia: "Sexta" }, 
    { dia: "Sábado" }, 
    { dia: "Domingo" }, 
    { dia: "Feriado" } 
];

let diasAdicionados = [];

const render = () => {

    let grupoFuncionamento = document.getElementById("grupoFuncionamento");

    grupoFuncionamento.innerHTML = "";

    let divSemana = document.createElement('div');
    divSemana.className = "col-lg-5 col-md-10 col-sm-4 col-12";
    grupoFuncionamento.appendChild(divSemana);

        let select = document.createElement('select');
        select.className = "form-control";
        select.name = "inputFuncionamento";
        select.id="inputFuncionamento";
        divSemana.appendChild(select);

            for (let i=0 ; i<8 ; i++) {
                let option = document.createElement('option');
                option.innerText = diasDaSemana[i].dia;
                select.appendChild(option);
            }

    let divAbertura = document.createElement('div');
    divAbertura.className = "col-lg-3 col-md-5 col-sm-3 col-12";
    grupoFuncionamento.appendChild(divAbertura);

        let inputAbertura = document.createElement('input');
        inputAbertura.className = "form-control";
        inputAbertura.id= "inputAbertura";
        inputAbertura.name = "inputAbertura";
        inputAbertura.type = "time";
        divAbertura.appendChild(inputAbertura);

    let divFechamento = document.createElement('div');
    divFechamento.className = "col-lg-3 col-md-5 col-sm-3 col-12"
    grupoFuncionamento.appendChild(divFechamento);

        let inputFechamento = document.createElement('input');
        inputFechamento.className = "form-control";
        inputFechamento.id= "inputFechamento";
        inputFechamento.name = "inputFechamento";
        inputFechamento.type = "time";
        divFechamento.appendChild(inputFechamento);

    let divAdd = document.createElement('div');
    divAdd.className = "add-funcionamento"
    grupoFuncionamento.appendChild(divAdd);
            
        let aAdd = document.createElement('a');
        divAdd.appendChild(aAdd);  

            let iAdd = document.createElement('i');
            iAdd.className ="fas fa-plus-square"
            aAdd.appendChild(iAdd);  

    console.log(grupoFuncionamento)
}

render();