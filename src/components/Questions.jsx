import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { connect } from 'react-redux';

class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    const { results } = this.props;
    if (!results) return <h1>Loading2</h1>;
    return (
      <div>{results[0].type}</div>
    );
  }
}

const mapStateToProps = (state) => ({
  results: state.questions.results,
});

// const mapStateToProps = (state) => ({
//   results: state.questions.results,
// });

export default connect(mapStateToProps)(Questions);
