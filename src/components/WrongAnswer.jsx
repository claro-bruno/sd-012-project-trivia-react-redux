import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchToken } from '../redux/actions/index';

class WrongAnswer extends Component {
  componentDidMount() {
    const { recivedGameData } = this.props;
    recivedGameData();
  }

  render() {
    const { array } = this.props;
    return (
      <div>
        {
          array && array.map((value, index) => (
            <button
              data-testid={ `wrong-answer-${index}` }
              type="button"
              key={ index }
            >
              {value}
            </button>
          ))
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  gameData: state.requestGameAPI.gameData,
});
const mapDispatchToProps = (dispatch) => ({
  recivedGameData: (state) => dispatch(fetchToken(state)),
});
export default connect(mapStateToProps, mapDispatchToProps)(WrongAnswer);
WrongAnswer.defaultProps = {
  gameData: {},
};
WrongAnswer.propTypes = ({
  gameData: PropTypes.objectOf(PropTypes.object),
  recivedGameData: PropTypes.func,
}).isRequired;
