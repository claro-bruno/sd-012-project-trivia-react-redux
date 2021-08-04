import React from 'react';
// import PropTypes from 'prop-types';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      score: 0,
      picture: '',
    };
  }

  render() {
    const { state: { name, score, picture } } = this;
    return (
      <header>
        <img data-testid="header-profile-picture" src={ picture } alt="Player avatar" />
        <h2 data-testid="header-player-name">{ name }</h2>
        <aside data-testid="header-score">{ score }</aside>
      </header>
    );
  }
}

// const {
//   string,
//   number,
// } = PropTypes;

// Header.propTypes = {
//   name: string.isRequired,
//   score: number.isRequired,
//   picture: string.isRequired,
// };

export default Header;
