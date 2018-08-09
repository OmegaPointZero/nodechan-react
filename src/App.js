import React, { Component } from 'react';
import BulletinBoard from './Components/BulletinBoard';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="container" id="home">
        <h1>Welcome to Nodechan-React!</h1>
        <h3>What is NodeChan-React?</h3>
        <span>Nodechan-React is a refactor of nodechan built on NodeJS, Express, MongoDB, and React.js. It is meant to be identically functional to 4chan from roughly 2006. The current demo is living here. Next will be a refactor of this in Angular followed up by one in Vue.</span><br /><br />
        <span>Nodechan is an anonymous imageboard that anyone can use without having to sign up. We aren't big enough to sell out to Big Data yet, so no need for emails or logins or anything of the such. Being an imageboard, an image is required to start a new thread. Replies may consist of an image, text, or both. </span><br /><br />
        <span>While I am a libertarian who believes in a free an open internet, I can't afford to have anyone breaking the law because that could blow up on me. The only things against the rules to post are explicitly illegal content that could get me into trouble. Otherwise, try to stay on the topic of the boards.</span><br />
        <hr className="abovePostForm" />
        <BulletinBoard />
      </div>
    );
  }
}

export default App;
