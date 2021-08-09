import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import settings from '../data';
import { changeSettings } from '../redux/actions';

class ConfigPage extends Component {
  constructor() {
    super();

    this.state = {
      category: '',
      difficulty: '',
      type: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target: { value, name } }) {
    this.setState({ [name]: value });
  }

  handleClick() {
    const { saveSettings } = this.props;
    saveSettings(this.state);
  }

  render() {
    const { categories, difficulty, type } = settings;

    return (
      <div>
        <h1 data-testid="settings-title">Settings</h1>
        <form>
          <select name="category" onChange={ this.handleChange }>
            {categories.map(({ name, value }) => (
              <option value={ value } key={ value }>{name}</option>
            ))}
          </select>
          <select name="difficulty" onChange={ this.handleChange }>
            {difficulty.map(({ name, value }) => (
              <option value={ value } key={ value }>{name}</option>
            ))}
          </select>
          <select name="type" onChange={ this.handleChange }>
            {type.map(({ name, value }) => (
              <option value={ value } key={ value }>{name}</option>
            ))}
          </select>
          <Link to="/">
            <button
              type="button"
              onClick={ this.handleClick }
            >
              Confirmar
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

ConfigPage.propTypes = {
  saveSettings: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  saveSettings: (settingsConfig) => dispatch(changeSettings(settingsConfig)),
});

export default connect(null, mapDispatchToProps)(ConfigPage);
