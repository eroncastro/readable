import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import Icon from '@material-ui/core/Icon';

import {
  handleUpvotePost,
  handleDownvotePost,
  handleDeletePost
} from '../actions/posts';
import { connect } from 'react-redux';

const styles = theme => ({
  card: {
    width: 500,
    margin: 10
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
});

class Post extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="Recipe" className={classes.avatar}>
              {this.props.post.author ? this.props.post.author.charAt(0).toUpperCase() : ''}
            </Avatar>
          }
          title={this.props.post.title}
          subheader={this.props.post.timestamp}
        />
        <CardContent>
          <Typography component="p">
            {this.props.post.body}
          </Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton
            aria-label="Vote up"
            onClick={() =>this.props.handleUpvotePost(this.props.post.id)}>
            <Icon>thumb_up</Icon>
          </IconButton>
          <IconButton
            aria-label="Vote down"
            onClick={() => this.props.handleDownvotePost(this.props.post.id)}>
            <Icon>thumb_down</Icon>
          </IconButton>
          <span>{this.props.post.voteScore}</span>
          <IconButton aria-label="Comments">
            <Icon>comment</Icon>
          </IconButton>
          {this.props.post.comments}
          {
            this.props.showControls
              ? (
                  <React.Fragment>
                    <IconButton aria-label="Edit">
                      <Icon>edit</Icon>
                    </IconButton>
                    <IconButton
                      aria-label="Delete"
                      onClick={() => this.props.handleDeletePost(this.props.post)}>
                      <Icon>delete</Icon>
                    </IconButton>
                  </React.Fragment>
                )
              : null
          }
        </CardActions>
      </Card>
    );
  }
}

const mapDispatchToProps = {
  handleUpvotePost,
  handleDownvotePost,
  handleDeletePost
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(Post));
