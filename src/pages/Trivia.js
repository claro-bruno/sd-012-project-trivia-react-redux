import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Trivia extends Component {
  constructor() {
    super();

    this.state = {
      criptoEmail: '',
      imgGravatar: '',
      points: 0,
      nameLogin: '',
      asserts: 0,
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
    const { emailUser, nameUser } = this.props;
    const stringEmail = md5(emailUser).toString();
    // console.log(stringEmail);
    this.setState({
      criptoEmail: stringEmail,
      nameLogin: nameUser,
    });
  }

  // função para pegar a imagem na api do gravatar
  async gravatar() {
    const { criptoEmail, points, nameLogin, asserts } = this.state;
    // console.log(criptoEmail);
    const fetchGravatar = await fetch(`https://www.gravatar.com/avatar/${criptoEmail}`);
    // console.log(fetchGravatar);
    this.setState({
      imgGravatar: fetchGravatar.url,
    });
    localStorage.setItem('player', JSON.stringify({
      gravatarEmail: criptoEmail,
      score: points,
      name: nameLogin,
      assertions: asserts,
    }));
  }

  render() {
    const { imgGravatar, points } = this.state;
    const { nameUser } = this.props;
    return (
      <div>
        <header>
          <img
            alt="imagem jogador"
            data-testid="header-profile-picture"
            src={ imgGravatar }
          />
          <p data-testid="header-player-name">{ nameUser }</p>
          <p data-testid="header-score">{ points }</p>
        </header>
      </div>);
  }
}

const mapStateToProps = (state) => ({
  nameUser: state.user.name,
  emailUser: state.user.email,
});

export default connect(mapStateToProps)(Trivia);

Trivia.propTypes = {
  nameUser: PropTypes.string,
  emailUser: PropTypes.string,
}.isRequired;
