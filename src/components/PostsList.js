import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

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

function PostsList(props) {
  const { classes, posts } = props;

  return (
    <main className={classes.content}>
      <SelectControls />
      {Array(10).fill(1).map((post, key) => <Post key={key} />)}
      <Link to="/posts/new">
        <Fab color="primary" aria-label="Add" className={classes.fab}>
          <AddIcon />
        </Fab>
      </Link>
    </main>
  );
};

export default withStyles(styles)(PostsList);
