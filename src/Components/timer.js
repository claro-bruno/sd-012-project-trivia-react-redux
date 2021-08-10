import React from 'react';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: 30,
    };
    this.changeCurrentTime = this.changeCurrentTime.bind(this);
    this.disableBtn = this.disableBtn.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  componentDidMount() {
    this.changeCurrentTime();
  }

  handleUpdate() {
    this.setState({ currentTime: 30 });
    this.changeCurrentTime();
  }

  changeCurrentTime() {
    const updateTime = 1000;
    const limitTime = 30000;

    setInterval(() => {
      const { currentTime } = this.state;
      if (currentTime > 0) this.setState({ currentTime: currentTime - 1 });
    }, updateTime);

    setTimeout(() => {
      this.disableBtn();
    }, limitTime);
  }

  disableBtn() {
    const answerBtn = document.querySelectorAll('.answer-btn');
    answerBtn.forEach((button) => {
      button.setAttribute('disabled', 'disabled');
    });
  }

  render() {
    const { currentTime } = this.state;
    return (
      <div>
        { currentTime }
      </div>
    );
  }
}

export default Timer;
