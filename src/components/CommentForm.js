import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import { handleAddComment, handleUpdateComment } from '../actions/comments';
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
  button: {
    margin: theme.spacing.unit
  }
});

const blankComment = parentId => ({
  id: generateId(),
  author: '',
  body: '',
  parentId
});

class CommentForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = this._initialState(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  _initialState(props) {
    return {
      comment: props.comment ? props.comment : blankComment(props.post.id)
    };
  }

  handleSubmit() {
    this.handleSubmitAction()
      .then(() => this.setState({ redirect: true }));
  }

  handleSubmitAction() {
    const comment = Object.assign(
      {},
      this.state.comment,
      { timestamp: Date.now() }
    );

    return this.routeInfo === 'new'
      ? this.props.handleAddComment(comment)
      : this.props.handleUpdateComment(comment);
  }

  updateComment(data) {
    this.setState(prevState => {
      return { comment: Object.assign({}, prevState.comment, data) };
    });
  }

  get title() {
    return `${this.routeInfo === 'new' ? 'New' : 'Edit'} Comment`;
  }

  get routeInfo() {
    return this.props.match.path.endsWith('new') ? 'new' : 'edit';
  }

  get redirectUrl() {
    return `/posts/${this.props.match.params.postId}/comments`;
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.redirectUrl} />
    }

    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <h2>{this.title}</h2>

        <form className={classes.inputs} noValidate autoComplete="off">
          <TextField
            disabled={this.routeInfo === 'edit'}
            id="post-author"
            label="Name"
            className={classes.textField}
            margin="normal"
            value={this.state.comment.author}
            onChange={e => this.updateComment({ author: e.target.value })}
          />

          <TextField
            id="post-body"
            label="What is on your mind?"
            multiline
            rows="10"
            className={classes.textField}
            margin="normal"
            variant="outlined"
            value={this.state.comment.body}
            onChange={e => this.updateComment({ body: e.target.value })}
          />
          <div>
            <Button
              variant="contained"
              className={classes.button}
              style={{ textDecoration: 'none' }}
              component={Link}
              to={`/posts/${this.props.match.params.postId}/comments`}>
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
    comment: state.comments.find(comment => {
      return comment.id === props.match.params.commentId;
    })
  };
};

const mapDispatchToProps = { handleAddComment, handleUpdateComment };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CommentForm));
