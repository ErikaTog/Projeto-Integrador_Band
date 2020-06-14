let diasDaSemana = [ 'Segunda', 'Terça', 'Quarta', 
    'Quinta', 'Sexta', 'Sábado', 'Domingo', 'Feriado' ];

let diasAdicionados = [];

// Função q carrega os itens do Html
const view = () => {

    let grupoFuncionamento = document.getElementById('grupoFuncionamento');
    grupoFuncionamento.innerHTML = '';

        let divSemana = document.createElement('div');
        divSemana.className = 'col-lg-5 col-md-10 col-sm-4 col-12';
        grupoFuncionamento.appendChild(divSemana);

            let select = document.createElement('select');
            select.className = 'form-control';
            select.name = 'inputFuncionamento';
            select.id = 'inputFuncionamento';
            divSemana.appendChild(select);

                for (let i=0 ; i<diasDaSemana.length ; i++) {
                    let option = document.createElement('option');
                    option.innerText = diasDaSemana[i];
                    select.appendChild(option);
                }

        let divAbertura = document.createElement('div');
        divAbertura.className = 'col-lg-3 col-md-5 col-sm-3 col-12';
        grupoFuncionamento.appendChild(divAbertura);

            let inputAbertura = document.createElement('input');
            inputAbertura.className = 'form-control';
            inputAbertura.id = 'inputAbertura';
            inputAbertura.name = 'inputAbertura';
            inputAbertura.type = 'time';
            divAbertura.appendChild(inputAbertura);

        let divFechamento = document.createElement('div');
        divFechamento.className = 'col-lg-3 col-md-5 col-sm-3 col-12'
        grupoFuncionamento.appendChild(divFechamento);

            let inputFechamento = document.createElement('input');
            inputFechamento.className = 'form-control';
            inputFechamento.id = 'inputFechamento';
            inputFechamento.name = 'inputFechamento';
            inputFechamento.type = 'time';
            divFechamento.appendChild(inputFechamento);

        let divAdd = document.createElement('div');
        divAdd.className = 'add-funcionamento';
        divAdd.id= 'add-funcionamento';
        grupoFuncionamento.appendChild(divAdd);
                
            let aAdd = document.createElement('a');
            divAdd.appendChild(aAdd);  

                let iAdd = document.createElement('i');
                iAdd.className ='fas fa-plus-square';
                aAdd.appendChild(iAdd); 

    let clickAdd = document.getElementById('add-funcionamento');
    clickAdd.addEventListener('click', clickAddFunc);
            
    let grupoSelecionado = document.getElementById('grupoSelecionado');
    grupoSelecionado.innerHTML = '';

        for (let i = 0 ; i < diasAdicionados.length ; i++) {

            let itemFuncionamento = document.createElement('div');
            itemFuncionamento.className = 'itemFuncionamento';
            itemFuncionamento.id = 'itemFuncionamento' + i;
            grupoSelecionado.appendChild(itemFuncionamento);
            
                let textoDia = document.createElement('p');
                textoDia.className = 'diaSemana';
                textoDia.id = 'diaSemana' + i;
                textoDia.innerText = diasAdicionados[i].dia;
                itemFuncionamento.appendChild(textoDia);

                let textoHorario = document.createElement('p');
                textoHorario.id = 'horarioSemana' + i;
                textoHorario.innerText = diasAdicionados[i].abertura + " - " + diasAdicionados[i].fechamento;
                itemFuncionamento.appendChild(textoHorario);

                let iconeLixo = document.createElement('div');
                iconeLixo.className = 'icon-border-none';
                itemFuncionamento.appendChild(iconeLixo);

                    let lixo = document.createElement('i');
                    lixo.className = 'fas fa-trash fa-lg';
                    iconeLixo.appendChild(lixo);

        }                
}

// Função de tratamento de dados ao clicar no add
const clickAddFunc = () => {
    let diaEscolhido = document.getElementById('inputFuncionamento').value;
    let inputAbertura = document.getElementById('inputAbertura').value;
    let inputFechamento = document.getElementById('inputFechamento').value;

    if(diaEscolhido != ''){

        diasAdicionados.push({
            dia: diaEscolhido,
            abertura: inputAbertura, 
            fechamento:inputFechamento 
        });

        diasDaSemana = diasDaSemana.filter( (dia) => { 
            return dia != diaEscolhido;
        });

        view();
    }   
}

window.onload = view();
