const container_users = document.querySelector('#Container_Users');
const urls = "https://sistemaemagrecendo.com/api/todosUsuarios";
const inputsPages = document.querySelectorAll('#pageInput')
let itensPorPagina = 5;
let listUsuarios


document.addEventListener('DOMContentLoaded', () => {
    adquirirListsUsers();
});

function adquirirListsUsers() {
    axios.get(urls)
        .then(data => {
            listUsuarios = data.data;
            console.log(listUsuarios)
            setTimeout(() => {
                displayItens(1, 0)
            }, [300])
        })
        .catch(err => {
            console.log(err)
        })
};

function filtro(status){
    switch (status){
        case "Todos":
            displayItens(1, 0);
            break
        case "Afiliados":
            displayItens(1, 1);
            break
        case "Distribuidores":
            displayItens(1, 2);
            break
        case "Vendedores":
            displayItens(1, 3);
            break
        case "Representantes":
            displayItens(1, 5);
            break
        case "Clientes":
            displayItens(1, 4);
            break
        case "AfiliadoRepresentante":
            displayItens(1, 6);
            break
          
    }
};

function displayItens( page, arrayindex ){
    

    let startIndex = (page - 1) * itensPorPagina;
    let endIndex = startIndex + itensPorPagina;
    let arrayPedidos = listUsuarios[arrayindex];
    let reversePedidos = arrayPedidos.slice().reverse();
    let pageItens = reversePedidos.slice(startIndex, endIndex);

    // Exibindo os itens
   container_users.innerHTML = '';

    pageItens.map(user => {

        if (user.funcao == 'Cliente' || user.funcao == 'Afiliado' || user.funcao == 'Representante' || user.funcao == 'Afiliado do Representante'){
            container_users.innerHTML += `
            <li class="list-group-item border-0 d-flex p-4 mb-2 bg-gray-100 border-radius-lg">
                <div class="d-flex flex-column">
                    <h6 class="mb-3 text-sm">${user.nome}</h6>
                    <span class="mb-2 text-xs">Função: <span class="text-dark font-weight-bold ms-sm-2">${user.funcao}</span></span>
                    <span class="mb-2 text-xs">E-mail: <span
                            class="text-dark ms-sm-2 font-weight-bold">${user.email}</span></span>
                    <span class="text-xs">Contato: <span class="text-dark ms-sm-2 font-weight-bold">(11) 94358-5267</span></span>
            
                    <span class="mt-2 text-xs">Zona: <span class="text-dark font-weight-bold ms-sm-2">${user.regiao}</span></span>
                </div>
                <div class="ms-auto text-end">
                </div>
            </li>
            `
        }else{
            container_users.innerHTML += `
            <li class="list-group-item border-0 d-flex p-4 mb-2 bg-gray-100 border-radius-lg">
                <div class="d-flex flex-column">
                    <h6 class="mb-3 text-sm">${user.nome}</h6>
                    <span class="mb-2 text-xs">Função: <span class="text-dark font-weight-bold ms-sm-2">${user.funcao}</span></span>
                    <span class="mb-2 text-xs">E-mail: <span
                            class="text-dark ms-sm-2 font-weight-bold">${user.email}</span></span>
                    <span class="text-xs">Contato: <span class="text-dark ms-sm-2 font-weight-bold">(11) 94358-5267</span></span>
            
                    <span class="mt-2 text-xs">Zona: <span class="text-dark font-weight-bold ms-sm-2">${user.regiao}</span></span>
                </div>
                <div class="ms-auto text-end">
                    <a id="Bt_dellUser" class="btn btn-link text-danger text-gradient px-3 mb-0" href="/api/dellUser/${user.id_usuario}"><i
                            class="material-icons text-sm me-2">delete</i>Delete</a>
                    <a id="Bt_editUser" class="btn btn-link text-dark px-3 mb-0" href="/api/editUser/${user.id_usuario}"><i
                            class="material-icons text-sm me-2">edit</i>Edit</a>
                </div>
            </li>
            `
        }
            
    })
    paginas(page, arrayindex);
};

function paginas(page, array){
    const pageCont = Math.ceil(listUsuarios[array].length / itensPorPagina);
    const containerPagination = document.querySelector('#pag_navigation_input');

    containerPagination.innerHTML = ''

    for( i = 1; i <= pageCont; i++){
        const activeClass = (i === page) ? 'active bg-primary text-light' : '';
        containerPagination.innerHTML += `<li class="page-item cursor-pointer"><a class="page-link ${activeClass}" onclick="displayItens(${i}, ${array})">${i}</a></li>`
    }
};
