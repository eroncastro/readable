import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Post from './Post';
import SelectControls from './SelectControls';

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

class PostsList extends React.Component {
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
        <SelectControls
          selectedCategory={this.props.match.params.categoryId}
          onOrderChange={orderBy => this.setState({ orderBy })}
        />
        {this.posts().map((post, key) => {
          return (
            <Post
              key={key}
              post={post}
              comments={this.props.comments[post.id] ? this.props.comments[post.id] : 0}
            />
          );
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

const mapStateToProps = state => {
  return {
    posts: state.posts,
    comments: state.comments.reduce((prev, cur) => {
      const inc = prev[cur.parentId] ? prev[cur.parentId] + 1 : 1;
      return {...prev, ...{ [cur.parentId]: inc } };
    }, {})
  };
};

export default connect(mapStateToProps)(withStyles(styles)(PostsList));
