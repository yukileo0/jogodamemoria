const grid = document.querySelector('.grid');
const spanJogador = document.querySelector('.jogador');
const timer = document.querySelector('.timer');

const characters = [ /* 3_Criar o array com os nomes das imagens */
  'Senac1',
  'Senac2',
  'Senac3',
  'Senac4',
  'Senac5',
  'Senac6',
  'Senac7',
  'Senac8',
  'Senac9',
  'Senac10',
];

const createElement = (tag, className) => { /* 2_Função que faz a criação */
  const elemento = document.createElement(tag); /* cria o elemento "tag" recebida */
  elemento.className = className;  /* repassa o nome da tag recebida para a classe */
  return elemento; /* retorna o elemento inserido para ser "criado e inserido na variável createElement." */
}

let primeiraCard = '';  /* cria as variáveis que irão receber informações... */
let segundaCard = '';

const verificaFimGame = () => { /* verificar se já estão todos desabilitados */
  const desabilitarCards = document.querySelectorAll('.disabilitar-card');
/* recebe todos os elementos que estão "desabilitados." */
  if (desabilitarCards.length === 20) {  /* verifica se já existem 20 desabilitados, na verdade estamos contando (length) os elementos deste array */
    clearInterval(this.loop); /* limpa a contagem de tempo */
    alert(`Parabéns, ${spanJogador.innerHTML}! Seu tempo foi de: ${timer.innerHTML}`);
    /* Informa em tela que acabou, e apresenta o seu tempo. */
  }
}

const checkCards = () => { /* comparação de cartas */
  const primeiraCharacter = primeiraCard.getAttribute('data-character');/* cria o atributo para podermos ter como valor e podermos utilizar e buscar. (nome) */
  const segundaCharacter = segundaCard.getAttribute('data-character');/* cria o atributo para podermos ter como valor e podermos utilizar e buscar. (nome) */

  if (primeiraCharacter === segundaCharacter) { /* comparaçao dos nome itens, nome dos atributos inseridos. */

  
    primeiraCard.firstChild.classList.add('disabilitar-card'); /* desabilitar as cartas */
    /* apenas na primeira carta clicada */
    segundaCard.firstChild.classList.add('disabilitar-card');

    primeiraCard = '';   /* limpa as variáveis que contem os atributos */
    segundaCard = '';
    /* é necessário zerar, pois caso contrário, não poderemos mais clicar nas outras cartas para procurarmos. */

    verificaFimGame(); /* verifica o fim do jogo */

  } else { /* caso os atritutos dos elemento clicados não sejem iguais. */
    setTimeout(() => {  /* este função irá colocar um tempo de espera para visualizarmos se as imagens são ou não iguais, senão não irá virar a carta. */

      primeiraCard.classList.remove('revela-card'); /* remove o atributo do elemento */
      segundaCard.classList.remove('revela-card');

      primeiraCard = ''; /* limpa as variáveis que contem os atributos */
      segundaCard = '';

    }, 500); /* tempo "espera" para que as cartas sejam verificadas e "reviradas" */
  }

}

const revelaCard = ({ target }) => { /* função para revalar a carta, target: elemento que foi clicado. */

  if (target.parentNode.className.includes('revela-card')) {
    return; /* pega o pai do elemento, e inclue uma classe neste */
  } /* retorna a funcionalidade caso isso seja executado com sucesso. */

  if (primeiraCard === '') {
    /* isso ocorre caso a primeira carta não seja clicada */
    target.parentNode.classList.add('revela-card');
    primeiraCard = target.parentNode;

  } else if (segundaCard === '') {
/* isso ocorre caso a segunda carta não seja clicada */
    target.parentNode.classList.add('revela-card');
    segundaCard = target.parentNode;

    checkCards(); /* irá verificar se as cartas são iguais. */

  }
}

const createCard = (character) => { /* 1_função para criar os elementos na tela */

  const card = createElement('div', 'card'); /* Cria a div e o card */
  const front = createElement('div', 'face front'); /* Cria a div e a frente */
  const back = createElement('div', 'face back'); /* Cria a div a a parte de tras */

  front.style.backgroundImage = `url('../img/${character}.jpg')`;
  /* insere na frente a imagem via css, o nome da imagem, pegando do vetor com os nomes e concatenando com a extensão. A crase permite repassar outras variáveis*/
  card.appendChild(front); /* Insere um novo "filho" no card - frente*/
  card.appendChild(back); /* Insere um novo "filho" no card - tras */

  card.addEventListener('click', revelaCard); /* fica aguardando um click para executar a função revelaCard */
  card.setAttribute('data-character', character)
  /* Insere o atributo data-character, com o conteúdo do nome das imagens*/

  return card; /* retorna a nova card */
}

const loadGame = () => { /* 4_Carregamento das imagens e da tela. */
  const duplicateCharacters = [...characters, ...characters];
  /* os 3 pontos significa expalhar elementos, e como temos que ter 2 imagens, então colocamos a vírgula e novamente o mesmo elemento de array. Mas no momento estão na mesmo sequencia ou ordem e não é isso que queremos, precisam ser aleatórios. */
  const embaralharArray = duplicateCharacters.sort(() => Math.random() - 0.5);
  /* aqui estaremos embaralhando os itens do array. O Sort irá ordenar a sequencia, mas o random, trará valores entre 0 e 1 e diminuindo -0,5, trará valores negativos zero e positivos.  */
  embaralharArray.forEach((character) => { /* realiza as ações de criação até acabar todos os elementos do array criado */
    const card = createCard(character); /* executa a funação de criar card */
    grid.appendChild(card); /* insere um novo elemento filho da grid. */
  });
}

const startTimer = () => {  /* realiza o inicio da contagem do tempo */

  this.loop = setInterval(() => { /* realiza o loop de contagem */
    const currentTime = +timer.innerHTML; /* cria a variável que irá so somar a contagem e passagem de tempo */
    timer.innerHTML = currentTime + 1; /* realiza a escrita na tela do tempo */
  }, 1000); /* a função é executada a cada 1000 milesegundos. */

}

window.onload = () => { /* chamada de uma função ao carregar a página. */
  spanJogador.innerHTML = localStorage.getItem('Jogador'); /* Guarda o nome no LocalStorage */
  startTimer(); /* inicia  a contagem do tempo */
  loadGame();/* chama o carregamento do jogo */
}