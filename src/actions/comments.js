import {
  handleVote,
  DOWNVOTE_OPTION,
  UPVOTE_OPTION
} from './shared';

export const DOWNVOTE_COMMENT = 'DOWNVOTE_COMMENT';
export const UPVOTE_COMMENT = 'UPVOTE_COMMENT';

function upvoteComment(commentId) {
  return { type: UPVOTE_COMMENT, commentId };
};

function downvoteComment(commentId) {
  return { type: DOWNVOTE_COMMENT, commentId };
};

function handleVoteComment(commentId, option, action, fallbackAction) {
  return handleVote(`comments/${commentId}`, option, action, fallbackAction)
};

export function handleUpvoteComment(commentId) {
  return handleVoteComment(
    commentId,
    UPVOTE_OPTION,
    upvoteComment(commentId),
    downvoteComment(commentId)
  );
};

export function handleDownvoteComment(commentId) {
  return handleVoteComment(
    commentId,
    DOWNVOTE_OPTION,
    downvoteComment(commentId),
    upvoteComment(commentId)
  );
};
