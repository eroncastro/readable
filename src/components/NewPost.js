import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  inputs: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    alignItems: 'center'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 500,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  button: {
    margin: theme.spacing.unit
  }
});

class NewPost extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <h2>New Post</h2>
        <form className={classes.inputs} noValidate autoComplete="off">
          <TextField
            id="standard-name"
            label="Name"
            className={classes.textField}
            margin="normal"
          />

          <TextField
            id="standard-title"
            label="Title"
            className={classes.textField}
            margin="normal"
          />

          <FormControl className={classes.textField}>
            <InputLabel htmlFor="category">Category</InputLabel>
            <Select input={<Input name="category" id="category" />} >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {
                (this.props.orderBy || []).map(orderBy => (
                  <MenuItem value={orderBy}>{orderBy}</MenuItem>
                ))
              }
            </Select>
          </FormControl>

          <TextField
            id="outlined-multiline-static"
            label="What is on your mind?"
            multiline
            rows="10"
            className={classes.textField}
            margin="normal"
            variant="outlined"
          />

          <div>
            <Button variant="contained" className={classes.button}>
              Submit
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

NewPost.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NewPost);
