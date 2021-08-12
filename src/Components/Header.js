import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { AppBar, Avatar, Toolbar, Typography, withStyles } from '@material-ui/core';
import { getGravatarURL } from '../data/helpers';

const spacingSmall = 3;
const spacingLarge = 7;

const styles = (theme) => ({
  rootAvatar: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(spacingSmall),
    height: theme.spacing(spacingSmall),
  },
  large: {
    width: theme.spacing(spacingLarge),
    height: theme.spacing(spacingLarge),
  },
  rootAppBar: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  toolBar: {
    backgroundColor: theme.palette.info.main,
  },
});

class Header extends Component {
  render() {
    const { email, name, score, classes } = this.props;
    return (
      <div className={ classes.rootAppBar }>
        <AppBar position="static">
          <Toolbar className={ classes.toolBar }>
            <Typography variant="h6" className={ classes.title }>
              {name || 'Anonimous'}
            </Typography>
            <Typography variant="h6" className={ classes.title }>
              {`Score: ${score}`}
            </Typography>
            <div className={ classes.rootAvatar }>
              <Avatar
                alt={ email }
                src={ getGravatarURL() }
                className={ classes.large }
              />
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.user.name,
  email: state.user.email,
  score: state.user.score,

});

export default connect(mapStateToProps)(
  withStyles(styles, { withTheme: false })(Header),
);

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.shape().isRequired,
  classes: PropTypes.shape({
    rootAppBar: PropTypes.string.isRequired,
    toolBar: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    rootAvatar: PropTypes.string.isRequired,
    large: PropTypes.string.isRequired,
  }).isRequired,
};
