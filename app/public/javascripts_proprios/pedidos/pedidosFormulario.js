document.addEventListener('DOMContentLoaded', function () {

    // GERA NUMEROS ALEATORIOS PARA OS PEDIDOS
    function gerarNumeroPedido() {
        const dataAtual = new Date().toISOString().replace(/[-T:]/g, '').slice(0, -5);
        const numeroAleatorio = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
        return `${numeroAleatorio}`;

    }

    // COLETA OS DADOS DO FORMULARIO
    function coletaDadosForm() {
        let dadosAtuaisForm = {};
        let dadosTeste = {};
        



        const elementosForm = document.querySelectorAll('#formPedido input, #formPedido select');
        const elementoValor = document.getElementById('Valor_Produto')
        const elementoQuantidade = document.getElementById('Quantidade_input')

        var valorQuantidade = elementoQuantidade.value
        var valorProduto = elementoValor.value

        var valorFinalPedido = valorQuantidade * valorProduto




        elementosForm.forEach(function (elemento) {
            if (elemento.name) {
            
                dadosAtuaisForm['pedido'] = numeroPedido;
                dadosAtuaisForm[elemento.name] = elemento.value;
                dadosAtuaisForm['valorPedido'] = valorFinalPedido;

            }
        })

        //Colocando os valores padores dos elementos
        elementoValor.value = ''
        elementoQuantidade.value = '';
        usuarioInput.disabled = true;
        dataInput.readOnly = true;
        horaInput.readOnly = true;
        produtoInput.value = '';
        quantidade.value = '';

    

        


        formDataArray.push(dadosAtuaisForm);
        


        
        return formDataArray;
    }


    const botaoAvancar = document.getElementById('Bt_avancar');
    const botaoEnviar = document.getElementById('Bt_Enviar');
    const usuarioInput = document.getElementById('Usuario_input');
    const dataInput = document.getElementById('Data_produto');
    const horaInput = document.getElementById('Hora_produto');
    const produtoInput = document.getElementById('Produto_input');
    const quantidade = document.getElementById('Quantidade_input');
    const numeroPedido = gerarNumeroPedido();

    // Modal
    const bt_modal = document.querySelector('#Button_Modal');
    const info_modal = document.querySelector('#Pedido_number')

    let formDataArray = [];

    // EVENTO PARA COLETAR OS DADOS AO CLICAR NO AVANCAR
    botaoAvancar.addEventListener('click', () => {
        const formData = coletaDadosForm();
        
    })

    // EVENTO PARA ENVIAR OS DADOS AO CLICAR NO ENVIAR
    botaoEnviar.addEventListener('click', () => {
        const formData = coletaDadosForm();

        let somaValorPedido = 0;
        formData.forEach(objeto => {
            if (objeto.hasOwnProperty('valorPedido')) {
                somaValorPedido += parseFloat(objeto.valorPedido);
            }
        });

        // Adiciona a propriedade com a soma em cada objeto do array
        formData.forEach(objeto => {
            objeto.somaValorPedido = somaValorPedido;
        });

        

        formData.forEach(pedido => {
            
            console.log(pedido);
            axios.post('http://localhost:3000/apiPedidos/addPedidos', pedido)
                .then(resp => {
                    console.log(resp.data)
                })
                .catch(err => {
                    console.log(err)
                })
        });

        info_modal.innerHTML = `${formData[0].pedido}`
        bt_modal.click();
        
    })
})