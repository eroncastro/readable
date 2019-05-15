import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Navbar from './components/Navbar';
import PostForm from './components/PostForm';
import PostsList from './components/PostsList';
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
          <Route path="/" exact component={PostsList} />
          <Route path="/posts/new" exact component={PostForm} />
          <Route path="/posts/category/:categoryId" exact component={PostsList} />
          <Route path="/posts/:postId" exact component={PostsList} />
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
