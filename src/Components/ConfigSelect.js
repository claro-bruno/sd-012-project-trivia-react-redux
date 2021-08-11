import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateSelectedConfigs } from '../redux/actions';

class ConfigSelect extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { dispatchUpdateConfigs, id, label } = this.props;
    dispatchUpdateConfigs(target.value, id, label.toLowerCase());
  }

  render() {
    const { id, label, options, config } = this.props;
    return (
      <label htmlFor={ id }>
        {label}
        <select
          id={ id }
          value={ config[id].id }
          onChange={ this.handleChange }
        >
          {options.map(({ id: optionId, name: optionName }) => (
            <option
              value={ optionId }
              key={ `${optionName}${optionId}` }
            >
              {optionName}
            </option>
          ))}
        </select>
      </label>
    );
  }
}

const mapStateToProps = (state) => ({
  config: state.config,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchUpdateConfigs: (selected, configName, configsList) => dispatch(
    updateSelectedConfigs(selected, configName, configsList),
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(ConfigSelect);

ConfigSelect.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  config: PropTypes.shape().isRequired,
  dispatchUpdateConfigs: PropTypes.func.isRequired,
};
