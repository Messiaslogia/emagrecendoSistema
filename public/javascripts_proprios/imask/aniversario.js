// Seleciona o elemento de input
const dataAniversarioInput = document.getElementById('Nascimento_input');

// Aplica a máscara utilizando IMask
const maskOptions_Date = {
  mask: Date,
  pattern: 'd/`m/`Y',
  blocks: {
    d: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 31,
      maxLength: 2
    },
    m: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12,
      maxLength: 2
    },
    Y: {
      mask: IMask.MaskedRange,
      from: 1900,
      to: 2099
    }
  },
  // Formata a data antes de aplicar a máscara
  format: function (date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return [day, month, year].map(function (val) {
      return val < 10 ? '0' + val : val;
    }).join('/');
  },
  // Faz o parse da data depois que a máscara é removida
  parse: function (str) {
    const parts = str.split('/');
    return new Date(parts[2], parts[1] - 1, parts[0]);
  }
};

// Inicializa a máscara
const mask_Date = IMask(dataAniversarioInput, maskOptions_Date);