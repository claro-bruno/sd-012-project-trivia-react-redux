import React, { Component } from 'react';

export default class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ceil: 30,
      floor: 0,
    };
    this.setTimer = this.setTimer.bind(this);
    this.disableButtons = this.disableButtons.bind(this);
    // this.nextClick = this.nextClick.bind(this);
  }

  componentDidMount() {
    this.setTimer();
  }

  componentDidUpdate(_prevProps, prevState) {
    const { ceil } = prevState;
    if (!ceil) {
      this.setTimer();
    }
    this.disableButtons();
    // this.nextClick();
  }

  setTimer() {
    const timerSecond = 1000;
    const timerInterval = setInterval(() => {
      const { ceil, floor } = this.state;
      this.setState({
        ceil: ceil - 1,
      }, () => {
        if (ceil === floor) {
          clearInterval(timerInterval);
          this.setState({
            ceil: 30,
          });
        }
      });
    }, timerSecond);
  }

  //   nextClick() {
  //     const buttonNext = document.querySelector('#next-button');
  //     const timerSecond = 1000;
  //     const { ceil, floor } = this.state;
  //     if (ceil === floor) {
  //       setTimeout(() => buttonNext.click(), timerSecond);
  //     }
  //   }

  disableButtons() {
    const buttons = document.querySelectorAll('.answer-buttons');
    const { ceil, floor } = this.state;
    buttons.forEach((button) => {
      if (ceil === floor) {
        button.setAttribute('disabled', 'disabled');
      }
    });
  }

  render() {
    const { ceil, floor } = this.state;
    return (
      <div>
        <span>
          {ceil}
          <br />
          {ceil === floor ? 'Acabou o tempo' : null}
          {/* {this.nextClick()} */}
        </span>
      </div>
    );
  }
}
