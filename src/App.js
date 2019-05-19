import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import CommentForm from './components/CommentForm';
import Navbar from './components/Navbar';
import NotFound from './components/NotFound';
import PostDetail from './components/PostDetail';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import { handleInitialData } from './actions/shared';

class App extends React.Component {
  componentDidMount() {
    this.props.handleInitialData();
  }

  render() {
    if (this.props.loading) {
      return <h2>Loading...</h2>;
    }

    return (
      <Router>
        <Navbar title="Readable" />

        <Switch>
          <Route path="/404" exact component={NotFound} />
          <Route path="/" exact component={PostList} />
          <Route path="/new" exact component={PostForm} />
          <Route path="/:category/:postId/edit" exact component={PostForm} />
          <Route path="/:category/:postId/new" exact component={CommentForm} />
          <Route path="/:category/:postId/:commentId/edit" exact component={CommentForm} />
          <Route path="/:category" exact component={PostList} />
          <Route path="/:category/:postId" exact component={PostDetail} />
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.loading
  };
};

const mapDispatchToProps = { handleInitialData };

export default connect(mapStateToProps, mapDispatchToProps)(App);
