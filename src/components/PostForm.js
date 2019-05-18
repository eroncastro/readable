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
import { Link, Redirect } from 'react-router-dom';

import { handleAddPost, handleUpdatePost } from '../actions/posts';
import { generateId } from '../utils/helpers';

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

class PostForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = this._initialState(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  _initialState(props) {
    if (props.post) return { post: props.post };

    return {
      post: {
        id: generateId(),
        author: '',
        title: '',
        category: '',
        body: '',
        timestamp: Date.now(),
        voteScore: 0
      }
    };
  }

  handleSubmit() {
    this.handleSubmitAction()
      .then(() => this.setState({ redirect: true }));
  }

  handleSubmitAction() {
    return this.routeInfo === 'new'
      ? this.props.handleAddPost(this.state.post)
      : this.props.handleUpdatePost(this.state.post)
  }

  updatePost(data) {
    this.setState(prevState => {
      return { post: Object.assign({}, prevState.post, data) };
    });
  }

  get routeInfo() {
    return this.props.match.path.endsWith('new') ? 'new' : 'edit';
  }

  get redirectUrl() {
    return this.routeInfo === 'new'
      ? '/'
      : `/posts/${this.props.match.params.postId}/comments`;
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.redirectUrl} />
    }

    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <h2>New Post</h2>

        <form className={classes.inputs} noValidate autoComplete="off">
          <TextField
            disabled={this.routeInfo === 'edit'}
            id="post-author"
            label="Name"
            className={classes.textField}
            margin="normal"
            value={this.state.post.author}
            onChange={e => this.updatePost({ author: e.target.value })}
          />

          <TextField
            id="post-title"
            label="Title"
            className={classes.textField}
            margin="normal"
            value={this.state.post.title}
            onChange={e => this.updatePost({ title: e.target.value })}
          />

          <FormControl
            className={classes.textField}
            disabled={this.routeInfo === 'edit'}>
            <InputLabel htmlFor="category">Category</InputLabel>
            <Select
              input={<Input name="category" id="category" />}
              value={this.state.post.category}
              onChange={e => this.updatePost({ category: e.target.value })}
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
            value={this.state.post.body}
            onChange={e => this.updatePost({ body: e.target.value })}
          />
          <div>
            <Button
              variant="contained"
              className={classes.button}
              style={{ textDecoration: 'none' }}
              component={Link}
              to={this.redirectUrl}>
              Go back
            </Button>
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

const mapStateToProps = (state, props) => {
  return {
    post: state.posts.find(post => post.id === props.match.params.postId),
    categories: state.categories
  };
};

const mapDispatchToProps = { handleAddPost, handleUpdatePost };

export default connect(
  mapStateToProps, mapDispatchToProps
)(withStyles(styles)(PostForm));
