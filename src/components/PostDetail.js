import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Comment from './Comment';
import Post from './Post';

const styles = theme => ({
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  }
});

class PostDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false
    };
  }

  sort(a, b) {
    return b.timestamp - a.timestamp;
  }

  render() {
    if (!this.props.post) {
      return <Redirect to="/404" />;
    }
    const { classes } = this.props;

    return (
      <main className={classes.content}>
        <h2>Post</h2>
        <Post
          post={this.props.post}
          comments={this.props.comments.length}
          goBackRoute={`/${this.props.post.category}/${this.props.post.id}/edit`}
          onDelete={() => this.props.history.push('/')}
        />

        <h3>Comments</h3>
        {this.props.comments.sort(this.sort).map((comment, index) => {
          return (
            <Comment
              comment={comment}
              key={index}
              category={this.props.post.category} />
          );
        })}

        <Link to={`/${this.props.post.category}/${this.props.post.id}/new`}>
          <Fab color="primary" aria-label="Add" className={classes.fab}>
            <AddIcon />
          </Fab>
        </Link>
      </main>
    );
  }
};

const mapStateToProps = (state, props) => {
  return {
    post: state.posts.find(post => post.id === props.match.params.postId),
    comments: state.comments.filter(comment => {
      return comment.parentId === props.match.params.postId;
    })
  };
};

export default connect(mapStateToProps)(withStyles(styles)(PostDetail));
