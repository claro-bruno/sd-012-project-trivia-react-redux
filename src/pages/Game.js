import React from 'react';
// import Header from '../components/Header';
import { connect } from 'react-redux';
import { requestTrivia } from '../redux/action';

class Game extends React.Component {
  componentDidMount() {
    const { requestTrivia } = this.props;
    requestTrivia();
  }

  render() {
    const { loading } = this.props;
    return (
      <main>
        {/* <Header /> */}
        { (loading) ? <h1>Loading</h1> : <p>Perguntas</p> }
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  requestTrivia: () => dispatch(requestTrivia()), 
});

const mapStateToProps = (state) => ({
  loading: state.game.loading,
  questions: state.game.questions,
});

export default connect(null, mapDispatchToProps)(Game);
