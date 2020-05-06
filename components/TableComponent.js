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
        text: "Current Amount",
      },
    ],
    values: [],
  };

  // this.props.category contains an array of labels
  // this.props.data contains an array of values
  static getDerivedStateFromProps(props, state) {
    var i = 0;
    var putValue = []; // Values will be stored as dictionary in here
    var stop = props.category.length; // to know where to stop iterating
    //A while loop to iterate through categories and their corresponding input and put them in putValue array
    while (i < stop) {
      if (i == 0) {
        dict = {
          category: "Net Income",
          price: props.price[0],
        };
      } else {
        dict = {
          category: props.category[i],
          price: props.price[i],
        };
      }
      putValue.push(dict);
      i++;
    }
    i = 0; //resets the iteration index
    //Return function that puts whatever is in putValue into values
    return {
      values: putValue,
    };
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
