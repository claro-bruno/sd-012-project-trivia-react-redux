import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { saveConfigs } from '../redux/actions/settingsActions';
import './styles/settings.css';

class Settings extends React.Component {
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

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  handleClick() {
    const { saveSettings } = this.props;
    saveSettings(this.state);
  }

  render() {
    return (
      <div className="settings-content">
        <fieldset className="settings-field">
          <Link className="link" to="/">
            <i className="bi bi-house-fill" />
            {' Return'}
          </Link>
          <h1 data-testid="settings-title" className="settings-title">Settings</h1>
          <label htmlFor="category-id">
            Category:
            <select name="category" onChange={ this.handleChange }>
              <option value="">Any Category</option>
              <option value="category=18">Science: Computers</option>
              <option value="category=21">Sports</option>
              <option value="category=15">Entertaiment: Video Games</option>
            </select>
          </label>
          <br />
          <label htmlFor="difficulty-id">
            Difficulty:
            <select
              className="difficulty-id"
              name="difficulty"
              onChange={ this.handleChange }
            >
              <option value="">Any Difficulty</option>
              <option value="difficulty=easy">Easy</option>
              <option value="difficulty=medium">Medium</option>
              <option value="difficulty=hard">Hard</option>
            </select>
          </label>
          <br />
          <label htmlFor="type-id">
            Type:
            <select className="type-id" name="type" onChange={ this.handleChange }>
              <option value="">Any Type</option>
              <option value="type=multiple">Multiple Choice</option>
              <option value="type=boolean">True/False</option>
            </select>
          </label>
          <br />
          <button type="button" onClick={ this.handleClick }>Salvar</button>
        </fieldset>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveSettings: (state) => dispatch(saveConfigs(state)),
});

Settings.propTypes = {
  saveSettings: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Settings);
