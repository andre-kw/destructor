import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class IndexPage extends Component {
  render() {
    return (
      <main>
        <section className="index-summary">
          <p>
            <strong>Data structures and algorithms are an integral part of 
            computer science.</strong> The goal of this application is to help in 
            elucidating these concepts with visual and interactive examples.
          </p>

          <h3>How it works</h3>
          <p>You can interact with these examples through the <em>console</em>.
          The console buttons correspond to the different functions of a data 
          structure; an input field is provided to let you input data and visualize 
          its position in the data structure.</p>

          <Link to="/structure/linked-list" className="btn btn-index"
            onClick={() => window.scrollTo(0,0)}>Get started</Link>
        </section>
      </main>
    );
  }
}