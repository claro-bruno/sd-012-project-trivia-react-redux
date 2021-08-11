import React, { Component } from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import fetchGravatarImg from '../helpers/helper';
import { userHashEmail } from '../redux/actions';

class UserProfile extends Component {
  constructor() {
    super();

    this.getHashTag = this.getHashTag.bind(this);
  }

  componentDidMount() {
    this.getHashTag();
  }

  async getHashTag() {
    const { myUserState, sendHashEmail } = this.props;
    const hashEmail = md5(myUserState.email);
    const fetchImg = await fetchGravatarImg(hashEmail);
    sendHashEmail(fetchImg);
  }

  render() {
    const { myUserState } = this.props;
    return (
      <section className="header-player">
        <img
          className="player-img"
          data-testid="header-profile-picture"
          src={ myUserState.hash }
          alt={ `${myUserState.name}` }
        />
        <div className="player-score">
          <span
            className="header-name"
            data-testid="header-player-name"
          >
            { myUserState.name }
          </span>
          <span
            className="header-score"
            data-testid="header-score"
          >
            { `Placar: ${myUserState.score}` }
          </span>
        </div>
      </section>
    );
  }
}

UserProfile.propTypes = {
  myUserState: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
  sendHashEmail: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  sendHashEmail: (email) => dispatch(userHashEmail(email)),
});

const mapStateToProps = (state) => ({
  myUserState: state.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
