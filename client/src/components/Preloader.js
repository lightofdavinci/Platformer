import React, { Component } from 'react';

import '../styles/Preloader.css';

// Preloader from https://codepen.io/foleyatwork/pen/ZJodgr?editors=0010

export default class Preloader extends Component {
  render() {
    return (
      <div className="outer triangle-outer">
        <div className="middle">
          <div className="inner">
            <div className="triangle-wrapper">
              <div className="triangle triangle-1" />
              <div className="triangle triangle-2" />
              <div className="triangle triangle-3" />
              <div className="triangle triangle-4" />
              <div className="triangle triangle-5" />
              <p className="triangle-loading">Loading</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  componentDidMount() {
    (() => {
      const $triangles = document.querySelectorAll('.triangle');
      const template = `<svg class="triangle-svg" viewBox="0 0 140 141">
        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <polygon class="triangle-polygon"  points="70 6 136 138 4 138"></polygon>
        </g>
      </svg>`;

      Array.prototype.forEach.call($triangles, ($triangle, index) => {
        $triangle.innerHTML = template;
      });
    })();
  }
}
