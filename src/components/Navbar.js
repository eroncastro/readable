import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  }
};

class Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };

    this.handleToggle = this.handleToggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleToggle() {
    this.setState(state => ({ open: !this.state.open }));
  }

  handleClose(event) {
    if (this.anchorEl.contains(event.target)) return;

    this.setState({ open: false });
  }

  render() {
    const { classes } = this.props;

    return (
      <AppBar position="static">
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
            buttonRef={node => {
              this.anchorEl = node;
            }}
            aria-owns={this.state.open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={this.handleToggle}>
            <MenuIcon />
          </IconButton>

          <Popper open={this.state.open} anchorEl={this.anchorEl} transition disablePortal>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="menu-list-grow"
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={this.handleClose}>
                    <MenuList onClick={this.handleClose}>
                      <MenuItem component={Link} to="/">Home</MenuItem>
                      <MenuItem component={Link} to="/posts/new">New Post</MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>

          <Typography variant="h6" color="inherit" className={classes.grow}>
            {this.props.title}
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles)(Navbar);
