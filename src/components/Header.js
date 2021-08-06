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
      points: 0,
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
    const { emailUser } = this.props;
    const stringEmail = md5(emailUser).toString();
    // console.log(stringEmail);
    this.setState({
      criptoEmail: stringEmail,
    });
  }

  // função para pegar a imagem na api do gravatar
  async gravatar() {
    const { criptoEmail, points, asserts } = this.state;
    const { nameUser } = this.props;
    // console.log(criptoEmail);
    const fetchGravatar = await fetch(`https://www.gravatar.com/avatar/${criptoEmail}`);
    // console.log(fetchGravatar);
    this.setState({
      imgGravatar: fetchGravatar.url,
    });

    localStorage.setItem('player', JSON.stringify({
      gravatarEmail: criptoEmail,
      score: points,
      name: nameUser,
      assertions: asserts,
    }));
    localStorage.setItem('ranking', JSON.stringify([{
      name: nameUser,
      score: points,
      picture: fetchGravatar.url,
    }]));
  }

  render() {
    const { points, imgGravatar } = this.state;
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
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  nameUser: state.user.name,
  emailUser: state.user.email,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  nameUser: PropTypes.string,
  emailUser: PropTypes.string,
}.isRequired;
