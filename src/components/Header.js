import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { name, gravatar } = this.props;

    return (
      <header>
        <img src={ gravatar } alt="gravatar" data-testid="header-profile-picture" />
        <p data-testid="header-player-name">{`Jogador: ${name}`}</p>
        <p data-testid="header-score">Pontos: 0</p>
      </header>
    );
  }
}

const mapStateToProps = ({ playerReducer: { name, gravatar } }) => ({
  name,
  gravatar,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  name: PropTypes.string,
  gravatar: PropTypes.string,
}.isRequired;
