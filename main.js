// Seleciona o elemento onde o número do tamanho da senha será exibido
const numeroSenha = document.querySelector('.parametro-senha__texto');

// Define o tamanho padrão inicial da senha
let tamanhoSenha = 12;

// Exibe o tamanho inicial da senha no campo visual
numeroSenha.textContent = tamanhoSenha;

// Define os caracteres disponíveis para geração da senha
const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVXYWZ';  // Letras maiúsculas
const letrasMinusculas = 'abcdefghijklmnopqrstuvxywz';  // Letras minúsculas
const numeros = '0123456789';                           // Dígitos numéricos
const simbolos = '!@%*?';                               // Símbolos especiais

// Seleciona os botões de "+" e "-" para ajuste do tamanho da senha
const botoes = document.querySelectorAll('.parametro-senha__botao');

// Campo onde a senha gerada será exibida
const campoSenha = document.querySelector('#campo-senha');

// Seleciona os checkboxes de escolha de tipos de caracteres
const checkbox = document.querySelectorAll('.checkbox');

// Elemento visual para indicar a força da senha
const forcaSenha = document.querySelector('.forca');

// Define funções aos botões de aumentar/diminuir
botoes[0].onclick = diminuiTamanho;
botoes[1].onclick = aumentaTamanho;

// Função para diminuir o tamanho da senha
function diminuiTamanho() {
    if (tamanhoSenha > 1) {
        tamanhoSenha--;  // Decrementa o valor
    }
    numeroSenha.textContent = tamanhoSenha;  // Atualiza a exibição
    geraSenha();  // Gera nova senha com novo tamanho
}

// Função para aumentar o tamanho da senha
function aumentaTamanho() {
    if (tamanhoSenha < 20) {
        tamanhoSenha++;  // Incrementa o valor
    }
    numeroSenha.textContent = tamanhoSenha;  // Atualiza a exibição
    geraSenha();  // Gera nova senha com novo tamanho
}

// Adiciona a função de gerar senha sempre que um checkbox for clicado
for (i = 0; i < checkbox.length; i++) {
    checkbox[i].onclick = geraSenha;
}

// Gera uma senha assim que o script carregar
geraSenha();

// Função principal de geração da senha
function geraSenha() {
    let alfabeto = '';  // Variável que conterá todos os caracteres possíveis
    
    // Verifica quais checkboxes estão marcadas e concatena os respectivos grupos de caracteres
    if (checkbox[0].checked) {
        alfabeto += letrasMaiusculas;
    }
    if (checkbox[1].checked) {
        alfabeto += letrasMinusculas;
    }
    if (checkbox[2].checked) {
        alfabeto += numeros;
    }
    if (checkbox[3].checked) {
        alfabeto += simbolos;
    }

    let senha = '';  // String final da senha gerada

    // Gera a senha caractere por caractere
    for (let i = 0; i < tamanhoSenha; i++) {
        let numeroAleatorio = Math.random() * alfabeto.length;  // Índice aleatório
        numeroAleatorio = Math.floor(numeroAleatorio);          // Arredondado para inteiro
        senha += alfabeto[numeroAleatorio];                     // Adiciona caractere à senha
    }

    campoSenha.value = senha;  // Exibe a senha no campo de texto
    classificaSenha(alfabeto.length);  // Avalia a força da senha
}

// Função que classifica a força da senha com base na entropia
function classificaSenha(tamanhoAlfabeto){
    // Cálculo da entropia: tamanho da senha * log2 do tamanho do conjunto de caracteres
    let entropia = tamanhoSenha * Math.log2(tamanhoAlfabeto);
    console.log(entropia);  // Para fins de depuração

    // Remove classes anteriores de força
    forcaSenha.classList.remove('fraca','media','forte');

    // Adiciona a classe de acordo com a entropia
    if (entropia > 57){
        forcaSenha.classList.add('forte');  // Muito segura
    } else if (entropia > 35 && entropia < 57 ) {
        forcaSenha.classList.add('media');  // Segurança média
    } else if (entropia <= 35){
        forcaSenha.classList.add('fraca');  // Fraca
    }

    // Exibe tempo estimado para descobrir a senha (considerando 100 milhões de tentativas por segundo)
    const valorEntropia = document.querySelector('.entropia');
    valorEntropia.textContent = "Um computador pode levar até " + 
        Math.floor(2**entropia/(100e6*60*60*24)) + 
        " dias para descobrir essa senha.";
}
