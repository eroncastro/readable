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
  posts() {
    const { categoryId } = this.props.match.params;

    return categoryId
      ? this.props.posts.filter(post => post.category === categoryId)
      : this.props.posts;
  }

  render() {
    const { classes } = this.props;

    return (
      <main className={classes.content}>
        <SelectControls
          selectedCategory={this.props.match.params.categoryId}
        />
        {this.posts().map((post, key) => <Post key={key} {...post} />)}
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
    posts: state.posts
  };
};

export default connect(mapStateToProps)(withStyles(styles)(PostsList));
