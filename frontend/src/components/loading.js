import React, { Component } from "react";

class Loading extends Component {
  render() {
    return (
      <div className="has-text-centered py-6">
        <button className="button is-link is-loading is-large">
          Memuat...
        </button>
      </div>
    );
  }
}

export default Loading;
