import React from "react";
import BootstrapTable from "react-bootstrap-table-next";

export default class TableComponent extends React.Component {
  render() {
    const products = [
      {
        col1: "Hello",
        col2: "World",
        col3: "World",
      },
      {
        col1: "react-table",
        col2: "rocks",
        col3: "World",
      },
      {
        col1: "whatever",
        col2: "you want",
        col3: "World",
      },
    ];
    const columns = [
      {
        dataField: "col1",
        text: "Product ID",
      },
      {
        dataField: "col2",
        text: "Product Name",
      },
      {
        dataField: "col3",
        text: "Product Price",
      },
    ];

    return <BootstrapTable keyField="id" data={products} columns={columns} />;
  }
}
