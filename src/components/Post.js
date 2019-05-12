import React from 'react';
import PropTypes from 'prop-types';
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
              {this.props.author ? this.props.author.charAt(0).toUpperCase() : ''}
            </Avatar>
          }
          title={this.props.title}
          subheader={this.props.timestamp}
        />
        <CardContent>
          <Typography component="p">
            {this.props.body}
          </Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton aria-label="Vote up">
            <Icon>thumb_up</Icon>
          </IconButton>
          <IconButton aria-label="Vote down">
            <Icon>thumb_down</Icon>
          </IconButton>
          <IconButton aria-label="Vote down">
            <Icon>score</Icon>
          </IconButton>
          {this.props.voteScore}
          <IconButton aria-label="Comments">
            <Icon>comment</Icon>
          </IconButton>
          {this.props.comments}
        </CardActions>
      </Card>
    );
  }
}

Post.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Post);
