# Readable Project
This project was developed using [Create React App](https://github.com/facebook/create-react-app).
The goal of this project is to build a content and comment web app. Users will be able to post content to predefined categories, comment on their posts and other users' posts, and vote on posts and comments. Users will also be able to edit and delete posts and comments.

## TL;DR

To launch the project on your machine:

* make sure you have installed node8+
* install all project dependencies with `npm install`
* start the api server and the development server with `npm start`

## What You're Getting
```bash
├── README.md - This file.
├── package.json # npm package manager file.
├── public
│   ├── favicon.ico
│   ├── manifest.json
│   └── index.html
└── src
    ├── App.css # Styles for the app. Feel free to customize this as you desire.
    ├── App.js # This is the root of the app. Contains static HTML right now.
    |── App.test.js # Used for testing. Provided with Create React App.
    ├── actions # Redux actions generators.
    │   ├── comments.js
    │   ├── posts.js
    │   └── shared.js
    ├── components # Components used by app.
    │   ├── Comment.js # Represents a comment.
    │   ├── CommentForm.js # Used for adding and editing comments.
    │   ├── Navbar.js # Used to navigate between home and add a new post views.
    │   ├── Post.js # Represents a post.
    │   ├── PostDetails.js # Use to display a post and its respective comments.
    │   ├── Post.js # Represents a post.
    │   ├── PostList.js # Used to display a list of comments.
    │   ├── SelectControls.js # Used to sort posts by timestamp and vote score.
    │   └── SearchBooks.js
    ├── reducers # Redux reducers.
    │   ├── categories.js
    │   ├── comments.js
    │   ├── index.js
    │   ├── loading.js # Represents a post.
    │   └── posts.js
    ├── store # Redux store.
    │   └── index.js
    ├── utils # Helper methods to be use along the app.
    │   ├── api.js # Encapsulates the requests that will be made to the api server.
    │   └── helpers.js # Contains useful methods.
    ├── index.css # Global styles.
    └── index.js # App entry point
```


## Contributing

This repository is maintained by Eron Castro, and was developed for the seconds assignment of Udacity React Nanodegree. Contributions will not likely be accepted.
