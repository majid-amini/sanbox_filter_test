import React, { Component } from "react";
import { Drawer, Spin } from "antd";

class Placeholder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  onClose = () => {
    this.props.toggleDrawer();
  };

  render() {
    return (
      <Drawer
        width={"80%"}
        placement="right"
        closable={true}
        onClose={this.onClose}
        visible={this.props.visible}
      >
        <Spin spinning={this.state.loading} />
        {!this.state.loading && <p>HELLO</p>}
      </Drawer>
    );
  }
}

export default Placeholder;
