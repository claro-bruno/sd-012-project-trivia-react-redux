import React from 'react';
// import PropTypes from 'prop-types';
import { getQuestions } from '../services/api';
import { Header, Question } from '../components';
// import './PAGE.css';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: null,
      isLoading: true,
    };
    // this.onChangeHandler = this.onChangeHandler.bind(this);
    // this.onClickHandler = this.onClickHandler.bind(this);
  }

  componentDidMount() {
    getQuestions()
      .then((questions) => this.setState({
        questions,
        isLoading: false,
      }));
  }

  onChangeHandler({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  onClickHandler() {
    // const { dispatchAction } = this.props;
    // dispatchAction(this.state);
  }

  render() {
    // const {  } = this.props;
    const { isLoading, questions } = this.state;
    // console.log(questions);

    return (
      <div>
        <Header />
        <p>Game</p>
        { isLoading ? <p>Loading...</p> : <Question question={ questions[0] } /> }
      </div>
    );
  }
}

// const mapDispatchToProps = (dispatch) => (
//   {
//     // dispatchAction: (payload) => dispatch(ACTION(payload)),
//     // dispatchAsyncAction: (payload) => dispatch(ASYNCACTION(payload)),
//   }
// );
// const mapStateToProps = (state) => (
//   {
//     STOREINFO: state.reducer,
//   }
// );

export default Game;
// export default connect(mapStateToProps, mapDispatchToProps)(Game);

// PAGE.propTypes = {
//   var: PropTypes.type.isRequired,
//   arr: PropTypes.arrayOf(PropTypes.number).isRequired,

//   obj: PropTypes.shape({
//     var: PropTypes.type.isRequired,
//     }).isRequired,

//   optionalUnion: PropTypes.oneOfType([
//     PropTypes.string,
//     PropTypes.number,
//   ]).isRequired,
// };