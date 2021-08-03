import React from 'react';
import { connect } from 'react-redux';
import fetchGravatar from '../redux/actions';

class Header extends React.Component {
  componentDidMount() {
  }

  render() {
    return (
      <header>
        <img src="" alt="" data-testid="header-profile-picture" />
        <p data-testid="header-player-name">0</p>
        <p data-testid="header-score">0</p>
      </header>

    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  pushFetch: (state) => dispatch(fetchGravatar(state)),
});

const mapStateToProps = (state) => ({
  email: state.reducer.email,
  playerName: state.reducer.playerName,
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
