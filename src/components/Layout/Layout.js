import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import Classes from "./Layout.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
  state = {
    showSidedrawer: true
  };

  closeBackdropHandler = props => {
    this.setState({ showSidedrawer: false });
  };

  sideDrawerToggleHandler = props => {
    this.setState(prevState => {
      return { showSidedrawer: !prevState.showSidedrawer };
    });
  };

  render() {
    return (
      <Aux>
        <Toolbar onMenuClick={this.sideDrawerToggleHandler} />
        <SideDrawer
          showSidedrawer={this.state.showSidedrawer}
          showSidedrawerHandler={this.closeBackdropHandler}
        />
        <main className={Classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

export default Layout;
