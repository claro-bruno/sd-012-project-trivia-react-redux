import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';

class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    const { results } = this.props;
    if (results.length === 0) return <h1>Loading2</h1>;
    return (
      <div>{results[0].type}</div>
    );
  }
}

const mapStateToProps = (state) => ({
  results: state.questions.results,
});

Questions.propTypes = {
  results: PropTypes.arrayOf(Object).isRequired,
};

export default connect(mapStateToProps)(Questions);
