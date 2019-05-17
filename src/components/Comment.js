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
import { connect } from 'react-redux';

import {
  handleDeleteComment,
  handleUpvoteComment,
  handleDownvoteComment
} from '../actions/comments';
import { formatDate } from '../utils/helpers';

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

class Comment extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="Recipe" className={classes.avatar}>
              {this.props.comment.author
                ? this.props.comment.author.charAt(0).toUpperCase()
                : ''
              }
            </Avatar>
          }
          title={this.props.comment.author}
          subheader={formatDate(this.props.comment.timestamp)}
        />
        <CardContent>
          <Typography component="p">
            {this.props.comment.body}
          </Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton
            aria-label="Vote up"
            onClick={() =>this.props.handleUpvoteComment(this.props.comment.id)}>
            <Icon>thumb_up</Icon>
          </IconButton>
          <IconButton
            aria-label="Vote down"
            onClick={() => this.props.handleDownvoteComment(this.props.comment.id)}>
            <Icon>thumb_down</Icon>
          </IconButton>
          <span>{this.props.comment.voteScore}</span>
          {
            this.props.showControls
              ? (
                  <React.Fragment>
                    <IconButton aria-label="Edit">
                      <Icon>edit</Icon>
                    </IconButton>
                    <IconButton
                      aria-label="Delete"
                      onClick={() => this.props.handleDeleteComment(this.props.comment)}>
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

const mapActionsToProps = {
  handleDeleteComment,
  handleUpvoteComment,
  handleDownvoteComment
};

export default connect(null, mapActionsToProps)(withStyles(styles)(Comment));
