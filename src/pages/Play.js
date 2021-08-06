import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Timer from '../components/Timer';
import { updateGlobalKey } from '../redux/actions/timer';

class Play extends React.Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
    this.anotherClick = this.anotherClick.bind(this);
  }

  onClick() {
    const { changeGlobal } = this.props;
    changeGlobal(true);
  }

  anotherClick() {
    const { changeGlobal } = this.props;
    changeGlobal(false);
  }

  render() {
    const { globalKey } = this.props;
    return (
      <div>
        <Header />
        { !globalKey ? <Timer /> : <div>hasdkf</div> }
        <button type="button" onClick={ this.onClick }>reposta</button>
        <button type="button" onClick={ this.anotherClick }>proximo</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  globalKey: state.questions.globalKey,
});

const mapDispatchToProps = (dispatch) => ({
  changeGlobal: (status) => dispatch(updateGlobalKey(status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Play);

Play.propTypes = {
  changeGlobal: PropTypes.func,
}.isRequired;
