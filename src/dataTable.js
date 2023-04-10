import React, { Component } from "react";
import { Table } from "antd";
import "./dataTable.css";

class DataTable extends Component {
  handleTableChange = (pagination, filters, sorter) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(pagination, sorter);
    }
  };

  render() {
    const {
      data,
      pagination,
      loading,
      columns,
      expandedRowRender,
      rowClassName
    } = this.props;

    return (
      <Table
        bordered
        columns={columns}
        rowKey={record => record.key}
        dataSource={data}
        pagination={pagination}
        loading={loading}
        onChange={this.handleTableChange}
        expandedRowRender={expandedRowRender}
        rowClassName={rowClassName}
      />
    );
  }
}

export default DataTable;
