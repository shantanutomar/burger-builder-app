// This file contains the code of rendering the compoenent as per the requirment
// and component will not always be loaded in bundle.js. This is used mainly for performance purposes.
//lazy loading concept

import React, { Component } from "react";

var AsyncComponent = importComponent => {
  return class extends Component {
    state = {
      component: null
    };

    componentDidMount = () => {
      importComponent().then(cmp => {
        this.setState({ component: cmp.default });
      });
    };

    render() {
      var C = this.state.component;
      return C ? <C {...this.props} /> : null;
    }
  };
};

export default AsyncComponent;
