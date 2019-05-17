import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import { handleAddComment } from '../actions/comments';
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

const initialState = Object.freeze({
  author: '',
  title: '',
  category: '',
  content: '',
  redirect: false
});

class CommentForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = initialState;

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    this.props.handleAddComment({
      id: generateId(),
      author: this.state.author,
      body: this.state.content,
      parentId: this.props.match.params.postId,
      timestamp: Date.now()
    })
    .then(() => {
      this.setState(Object.assign({}, initialState, { redirect: true }));
    });
  }

  render() {
    const { classes } = this.props;

    if (this.state.redirect) {
      return <Redirect to={`/posts/${this.props.match.params.postId}/comments`} />
    }

    return (
      <div className={classes.container}>
        <h2>New Comment</h2>

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

const mapDispatchToProps = { handleAddComment };

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(CommentForm));
