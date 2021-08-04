import React from 'react';
import { string } from 'prop-types';

class Span extends React.Component {
  render() {
    const { textContent, testId } = this.props;
    console.log(textContent);
    return (<span data-testId={ testId }>{textContent}</span>);
  }
}

Span.propTypes = {
  textContent: string.isRequired,
  testId: string.isRequired,
};

export default Span;
