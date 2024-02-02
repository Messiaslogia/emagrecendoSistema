const container_users = document.querySelector('#Container_Users');
const url = "http://localhost:3000/apiPedidos/todosPedidos";
const urlQUantidade = "http://localhost:200/pedidos/quantidadeTotalDosPedidos"
const div_pedidos = document.querySelector('#Tabela_de_pedidos')
let itensPorPagina = 5;
let status_pedido;
let listPedidos;

document.addEventListener('DOMContentLoaded', () => {
    adquirirListProdutos();

    setTimeout(() => {
        displayItens( 1, 0 );
        dellFunction();
    }, [300])
});

function filtro(status){
    switch (status){
        case "Desaprovados":
            displayItens(1, 0);
            dellFunction();
            break
        case "Recusados":
            displayItens(1, 1);
            dellFunction();
            break
        default:
            console.log("Erro");
            break        
    }
};

function adquirirListProdutos(){
    fetch(url)
        .then( response => {
            return response.json();
        })
        .then( data => {
            listPedidos = data;
        })
        .catch( err => {
            console.log(err);
        })
};

// Paginação
function paginas(page, array){
    const pageCont = Math.ceil(listPedidos[array].length / itensPorPagina);
    const containerPagination = document.querySelector('#pag_navigation_input');

    containerPagination.innerHTML = ''

    for( i = 1; i <= pageCont; i++){
        containerPagination.innerHTML += `<li class="page-item"><a class="page-link" onclick="displayItens(${i}, ${array})">${i}</a></li>`
    }
};

function displayItens(page, arrayindex){
    
    let startIndex = (page - 1) * itensPorPagina;
    let endIndex = startIndex + itensPorPagina;
    let arrayPedidos = listPedidos[arrayindex].slice().reverse();
    let pageItens = arrayPedidos.slice(startIndex, endIndex);

    // Exibindo os itens
    div_pedidos.innerHTML = '';
 
    if(arrayindex == 1){
         pageItens.map(pedido => {


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
                     <span class="badge badge-sm bg-gradient-success">${pedido.quantidadeTotal}</span>
                 </td>
                 <td class="align-middle text-center">
                     <span class="text-secondary text-xs font-weight-bold">${pedido.data}</span>
                 </td>
                 <td class="align-middle">
                     <select id="Pedido_input" number_pedido="${pedido.numero_do_pedido}" name="produto" class="form-control">
                        <option selected disabled value="Desaprovado">--</option>
                        
                        <option value="Aprovado">Aprovado</option>
                        <option value="Recusado">Recusado</option>
                     </select>
                     
                 </td>

                 <td><a idAtributo="${pedido.numero_do_pedido}" id="Button_Deletar_Pedido" class="btn btn-link text-danger text-gradient mb-0"">
                         <i class="material-icons text-sm me-2">delete</i>
                     Deletar</a></td>
             </tr>
         `
     })
     statusAlt()
    }else{
         pageItens.map(pedido => {


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
                     <span class="badge badge-sm bg-gradient-success">${pedido.quantidadeTotal}</span>
                 </td>
                 <td class="align-middle text-center">
                     <span class="text-secondary text-xs font-weight-bold">${pedido.data}</span>
                 </td>
                 <td class="align-middle">
                     <select id="Pedido_input" number_pedido="${pedido.numero_do_pedido}" name="produto" class="form-control" >
                        <option selected disabled value="Desaprovado">--</option>
                        
                        <option value="Aprovado">Aprovado</option>
                        <option value="Recusado">Recusado</option>
                     </select>
                    
                    
                 </td>

                 <td class="align-middle" ">
                     <a idAtributo="${pedido.numero_do_pedido}" id="Button_Deletar_Pedido" class="btn btn-link text-danger text-gradient mb-0">
                         <i class="material-icons text-sm me-2">delete</i>
                     Deletar</a>
                 </td>
             </tr>
         `
         })
         statusAlt();
    }
 
    paginas(0, arrayindex);
 };

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

function dellFunction(){
    let botoes_deletar_pedido = document.querySelectorAll('#Button_Deletar_Pedido');
    

    botoes_deletar_pedido.forEach(botao => {
        botao.addEventListener('click', (e) => {
            let idPedido = e.target.getAttribute('idAtributo');

            axios.get(`/apiPedidos/dellPedidos/${idPedido}`)
                .then(resp => {
                    location.reload()
                })
                .catch(err => {
                    console.log(err);
                })
        })
    })
}

{/* <a class="btn btn-link text-dark px-3 mb-0" href="javascript:;"><i class="material-icons text-sm me-2">edit</i>Editar</a> */}
