let bt = document.querySelectorAll('#Efetuar_PedidoIptu');
const idCripted = document.querySelector('#idUser').value
  function verificarDiaEHora() {
    const agora = new Date();
    const diaDaSemana = agora.getDay(); // 0 (domingo) a 6 (sábado)
    const hora = agora.getHours();
  
    bt.forEach( botao => {
        botao.addEventListener('click', () => {
            // Verificar se é segunda (1), quarta (3) ou sexta (5) e se é antes das 15 horas (hora < 15)
            window.location.href = `/distribuidor/efetuarPedido?user=${idCripted}`;
            // if ((diaDaSemana === 1 || diaDaSemana === 3 || diaDaSemana === 5 || diaDaSemana == 7) && hora < 15) {
            // } else {
            // alert("Esta ação só pode ser executada às segundas, quartas e sextas até as 15 horas.");
            // }
        })
    })  
}
  
document.addEventListener('DOMContentLoaded', () => {
    verificarDiaEHora();
})