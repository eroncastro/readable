import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Navbar from './components/Navbar';
import Post from './components/Post';
import NewPost from './components/NewPost';
import SelectControls from './components/SelectControls';

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
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
};

function ButtonAppBar(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Navbar title="Readable" />
      <NewPost />
      {/* <PostDetail /> */}
      {/* <main className={classes.content}>
        <SelectControls />
        <br />
        <Post />
        <br />
        <Post />
        <br />
        <Post />
        <br />
        <Post />
        <br />
        <Post />
      </main> */}
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);
