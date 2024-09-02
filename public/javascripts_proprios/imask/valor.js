// Seleciona o campo de entrada
const element = document.getElementById('Valor_entrega');

// Configura o IMask para o formato de moeda
const maskOptions = {
  mask: Number, // Configuração de máscara para números
  scale: 2,     // Número de casas decimais
  signed: false, // Permite números negativos, mas aqui está desativado
  thousandsSeparator: '.', // Separador de milhares
  padFractionalZeros: true, // Adiciona zeros após a vírgula se necessário
  normalizeZeros: true, // Remove zeros desnecessários
  radix: ',', // Separador decimal
  mapToRadix: ['.'], // Aceita ponto como separador decimal
  prefix: 'R$ ', // Prefixo de moeda
};

// Aplica a máscara
const mask = IMask(element, maskOptions);