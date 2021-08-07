import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      criptoEmail: '',
      imgGravatar: '',
      asserts: 10,
    };

    this.emailCript = this.emailCript.bind(this);
    this.gravatar = this.gravatar.bind(this);
  }

  componentDidMount() {
    this.emailCript();
  }

  componentDidUpdate() {
    this.gravatar();
  }

  // criptografia do email para a api gravatar
  emailCript() {
    const { emailUser } = this.props;
    const stringEmail = md5(emailUser).toString();
    this.setState({
      criptoEmail: stringEmail,
    });
  }

  // função para pegar a imagem na api do gravatar
  async gravatar() {
    const { criptoEmail, asserts } = this.state;
    const { nameUser, playerScore } = this.props;
    const fetchGravatar = await fetch(`https://www.gravatar.com/avatar/${criptoEmail}`);
    this.setState({
      imgGravatar: fetchGravatar.url,
    });

    const player = {
      name: nameUser,
      assertions: asserts,
      score: playerScore,
      gravatarEmail: criptoEmail,
    };
    localStorage.setItem('state', JSON.stringify({ player }));

    localStorage.setItem('ranking', JSON.stringify([{
      name: nameUser,
      score: playerScore,
      picture: fetchGravatar.url,
    }]));
  }

  render() {
    const { imgGravatar } = this.state;
    const { nameUser, playerScore } = this.props;
    return (
      <div>
        <header>
          <img
            alt="imagem jogador"
            data-testid="header-profile-picture"
            src={ imgGravatar }
          />
          <p data-testid="header-player-name">{ nameUser }</p>
          <p data-testid="header-score">
            {`Pontuacao obtida: ${playerScore}`}
          </p>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  nameUser: state.user.name,
  emailUser: state.user.email,
  playerScore: state.score.score,
});

export default connect(mapStateToProps)(Header);

// proptypes do componente Header
Header.propTypes = {
  nameUser: PropTypes.string,
  emailUser: PropTypes.string,
}.isRequired;
