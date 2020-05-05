import React from "react";
import BootstrapTable from "react-bootstrap-table-next";

var dict = { col1: "Hello", col2: "World" };

export default class TableComponent extends React.Component {
  state = {
    columns: [
      {
        dataField: "category",
        text: "Category",
      },
      {
        dataField: "price",
        text: "Price",
      },
    ],
    values: [],
  };

  // this.props.category contains an array of labels
  // this.props.data contains an array of values
  static getDerivedStateFromProps(props, state) {
    // for i in (this.props.category.length(),
  }

  render() {
    return (
      <BootstrapTable
        keyField="id"
        data={this.state.values}
        columns={this.state.columns}
      />
    );
  }
}
