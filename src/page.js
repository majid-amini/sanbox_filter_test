import React, { Component, Fragment } from "react";
import axios from "axios";
import { Steps } from "antd";
import SearchBar from "./searchBar";
import DataTable from "./dataTable";

class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      pagination: {},
      loading: false
    };
    this.filters = {};
  }

  onChange = (name, value) => {
    this.setState(prevState => ({
      [name]: value
    }));

    value ? (this.filters[name] = value) : delete this.filters[name];

    this.fetch();
  };

  onReset = items => {
    items.forEach(name => {
      this.setState({
        [name]: ""
      });
    });
    this.filters = {};
    this.fetch();
  };

  onSearch = value => {
    this.fetch({
      q: value
    });
  };

  componentDidMount() {
    this.fetch();
  }

  fetch = (params = {}) => {
    this.setState({
      loading: true
    });

    axios
      .get("http://localhost:3000/data", {
        params: {
          _limit: 10,
          ...this.filters,
          ...params
        }
      })
      .then(response => {
        const pagination = { ...this.state.pagination };

        pagination.total = parseInt(response.headers["x-total-count"]);

        this.setState({
          loading: false,
          data: response.data,
          pagination: pagination
        });
      });
  };

  handleTableChange = (pagination, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;

    this.setState(
      {
        pagination: pager,
        sortField: sorter.field,
        sortOrder: sorter.order === "descend" ? "desc" : "asc"
      },
      () => {
        this.fetch({
          _page: pagination.current,
          _sort: this.state.sortField,
          _order: this.state.sortOrder
        });
      }
    );
  };

  ExpandedRowRender = record => {
    return (
      <div>
        <Steps
          size="small"
          current={1}
          status="process"
          labelPlacement="vertical"
        >
          <Steps.Step title="Finished" description="Video Arrived" />
          <Steps.Step title="In Process" description="AQC" />
          <Steps.Step title="Error" status="error" description="QC" />
          <Steps.Step title="Waiting" description="Compliance" />
          <Steps.Step title="Waiting" description="TX Master" />
          <Steps.Step title="Waiting" description="TX Archived" />
          <Steps.Step title="Waiting" description="Src Archived" />
        </Steps>
        <br />
        <Steps
          size="small"
          current={1}
          status="process"
          labelPlacement="vertical"
          style={{ width: "85%", marginTop: "20px" }}
        >
          <Steps.Step title="In Process" description="Atmos Arrived" />
          <Steps.Step title="In Process" description="ec3 created" />
        </Steps>
      </div>
    );
  };

  rowClassName = record => {
    if (record.status === "Active") {
      return "row-active";
    } else if (record.status === "Failed") {
      return "row-failed";
    } else {
      return "row-complete";
    }
  };

  render() {
    return (
      <Fragment>
        <SearchBar
          onChange={this.onChange}
          onSearch={this.onSearch}
          onReset={this.onReset}
          filters={this.props.filters}
          {...this.state}
        />
        <DataTable
          columns={this.props.columns}
          rowKey={record => record.id}
          data={this.state.data}
          pagination={this.state.pagination}
          loading={this.state.loading}
          onChange={this.handleTableChange}
          expandedRowRender={record => this.ExpandedRowRender(record)}
          rowClassName={record => this.rowClassName(record)}
        />
      </Fragment>
    );
  }
}

export default Page;
