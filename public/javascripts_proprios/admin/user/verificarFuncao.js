const inputFuncoes = document.querySelector('#Funcao_input');
const inputSenha = document.querySelector('#Senha_input')


inputFuncoes.addEventListener('change', () => {
    const value = inputFuncoes.value;
    inputSenha.style.display = (value == 2 || value == 3) ? 'block' : 'none';
})