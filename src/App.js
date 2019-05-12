import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import NewPost from './components/NewPost';
import PostsList from './components/PostsList';

function App(props) {
  return (
    <Router>
      <Navbar title="Readable" />

      <Route path="/" exact component={PostsList} />
      <Route path="/posts/new" exact component={NewPost} />
    </Router>
  );
}

export default App;
