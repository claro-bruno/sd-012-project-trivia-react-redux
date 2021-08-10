import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { fetchAPI } from '../redux/actions';
import Question from '../components/Question';
import { setNewPlayer } from '../utils/player';

class GamePage extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    const { API, diff } = this.props;
    API(diff).then(() => this.setState({ loading: false }));
  }

  render() {
    console.log(this.props);
    const { loading } = this.state;
    setNewPlayer(this.props);
    return (
      <>
        <Header />
        { loading ? <h1>Loading...</h1> : <Question /> }
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  diff: state.gameReducer.difficulty,
  name: state.userReducer.name,
  email: state.userReducer.email,
});

const mapDispatchToProps = (dispatch) => ({
  API: (diff) => dispatch(fetchAPI(diff)),
});

GamePage.propTypes = {
  API: PropTypes.func,
  diff: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
