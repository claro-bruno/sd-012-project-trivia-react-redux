import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { timerDecrement, updateGlobalKey } from '../redux/actions/questions';

function smallRectangles(x, y, transform) {
  return (
    <rect
      transform={ transform }
      x={ x }
      y={ y }
      width="4.5127"
      height="2.2738"
      fill="#7c7c7c"
      strokeOpacity=".99144"
      strokeWidth=".5"
      stroke="#000"
    />
  );
}

function circles(r, fill) {
  return (
    <circle
      cx="29.943"
      cy="129.66"
      r={ r }
      fill={ fill }
      strokeOpacity=".99144"
      strokeWidth=".5"
      stroke="#000"
    />
  );
}

function chronometer(time) {
  return (
    <svg width="100" height="100" viewBox="0 0 38.758 44.092">
      <g transform="translate(-10.564 -104.95)">
        { smallRectangles('27.647', '108.4', 'none') }
        { smallRectangles('99.661', '63.289', 'rotate(37.503)') }
        { smallRectangles('-51.557', '102.25', 'rotate(-34.926)')}
        <rect
          x="25.168"
          y="105.2"
          width="9.2531"
          height="3.1867"
          fill="#f00"
          strokeOpacity=".99144"
          strokeWidth=".5"
          stroke="#000"
        />
      </g>
      <g transform="translate(-10.564 -104.95)">
        { circles('19.129', '#7c7c7c') }
        { circles('16.811', '#fff') }
        <text
          transform="scale(.96727 1.0338)"
          x="31"
          y="126.5"
          dominantBaseline="middle"
          textAnchor="middle"
          fill="#000000"
          fontFamily="sans-serif"
          fontSize="14.759px"
          lineHeight="1.25"
          strokeWidth=".36898"
        >
          { time }
        </text>
      </g>
    </svg>
  );
}

class Timer extends React.Component {
  constructor(props) {
    super(props);

    this.timer = this.timer.bind(this);
  }

  componentDidMount() {
    this.timer();
  }

  componentDidUpdate(prevProps) {
    const { changeGlobal } = this.props;
    if (prevProps.time <= 0) {
      clearInterval(this.interval);
      changeGlobal(true);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  timer() {
    const oneSecond = 1000;
    const { setTime } = this.props;
    this.interval = setInterval(() => {
      setTime();
    }, oneSecond);
  }

  render() {
    const { time } = this.props;
    return (
      <div className="timer">{ chronometer(time) }</div>
    );
  }
}

const mapStateToProps = (state) => ({
  globalKey: state.questions.globalKey,
  time: state.questions.time,
});

const mapDispatchToProps = (dispatch) => ({
  setTime: () => dispatch(timerDecrement()),
  changeGlobal: (status) => dispatch(updateGlobalKey(status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);

Timer.propTypes = {
  time: PropTypes.number,
  setTime: PropTypes.func,
}.isRequired;
