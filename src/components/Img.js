import React from 'react';
import { string } from 'prop-types';

class Img extends React.Component {
  render() {
    const { srcImg, descriptionImg, testId, logoAvatar } = this.props;
    return (<img
      className={ logoAvatar }
      src={ srcImg }
      alt={ descriptionImg }
      data-testid={ testId }
    />);
  }
}

Img.propTypes = {
  srcImg: string.isRequired,
  descriptionImg: string.isRequired,
  testId: string.isRequired,
  logoAvatar: string.isRequired,
};

export default Img;
