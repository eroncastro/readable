import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { connect } from 'react-redux';

import { handleAddPost } from '../actions/posts';

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

const initialState = Object.freeze({
  author: '',
  title: '',
  category: '',
  content: ''
});

class NewPost extends React.Component {
  constructor(props) {
    super(props);

    this.state = initialState;

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    this.props.handleAddPost({
      id: Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36),
      author: this.state.author,
      title: this.state.title,
      category: this.state.category,
      body: this.state.content,
      timestamp: Date.now()
    })
    .then(() => this.setState(initialState));
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <h2>New Post</h2>
        <form className={classes.inputs} noValidate autoComplete="off">
          <TextField
            id="post-author"
            label="Name"
            className={classes.textField}
            margin="normal"
            value={this.state.author}
            onChange={e => this.setState({ author: e.target.value })}
          />

          <TextField
            id="post-title"
            label="Title"
            className={classes.textField}
            margin="normal"
            value={this.state.title}
            onChange={e => this.setState({ title: e.target.value })}
          />

          <FormControl className={classes.textField}>
            <InputLabel htmlFor="category">Category</InputLabel>
            <Select
              input={<Input name="category" id="category" />}
              value={this.state.category}
              onChange={e => this.setState({ category: e.target.value })}
              >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {
                this.props.categories.map((category, index) => (
                  <MenuItem value={category.name} key={index}>{category.name}</MenuItem>
                ))
              }
            </Select>
          </FormControl>

          <TextField
            id="post-body"
            label="What is on your mind?"
            multiline
            rows="10"
            className={classes.textField}
            margin="normal"
            variant="outlined"
            value={this.state.content}
            onChange={e => this.setState({ content: e.target.value })}
          />

          <div>
            <Button
              variant="contained"
              className={classes.button}
              onClick={this.handleSubmit}>
              Submit
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    categories: state.categories
  };
};

const mapDispatchToProps = { handleAddPost };

export default connect(
  mapStateToProps, mapDispatchToProps
)(withStyles(styles)(NewPost));
