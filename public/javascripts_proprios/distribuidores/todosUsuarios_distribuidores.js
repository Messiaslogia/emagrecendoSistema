const container_users = document.querySelector('#Container_Users');
const inputDistribuidor = document.querySelector('#idDistribuidor');
const idCripted = document.querySelector('#idUser').value;


const url = "http://localhost:3030/distribuidor/todosUsuariosDistribuidores";
const inputsPages = document.querySelectorAll('#pageInput')
let itensPorPagina = 5;
let listUsuarios


document.addEventListener('DOMContentLoaded', () => {
    adquirirListsUsers();
});

function adquirirListsUsers() {
    const idDistribuidor = inputDistribuidor.value
    axios.get(`${url}?idDistribuidor=${idDistribuidor}`)
        .then(data => {
            listUsuarios = data.data;
            setTimeout(() => {
                displayItens(1, 0)
            }, [300])
        })
        .catch(err => {
            console.log(err)
        })
}; 


function filtro(status, index) {
    switch (status) {
        case "Todos":
            displayItens(1, index);
            break;
        case "Afiliados":
            displayItens(1, index);
        case "Representantes":
            displayItens(1, index);
        case "Afiliados de Representantes":
            displayItens(1, index);
            break;
    }
}

function displayItens(page, index) {

    let startIndex = (page - 1) * itensPorPagina;
    let endIndex = startIndex + itensPorPagina;
    let arrayPedidos = listUsuarios[index];
    let reversePedidos = arrayPedidos.slice().reverse();
    let pageItens = reversePedidos.slice(startIndex, endIndex);

    // Exibindo os itens
    container_users.innerHTML = '';
    console.log(pageItens)
    pageItens.map(user => {
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
                    <a id="Bt_dellUser" class="btn btn-link text-danger text-gradient px-3 mb-0" href="/distribuidor/dellUser/${user.id_usuario}?user=${idCripted}"><i
                            class="material-icons text-sm me-2">delete</i>Delete</a>
                    <a id="Bt_editUser" class="btn btn-link text-dark px-3 mb-0" href="/distribuidor/editarUsuario/${user.id_usuario}?user=${idCripted}"><i
                            class="material-icons text-sm me-2">edit</i>Edit</a>
                </div>
            </li>
            `
    })


    paginas(page);
};

function paginas(page) {
    const pageCont = Math.ceil(listUsuarios.length / itensPorPagina);
    const containerPagination = document.querySelector('#pag_navigation_input');

    containerPagination.innerHTML = '';

    for (let i = 1; i <= pageCont; i++) {
        const activeClass = i === page ? 'active bg-primary text-light' : '';
        containerPagination.innerHTML += `<li class="page-item cursor-pointer"><a class="page-link ${activeClass}" onclick="displayItens(${i}, 0)">${i}</a></li>`;
    }
}
