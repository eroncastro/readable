import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

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

class PostsDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      orderBy: 'timestamp'
    };

    this.posts = this.posts.bind(this);
    this._sort = this._sort.bind(this);
  }

  posts() {
    const { categoryId } = this.props.match.params;

    const posts = categoryId
      ? this.props.posts.filter(post => post.category === categoryId)
      : this.props.posts;

    return posts.sort(this._sort);
  }

  _sort(a, b) {
    if (a[this.state.orderBy] > b[this.state.orderBy]) return -1;

    return a[this.state.orderBy] < b[this.state.orderBy] ? 1 : 0;
  }

  render() {
    const { classes } = this.props;

    return (
      <main className={classes.content}>
        <h2>Post</h2>
        <Post {...this.props.post} comments={this.props.comments.length} />

        <h3>Comments</h3>
        {this.props.comments.map((comment, index) => {
          return <Comment {...comment} key={index} />
        })}

        <Link to="/posts/new">
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

export default connect(mapStateToProps)(withStyles(styles)(PostsDetail));
