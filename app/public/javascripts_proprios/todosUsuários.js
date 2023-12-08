const container_users = document.querySelector('#Container_Users');
const url = "http://localhost:3000/api/todosUsuarios";
const inputsPages = document.querySelectorAll('#pageInput')

document.addEventListener('DOMContentLoaded', () => {
    adquirirListsUsers();
});

function adquirirListsUsers() {
    axios.post(url, {
        page: 1
    })
        .then(data => {
            container_users.innerHTML = ''
            let listUser = data.data
            listUser.forEach(user => {
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
                        <a id="Bt_editUser" class="btn btn-link text-dark px-3 mb-0" href="/admin/editarUsuario/${user.id_usuario}"><i
                                class="material-icons text-sm me-2">edit</i>Edit</a>
                    </div>
                </li>
                `
            });
        })
        .catch(err => {
            console.log(err)
        })
};

function filtragem(funcao) {
    if (funcao == 'Todos') {
        adquirirListsUsers()
    } else {
        axios.post(url, {
            page: 1
        })
            .then(data => {
                let listUser = data.data
                container_users.innerHTML = ''
                listUser.forEach(user => {
                    if (user.funcao == funcao) {
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
                            <a id="Bt_editUser" class="btn btn-link text-dark px-3 mb-0" href="/admin/editarUsuario/${user.id_usuario}"><i
                                    class="material-icons text-sm me-2">edit</i>Edit</a>
                        </div>
                    </li>
                    `
                    }
                });
            })
            .catch(err => {
                console.log(err)
            })
    }
}

function newPage(page, div) {
    inputsPages.forEach(input => {
        input.classList.remove('active')
    })
    div.parentNode.classList.add('active')
    axios.post(url, {
        page: page
    })
        .then(data => {
            container_users.innerHTML = ''
            let listUser = data.data
            listUser.forEach(user => {
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
                    <a id="Bt_editUser" class="btn btn-link text-dark px-3 mb-0" href="/admin/editarUsuario/${user.id_usuario}"><i
                            class="material-icons text-sm me-2">edit</i>Edit</a>
                </div>
            </li>
            `
            });
        })
        .catch(err => {
            console.log(err)
        })
}