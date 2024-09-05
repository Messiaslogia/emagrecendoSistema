const cepInput = document.getElementById('Cep_input');
    
const maskOptions_cep = {
    mask: '00000-000'
};

const mask_cep = IMask(cepInput, maskOptions_cep);
