import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveConfigs } from '../redux/actions/settingsActions';

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
      <fieldset>
        <h1 data-testid="settings-title">Settings</h1>
        <form>
          <label htmlFor="category-id">
            Category:
            <select id="category-id" name="category" onChange={ this.handleChange }>
              <option value="">Any Category</option>
              <option value="category=18">Science: Computers</option>
              <option value="category=21">Sports</option>
              <option value="category=15">Entertaiment: Video Games</option>
            </select>
          </label>
          <br />
          <label htmlFor="difficulty-id">
            Difficulty:
            <select id="difficulty-id" name="difficulty" onChange={ this.handleChange }>
              <option value="">Any Difficulty</option>
              <option value="difficulty=easy">Easy</option>
              <option value="difficulty=medium">Medium</option>
              <option value="difficulty=hard">Hard</option>
            </select>
          </label>
          <br />
          <label htmlFor="type-id">
            Type:
            <select id="type-id" name="type" onChange={ this.handleChange }>
              <option value="">Any Type</option>
              <option value="type=multiple">Multiple Choice</option>
              <option value="type=boolean">True/False</option>
            </select>
          </label>
          <br />
          <button type="button" onClick={ this.handleClick }>Salvar</button>
        </form>
      </fieldset>
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
