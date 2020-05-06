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
    //  var i =  0;
    //  var putValue = [];
    //  var stop = props.category.length;
    // //  console.log(stop)
    //   while(i < stop)
    //   {
    //       if (i == 0)
    //       {
    //         dict = {
    //           category: 'Net Income',
    //           price: props.price[0]
    //         }
    //       }
    //       else
    //       {
    //         dict = {
    //           category: props.category[i],
    //           price: props.price[i]
    //         }
    //       }
    //       console.log(props.category)
    //       console.log(props.price)
    //       putValue.push(dict);
    //       i++;
    //   }
    //   i = 0;
    //   return {
    //     values: putValue
    //   };
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
