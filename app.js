const mensagem = document.querySelector("#mensagem-h1");

const reiniciarBtn = document.querySelector("#reiniciar-button");

const quadros = Array.from(document.querySelectorAll(".quadro"));

let espacos = [null, null, null, null, null, null, null, null, null];

const O = "😾";

const X = "🤖";

const VITORIA = 0;
const EMPATE = 1;
const NAO_ACABOU = -1;

let jogadorAtual = O;

let fimDeJogo = false;

// Função jogoAcabou():
// retorna 0 se o jogo acabou com vitoria,
// 1 se acabou com empate e -1 se o jogo nao acabou
function jogoAcabou(jogador) {
  // verifica linhas (0, 1, 2), (0, 3, 6) e (0, 4, 8)
  if (espacos[0] === jogador) {
    if (espacos[1] === jogador && espacos[2] === jogador) {
      return VITORIA;
    }
    if (espacos[3] === jogador && espacos[6] === jogador) {
      return VITORIA;
    }
    if (espacos[4] === jogador && espacos[8] === jogador) {
      return VITORIA;
    }
  }

  // verifica linhas (2, 5, 8) e (6, 7, 8)
  if (espacos[8] === jogador) {
    if (espacos[2] === jogador && espacos[5] === jogador) {
      return VITORIA;
    }
    if (espacos[6] === jogador && espacos[7] === jogador) {
      return VITORIA;
    }
  }

  //verifica linha (3, 4, 5), (1, 4, 7) e (2, 4, 6)
  if (espacos[4] === jogador) {
    if (espacos[3] === jogador && espacos[5] === jogador) {
      return VITORIA;
    }
    if (espacos[1] === jogador && espacos[7] === jogador) {
      return VITORIA;
    }
    if (espacos[2] === jogador && espacos[6] === jogador) {
      return VITORIA;
    }

    return NAO_ACABOU;
  }

  // verifica se o jogo acabou em empate
  // se todos os espacos estiverem preenchidos
  const espacosNulos = espacos.filter((esp) => esp === null);
  if (espacosNulos.length === 0) {
    return EMPATE;
  }
}

// Função que processa o clique em um quadro
function clicarNoQuadro(evento) {
  if (fimDeJogo) return;

  const id = evento.target.id;
  if (espacos[id] === null) {
    espacos[id] = jogadorAtual;
    quadros[id].innerHTML = jogadorAtual;

    const acabou = jogoAcabou(jogadorAtual);

    if (acabou === VITORIA) {
      fimDeJogo = true;
      mensagem.innerHTML = `O jogador ${jogadorAtual} ganhou!`;
    } else if (acabou === EMPATE) {
      fimDeJogo = true;
      mensagem.innerHTML = "Empate!";
    }

    // troca o jogador atual
    jogadorAtual = jogadorAtual === O ? X : O;
  }
}

// Adiciona o evento de clique em cada quadro
for (let quadro of quadros) {
  quadro.addEventListener("click", clicarNoQuadro);
}

// Função que reinicia o jogo
function reiniciarJogo() {
  fimDeJogo = false;
  jogadorAtual = O;
  mensagem.innerHTML = `Vamos Jogar!`;
  espacos = [null, null, null, null, null, null, null, null, null];
  quadros.forEach((quadro) => (quadro.innerText = ""));
}

// Adiciona o evento de clique no botão de reiniciar
reiniciarBtn.addEventListener("click", reiniciarJogo);
