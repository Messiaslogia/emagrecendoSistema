const container_users = document.querySelector('#Container_Users');
const inputDistribuidor = document.querySelector('#idDistribuidor');
const idDistribuidor = document.querySelector('#idUserCripter').value;
const idCripted = document.querySelector('#idUser').value;


const url = "/distribuidor/todosUsuariosDistribuidores";
const inputsPages = document.querySelectorAll('#pageInput')
let itensPorPagina = 5;
let listUsuarios


document.addEventListener('DOMContentLoaded', () => {
    adquirirListsUsers();
});

function adquirirListsUsers() {
    axios.get(`${url}?idDistribuidor=${idDistribuidor}`)
        .then(data => {
            console.log(data.data);
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
            break;
        case "Representantes":
            displayItens(1, index);
            break;
        case "Afiliados de Representantes":
            displayItens(1, index);
            break;
        default:
            console.error(`Status '${status}' não reconhecido.`);
            break;
    }
}

function displayItens(page, index) {
    let startIndex = (page - 1) * itensPorPagina;
    let endIndex = startIndex + itensPorPagina;

    if (index >= 0 && index < listUsuarios.length) {
        let arrayUsuarios = listUsuarios[index];
        let totalUsuarios = arrayUsuarios.length;

        let totalPages = Math.ceil(totalUsuarios / itensPorPagina);

        let pageUsuarios = arrayUsuarios.slice(startIndex, endIndex);

        container_users.innerHTML = '';
        pageUsuarios.forEach(user => {
            let nome = user.nome || 'Nome não disponível';
            let funcao = user.funcao == '6' ? 'Representante' : user.funcao == '7' ? 'Afiliado' : user.funcao;
            let email = user.email || 'E-mail não disponível';
            let telefone = user.telefone || 'Telefone não disponível';
            let regiao = user.regiao || 'Região não disponível';

            container_users.innerHTML += `
                <li class="list-group-item border-0 d-flex p-4 mb-2 bg-gray-100 border-radius-lg">
                    <div class="d-flex flex-column">
                        <h6 class="mb-3 text-sm">${nome}</h6>
                        <span class="mb-2 text-xs">Função: <span class="text-dark font-weight-bold ms-sm-2">${funcao}</span></span>
                        <span class="mb-2 text-xs">E-mail: <span class="text-dark ms-sm-2 font-weight-bold">${email}</span></span>
                        <span class="text-xs">Contato: <span class="text-dark ms-sm-2 font-weight-bold">${telefone}</span></span>
                        <span class="mt-2 text-xs">Zona: <span class="text-dark font-weight-bold ms-sm-2">${regiao}</span></span>
                    </div>
                    <div class="ms-auto text-end">
                        <a id="Bt_editUser" class="btn btn-link text-dark px-3 mb-0" href="/distribuidor/editarUsuario/${user.id_usuario}?user=${idCripted}">
                            <i class="material-icons text-sm me-2">edit</i>Edit
                        </a>
                    </div>
                </li>`;
        });

        paginas(page, index); // Atualiza a interface de paginação com o índice correto
    } else {
        console.error(`Índice ${index} fora dos limites.`);
    }
}




function paginas(page, index) {
    const arrayUsuarios = listUsuarios[index];
    const pageCont = Math.ceil(arrayUsuarios.length / itensPorPagina);
    const containerPagination = document.querySelector('#pag_navigation_input');

    containerPagination.innerHTML = '';

    for (let i = 1; i <= pageCont; i++) {
        const activeClass = i === page ? 'active bg-primary text-light' : '';
        containerPagination.innerHTML += `<li class="page-item cursor-pointer"><a class="page-link ${activeClass}" onclick="displayItens(${i}, ${index})">${i}</a></li>`;
    }
}

