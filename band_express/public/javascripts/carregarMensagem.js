let tableMensagem = document.getElementById('tableMsg');
let buttonCarregar = document.getElementById('carregarMensagem');

// Buscar no BD
async function maisMsg() {
    try {
        let page = buttonCarregar.value;
        let buscarMsg = await fetch(`/admin/faleConosco/carregar/${page}`);
        let listaMsg = buscarMsg.json();

        return listaMsg;

    } catch (error) {
        console.log(error);
    }
}

// Criar elementos
const elementosHtmlMsg = (list) => {
    for (const item of list) {
        let trMsg = document.createElement('tr');
        trMsg.id = item.id_fale_conosco;

            let thNome = document.createElement('th');
            thNome.scope = 'row';
            thNome.innerText = item.nome;
            trMsg.appendChild(thNome);
            
            let tdEmail = document.createElement('td');
            tdEmail.innerText = item.email;
            trMsg.appendChild(tdEmail);

            let tdAssunto = document.createElement('td');
            tdAssunto.innerText = item.assunto;
            trMsg.appendChild(tdAssunto);
            

            let tdMensagem = document.createElement('td');
                let aMensagem = document.createElement('a');
                aMensagem.setAttribute('data-toggle', 'modal');
                aMensagem.setAttribute('data-target', `#verMensagem${item.id_fale_conosco}`);
                aMensagem.href = '#';
                aMensagem.innerText = 'Visualizar';
                tdMensagem.appendChild(aMensagem);
            trMsg.appendChild(tdMensagem);

            let tdCheck = document.createElement('td');
                let iconeCheck = document.createElement('i');
                iconeCheck.className = 'fas fa-check-square fa-lg';
                if (item.resolvido) {
                    iconeCheck.className = 'fas fa-check-square fa-lg check';
                }
                iconeCheck.id = `check${item.id_fale_conosco}`;
                tdCheck.appendChild(iconeCheck);
            trMsg.appendChild(tdCheck);
            
            let tdExcluir = document.createElement('td');
                let iconeTrash = document.createElement('i');
                iconeTrash.className = 'fas fa-trash fa-lg';
                iconeTrash.id = `excluir${item.id_fale_conosco}`;
                tdExcluir.appendChild(iconeTrash);
            trMsg.appendChild(tdExcluir);

            // Modal
            let divModal = document.createElement('div');
            divModal.className = 'modal fade';
            divModal.id = `verMensagem${item.id_fale_conosco}`;
            divModal.tabIndex = '-1';
            divModal.setAttribute = ('role', 'dialog');
            divModal.setAttribute = ('aria-labelledby', `verMensagem${item.id_fale_conosco}`);
            divModal.setAttribute = ('aria-hidden', 'true');
                
                let divModalDialog = document.createElement('div');
                divModalDialog.className = 'modal-dialog';
                divModal.setAttribute = ('role', 'document');
                
                    let divModalContent = document.createElement('div');
                    divModalContent.className = 'modal-content';

                        let divModalHeader = document.createElement('div');
                        divModalHeader.className = 'modal-header';

                            let modalTitle = document.createElement('h4');
                            modalTitle.className = 'modal-title'
                            modalTitle.id = 'modalMensagem';
                            modalTitle.innerText = `Mensagem - ${item.nome}`;
                            divModalHeader.appendChild(modalTitle);

                            let buttonExit = document.createElement('button');
                            buttonExit.innerHTML = '<button type="button class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true"><i class="fas fa-times"></i></span></button>';
                            divModalHeader.appendChild(buttonExit);

                        divModalContent.appendChild(divModalHeader);

                        let divModalBody = document.createElement('div');
                        divModalBody.className = 'modal-body';

                            let modalInfo = document.createElement('h5');
                            modalInfo.className = 'info-user';
                            modalInfo.innerText = item.email;
                            divModalBody.appendChild(modalInfo);

                            let pMsg = document.createElement('p');
                            pMsg.innerText = item.mensagem;
                            divModalBody.appendChild(pMsg);


                        divModalContent.appendChild(divModalBody);
                        
                        let divModalFooter = document.createElement('div');
                        divModalFooter.className = 'modal-footer';

                            let buttonCancelar = document.createElement('button');
                            buttonCancelar.type = 'button';
                            buttonCancelar.className = 'btn btn-cancelar-modal';
                            buttonCancelar.setAttribute = ('data-dismiss', 'modal');
                            buttonCancelar.innerText = 'Cancelar';
                            divModalFooter.appendChild(buttonCancelar);

                        divModalContent.appendChild(divModalFooter);
                    
                    divModalDialog.appendChild(divModalContent);

                divModal.appendChild(divModalDialog);

            trMsg.appendChild(divModal);
        
        tableMensagem.appendChild(trMsg);
    }
}


// Realizar busca e incrementar
let carregarMsg = async () => {
    try {
        let msgBuscados = await maisMsg();

        await elementosHtmlMsg(msgBuscados);

        if (msgBuscados.length < 5) {
            
            buttonCarregar.classList.add('invisible');

            return
        }

        let cont = Number(buttonCarregar.value);
        cont += 1;
        buttonCarregar.value = cont;  

    } catch (error) {
        console.log(error)
    }
    
}

buttonCarregar.addEventListener('click', carregarMsg);
