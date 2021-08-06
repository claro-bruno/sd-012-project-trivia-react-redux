import React from 'react';
import { connect } from 'react-redux';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 30,
    };
    this.timer = this.timer.bind(this);
  }

  componentDidMount() {
    this.timer();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  timer() {
    const oneSecond = 1000;
    this.interval = setInterval(() => {
      this.setState((prevState) => ({ time: prevState.time - 1 }));
    }, oneSecond);
  }

  render() {
    const { time } = this.state;
    console.log(time);
    return (
      <div>{ time }</div>
    );
  }
}

const mapStateToProps = (state) => ({
  globalKey: state.timer.globalKey,
});

export default connect(mapStateToProps, null)(Timer);
