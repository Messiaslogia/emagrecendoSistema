const container_users = document.querySelector('#Container_Users');
const url = "http://localhost:3000/apiPedidos/todosPedidos";
const div_pedidos = document.querySelector('#Tabela_de_pedidos')
let status_pedido;

document.addEventListener('DOMContentLoaded', () => {
    adquirirListProdutos();
});

function adquirirListProdutos(){
    fetch(url)
        .then( response => {
            return response.json()
        })
        .then( data => {
            let indexAnterior = 0
            data.forEach((pedido, index) => {
                if(index == 0){
                    div_pedidos.innerHTML += `
                    <tr>
                        <td>
                            <div class="d-flex px-2 py-1">
                                <div class="cursor-pointer">
                                    <i id="Info_pedidos" number_pedido="${pedido.numero_do_pedido}" class="material-icons cursor-pointer">info</i>
                                </div>
                                <div class="d-flex flex-colum justify-content-center">
                                    <h6 class="mb-0 text-sm" style="margin-left: 1rem">${pedido.numero_do_pedido}</h6>
                                </div>
                            </div>
                        </td>
                        <td>
                            <p class="text-xs font-weight-bold mb-0">${pedido.status}</p>
                        </td>
                        <td class="align-middle text-center text-sm">
                            <span class="badge badge-sm bg-gradient-success">${pedido.quantidade}</span>
                        </td>
                        <td class="align-middle text-center">
                            <span class="text-secondary text-xs font-weight-bold">${pedido.data}</span>
                        </td>
                        <td class="align-middle">
                            <select id="Pedido_input" number_pedido="${pedido.numero_do_pedido}" name="produto" class="form-control">
                                <option selected value="Em análise">Em análise</option>
                                <option value="Desaprovado">Desaprovado</option>
                                <option value="Aprovado">Aprovado</option>
                            </select>
                            
                        </td>

                        <td><a class="btn btn-link text-danger text-gradient mb-0" href="/apiPedidos/dellPedidos/${pedido.numero_do_pedido}">
                                <i class="material-icons text-sm me-2">delete</i>
                            Deletar</a></td>
                    </tr>
                `
                    
                }else{
                    if(pedido.numero_do_pedido != data[indexAnterior].numero_do_pedido){
                        div_pedidos.innerHTML += `
                            <tr>
                                <td>
                                    <div class="d-flex px-2 py-1">
                                        <div class="cursor-pointer">
                                            <i id="Info_pedidos" number_pedido="${pedido.numero_do_pedido}" class="material-icons cursor-pointer">info</i>
                                        </div>
                                        <div class="d-flex flex-colum justify-content-center">
                                            <h6 class="mb-0 text-sm" style="margin-left: 1rem">${pedido.numero_do_pedido}</h6>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <p class="text-xs font-weight-bold mb-0">${pedido.status}</p>
                                </td>
                                <td class="align-middle text-center text-sm">
                                    <span class="badge badge-sm bg-gradient-success">${pedido.quantidade}</span>
                                </td>
                                <td class="align-middle text-center">
                                    <span class="text-secondary text-xs font-weight-bold">${pedido.data}</span>
                                </td>
                                <td class="align-middle">
                                    <select id="Pedido_input" number_pedido="${pedido.numero_do_pedido}" name="produto" class="form-control" >
                                        <option selected value="Em análise">Em análise</option>
                                        <option value="Desaprovado">Desaprovado</option>
                                        <option value="Aprovado">Aprovado</option>
                                    </select>
                                   
                                   
                                </td>

                                <td class="align-middle" ">
                                    <a class="btn btn-link text-danger text-gradient mb-0" href="/apiPedidos/dellPedidos/${pedido.numero_do_pedido}">
                                        <i class="material-icons text-sm me-2">delete</i>
                                    Deletar</a>
                                </td>
                            </tr>
                        `
                        indexAnterior++
                    }else{
                        indexAnterior++
                    }  
                }
            })
            statusAlt()
        })
        .catch( err => {
            console.log(err)
        })
}

function statusAlt(){
    let status_pedido = document.querySelectorAll('#Pedido_input');


        status_pedido.forEach(pedido => {
            pedido.addEventListener('change', (e) => {
                let numeroDPedido = e.target.getAttribute('number_pedido');

                axios.post('http://localhost:3000/apiPedidos/novoStatus', {
                    status: pedido.value,
                    pedido: numeroDPedido
                })
                    .then(resp => {
                        window.location.href = 'http://localhost:3000/admin/aprovarPedido'
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
        })  
}

{/* <a class="btn btn-link text-dark px-3 mb-0" href="javascript:;"><i class="material-icons text-sm me-2">edit</i>Editar</a> */}
