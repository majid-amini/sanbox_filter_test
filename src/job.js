import React, { Component, Fragment } from "react";
import Page from "./page";
import Placeholder from "./placeholder";

class Job extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawVisible: false,
      filters: [
        {
          name: "process",
          defaultValue: "Filter by process",
          items: [
            "Video Arrived",
            "AQC",
            "QC",
            "Compliance",
            "TX Master",
            "X Archived"
          ]
        },
        {
          name: "status",
          defaultValue: "Filter by status",
          items: ["Active", "Complete", "Failed"]
        }
      ],
      columns: [
        {
          title: "U-ID",
          dataIndex: "mediaID",
          sorter: () => {},
          render: mediaID => {
            return (
              <span onClick={() => this.toggleDrawer(mediaID)}>{mediaID}</span>
            );
          }
        },
        {
          title: "Title",
          dataIndex: "description",
          sorter: () => {}
        },
        {
          title: "Status",
          dataIndex: "status",
          sorter: () => {}
        },
        {
          title: "Process",
          dataIndex: "process",
          sorter: () => {}
        }
      ]
    };
  }

  toggleDrawer = mediaID => {
    this.setState({
      drawVisible: this.state.drawVisible ? false : true,
      placeHolderId: mediaID
    });
  };

  render() {
    return (
      <Fragment>
        <Page columns={this.state.columns} filters={this.state.filters} />
        <Placeholder
          visible={this.state.drawVisible}
          toggleDrawer={this.toggleDrawer}
          placeHolderId={this.state.placeHolderId}
        />
      </Fragment>
    );
  }
}

export default Job;
