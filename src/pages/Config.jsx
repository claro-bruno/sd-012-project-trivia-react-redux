import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { setAmount } from '../redux/action';

class Config extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quantidade: 5,
    };

    this.setReduxQuantity = this.setReduxQuantity.bind(this);
    this.handlechange = this.handlechange.bind(this);
  }

  setReduxQuantity() {
    const { setQuantity } = this.props;
    const { quantidade } = this.state;
    setQuantity(quantidade);
  }

  handlechange(e) {
    const { value } = e.target;
    const min = 5;
    const max = 50;
    if (value >= min && value <= max) {
      this.setState({
        quantidade: value,
      });
    } else {
      this.setState({
        quantidade: min,
      });
    }
  }

  render() {
    return (
      <div>
        <h1 data-testid="settings-title">Configurações</h1>
        <label htmlFor="configQuestions">
          Escolha a quantidade de perguntas do jogo:
          {' '}
          <input
            type="number"
            name="quantidade"
            id="configQuestions"
            min="5"
            max="50"
            placeholder="5 - 50"
            onChange={ this.handlechange }
          />
        </label>
        <Link to="/">
          <button
            type="submit"
            data-testid="btn-play-again"
            onClick={ this.setReduxQuantity }
          >
            Inicio
          </button>
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setQuantity: (value) => dispatch(setAmount(value)),
});

Config.propTypes = {
  setQuantity: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Config);
