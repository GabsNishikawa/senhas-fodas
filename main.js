// Seleciona o elemento de texto onde o número correspondente ao tamanho da senha será exibido dinamicamente
const numeroSenha = document.querySelector('.parametro-senha__texto');

// Define o valor inicial padrão para o tamanho da senha gerada
let tamanhoSenha = 12;

// Exibe o valor inicial do tamanho da senha na interface do usuário
numeroSenha.textContent = tamanhoSenha;

// Define os grupos de caracteres disponíveis para a criação da senha
const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVXYWZ';  // Conjunto de letras maiúsculas do alfabeto
const letrasMinusculas = 'abcdefghijklmnopqrstuvxywz';  // Conjunto de letras minúsculas do alfabeto
const numeros = '0123456789';                           // Dígitos numéricos de 0 a 9
const simbolos = '!@%*?';                               // Alguns símbolos especiais comuns

// Seleciona os botões "+" (aumentar) e "-" (diminuir) para ajuste do comprimento da senha
const botoes = document.querySelectorAll('.parametro-senha__botao');

// Campo onde a senha gerada será exibida (input de texto)
const campoSenha = document.querySelector('#campo-senha');

// Seleciona todos os checkboxes responsáveis por ativar os diferentes tipos de caracteres na senha
const checkbox = document.querySelectorAll('.checkbox');

// Elemento visual que indica a força da senha com base em sua entropia (por exemplo, cor ou barra de progresso)
const forcaSenha = document.querySelector('.forca');

// Define ações dos botões: associando as funções de incremento e decremento ao clique dos botões
botoes[0].onclick = diminuiTamanho;
botoes[1].onclick = aumentaTamanho;

// Função que reduz o tamanho da senha em 1 unidade (mínimo de 1)
function diminuiTamanho() {
    if (tamanhoSenha > 1) {
        tamanhoSenha--;  // Diminui o valor do tamanho da senha
    }
    numeroSenha.textContent = tamanhoSenha;  // Atualiza o valor mostrado ao usuário
    geraSenha();  // Gera uma nova senha com o novo tamanho
}

// Função que aumenta o tamanho da senha em 1 unidade (máximo de 20)
function aumentaTamanho() {
    if (tamanhoSenha < 20) {
        tamanhoSenha++;  // Aumenta o valor do tamanho da senha
    }
    numeroSenha.textContent = tamanhoSenha;  // Atualiza o valor mostrado ao usuário
    geraSenha();  // Gera uma nova senha com o novo tamanho
}

// Para cada checkbox, adiciona a função `geraSenha` para ser executada ao clicar nele
// Isso permite que a senha seja atualizada automaticamente ao alterar as opções de caracteres
for (i = 0; i < checkbox.length; i++) {
    checkbox[i].onclick = geraSenha;
}

// Gera uma senha automaticamente assim que a página é carregada
geraSenha();

// Função principal responsável por gerar a senha com base nas opções selecionadas
function geraSenha() {
    let alfabeto = '';  // Armazena o conjunto de caracteres possíveis conforme os checkboxes marcados
    
    // Verifica cada checkbox individualmente e adiciona os caracteres ao conjunto permitido
    if (checkbox[0].checked) {
        alfabeto += letrasMaiusculas;  // Adiciona letras maiúsculas se marcado
    }
    if (checkbox[1].checked) {
        alfabeto += letrasMinusculas;  // Adiciona letras minúsculas se marcado
    }
    if (checkbox[2].checked) {
        alfabeto += numeros;  // Adiciona números se marcado
    }
    if (checkbox[3].checked) {
        alfabeto += simbolos;  // Adiciona símbolos se marcado
    }

    let senha = '';  // Inicializa a variável que armazenará a senha final

    // Gera a senha caractere por caractere com base no tamanho selecionado
    for (let i = 0; i < tamanhoSenha; i++) {
        let numeroAleatorio = Math.random() * alfabeto.length;  // Gera um número aleatório baseado no tamanho do conjunto de caracteres
        numeroAleatorio = Math.floor(numeroAleatorio);          // Arredonda o número aleatório para baixo para obter um índice válido
        senha += alfabeto[numeroAleatorio];                     // Adiciona o caractere sorteado à senha
    }

    campoSenha.value = senha;  // Exibe a senha gerada no campo de texto da interface
    classificaSenha(alfabeto.length);  // Avalia a força da senha com base na entropia
}

// Função que avalia a força da senha com base na entropia estimada
function classificaSenha(tamanhoAlfabeto) {
    // Calcula a entropia com base na fórmula: entropia = comprimento * log2(tamanho do alfabeto)
    let entropia = tamanhoSenha * Math.log2(tamanhoAlfabeto);
    console.log(entropia);  // Exibe a entropia no console para depuração

    // Remove classes CSS anteriores para atualizar a força visual da senha
    forcaSenha.classList.remove('fraca','media','forte');

    // Aplica a classe CSS correspondente à faixa da entropia (fraca, média ou forte)
    if (entropia > 57){
        forcaSenha.classList.add('forte');  // Senha considerada muito forte
    } else if (entropia > 35 && entropia < 57 ) {
        forcaSenha.classList.add('media');  // Senha considerada de força média
    } else if (entropia <= 35){
        forcaSenha.classList.add('fraca');  // Senha considerada fraca
    }

    // Mostra uma estimativa de tempo para que um computador descubra a senha (brute-force)
    const valorEntropia = document.querySelector('.entropia');
    valorEntropia.textContent = "Um computador pode levar até " + 
        Math.floor(2 ** entropia / (100e6 * 60 * 60 * 24)) + 
        " dias para descobrir essa senha.";
}
