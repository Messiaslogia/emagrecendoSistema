const container_users = document.querySelector('#Container_Users');
const url = "http://localhost:3000/apiPedidos/todosPedidos";
const div_pedidos = document.querySelector('#Tabela_de_pedidos')
let status_pedido
document.addEventListener('DOMContentLoaded', () => {
    adquirirListProdutos();

});

function adquirirListProdutos(){
     fetch(url)
        .then( response => {
            return response.json()
        })
        .then( data => {
            data.forEach( pedido => {
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
                                <select id="Pedido_input" number_pedido="" name="produto" class="form-control">
                                    <option selected value="Em análise">Selecione o Produto</option>
                                    <option value="Desaprovado">Selecione o Produto</option>
                                    <option value="Aprovado">Selecione o Produto</option>
                                    <option value="">Selecione o Produto</option>
                                </select>
                            <a class="btn btn-link text-danger text-gradient px-3 mb-0" href="/apiPedidos/dellPedidos/${pedido.numero_do_pedido}"><i
                                class="material-icons text-sm me-2">delete</i>Deletar</a>
                        </td>
                    </tr>
                `
            })
        })
        .catch( err => {
            console.log(err)
        })
}

{/* <a class="btn btn-link text-dark px-3 mb-0" href="javascript:;"><i class="material-icons text-sm me-2">edit</i>Editar</a> */}
