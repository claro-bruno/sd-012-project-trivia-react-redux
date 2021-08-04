import React from 'react';
import { string } from 'prop-types';

class Img extends React.Component {
  render() {
    const { srcImg, descriptionImg, testId } = this.props;
    return (<img src={ srcImg } alt={ descriptionImg } data-testid={ testId } />);
  }
}

Img.propTypes = {
  srcImg: string.isRequired,
  descriptionImg: string.isRequired,
  testId: string.isRequired,
};

export default Img;
