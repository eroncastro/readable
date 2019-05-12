import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Navbar from './components/Navbar';
import NewPost from './components/NewPost';
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

        <Route path="/" exact component={PostsList} />
        <Route path="/posts/new" exact component={NewPost} />
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
