import React from 'react';
import md5 from 'crypto-js/md5';
import arquivoTesteRanking from '../arquivoTesteRanking';

class Ranking extends React.Component {
  render() {
    const TESTEsort = arquivoTesteRanking.sort((a, b) => b.score - a.score);
    console.log(TESTEsort);

    return (
      <>
        <h2>Ranking</h2>
        <ol>
          {
            TESTEsort.map((posicao, index) => {
              const { name, assertions, score, gravatarEmail } = posicao;
              const profile = md5(gravatarEmail).toString();
              const SRC = `https://www.gravatar.com/avatar/${profile}`;

              return (
                <li key={ `${score}.${name}.${score}` }>
                  <img
                    src={ SRC }
                    alt={ `Player avatar ${index}` }
                  />
                  <h3
                    data-testid={ `player-name-${index}` }
                  >
                    { `NOME: ${name}` }
                  </h3>
                  <h4>
                    { `ACERTOS: ${assertions}` }
                  </h4>
                  <h4
                    data-testid={ `player-score-${index}` }
                  >
                    { `PONTUAÇÃO: ${score}` }
                  </h4>
                </li>
              );
            })
          }
        </ol>
      </>
    );
  }
}

export default Ranking;
