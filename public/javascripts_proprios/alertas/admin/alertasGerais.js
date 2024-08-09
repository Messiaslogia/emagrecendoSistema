const url_alertas_admin = "/alertas/alertasGeraisAdmin";
const url_alertas_dell = "/alertas/dellAlertas";
const id_user_alert = document.querySelector('#Id_User').value
const div_dos_alertas = document.querySelector('#DivAlertas');
const bt_alerta = document.querySelector('#TemNotificacao');
let alertas;


document.addEventListener('DOMContentLoaded', () => {
    axios.get(`${url_alertas_admin}?user=${id_user_alert}`)
        .then((result) => {
            exibir_alertas(result.data);
        }).catch((err) => {
            console.log(err);
        });
})

function exibir_alertas(array){

    array.forEach(element => { 
        if(element.length != 0){ //Verifica se existe qualquer alerta, se existir troca o ícone
            bt_alerta.style.display = "block";
            bt_alerta.classList.add('animacaoAlerta');
            document.querySelector('#SemNotificacao').style.display = "none";
        }else{
            div_dos_alertas.innerHTML = `<li class="mb-2" id="AlertaGeral">Sem alertas no momento</li>`;
        }
    });

    array[1].forEach(alerta => {
        div_dos_alertas.innerHTML += `
            <li class="mb-2" id="AlertaGeral">
                <a class="dropdown-item border-radius-md hoverAlert">
                    <div class="d-flex py-1">
                        <div class="py-auto pt-2">
                            <div class="border border-5 border-danger rounded rounded-circle bg-danger">
                                <span class="material-symbols-outlined align-middle" style="margin-left: 1px; color: #000">
                                    inventory_2
                                </span>
                            </div>   
                        </div>
                        <div class="d-flex flex-column justify-content-center ms-3">
                            <h6 class="text-sm font-weight-normal mb-1">
                                <span class="font-weight-bold">${alerta.mensagem}<br> ${alerta.nome_produto}</span>
                            </h6>
                            <p class="text-xs text-secondary mb-0">
                                <span class="material-symbols-outlined me-1 align-middle" style="font-size: 120%">
                                    schedule
                                </span>
                                13 minutes ago
                            </p>
                        </div>
                    </div>
                </a>
                <div id="RemoverAlertaGeral" class="text-center bg-danger" style="display: none;" onclick="removerAlerta(${alerta.id_alerta})">
                    <span class="material-symbols-outlined">
                        notifications_off
                    </span>
                </div>
            </li>
        `
    });

    alertas = document.querySelectorAll('#AlertaGeral'); // Salva todos os alertas para serem manipulados depois
    hoverAlert();
};

// Muda o icon após o primeiro click
bt_alerta.addEventListener('click', (e) => {
    bt_alerta.style.display = "none";
    document.querySelector('#SemNotificacao').style.display = "block";
});

function hoverAlert(){
    // Escuta o evento de passar e tirar o mouse para exibir a div de mudar o status do alerta.
    alertas.forEach(alerta => {
        alerta.addEventListener('mouseenter', (e) => {
            const div = e.target.querySelector('#RemoverAlertaGeral');
            div.style.display ="block";
            div.classList.add('inHoverAlert');
        });

        alerta.addEventListener('mouseleave', (e) => {
            const div = e.target.querySelector('#RemoverAlertaGeral');
            div.style.display ="none";
            div.classList.remove('inHoverAlert');
        })
    });
};


function removerAlerta(id){
    // Remover alertas já visualizados
    axios.get(`${url_alertas_dell}?user=${id_user_alert}&idAlerta=${id}`)
        .then(resp => {
            location.reload();
        })
        .catch(err => {
            console.log(err);
        })
}


