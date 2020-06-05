import { render } from "react-dom";
import { Component } from "react";
import { Form, Col, Button, Alert } from "react-bootstrap";

class UserPageUpdateComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      income: this.props.currData.data[0],
      input: "",
      category: "Auto & Transport",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    var newLabels = this.props.currData.labels;
    var newData = this.props.currData.data;
    //change income
    newData[0] = this.state.income;

    //change expense
    if (this.state.input != "") {
      if (newLabels.indexOf(this.state.category) == -1) {
        newLabels.push(this.state.category);
        newData.push(this.state.input);
      } else {
        let i = newLabels.indexOf(this.state.category);
        newLabels[i] = this.state.category;
        newData[i] = this.state.input;
      }
    }

    //calculate net income
    var expenseSum = 0;
    for (var j = 2; j < newData.length; j++) {
      expenseSum += parseInt(newData[j]);
    }
    const diff = parseInt(newData[0]) - parseInt(expenseSum);
    newData[1] = diff;

    //load new data
    const data = {
      $set: {
        labels: newLabels,
        data: newData,
      },
    };

    //handle request
    var monthstr;
    if (this.props.currData.month.toString().length == 1) {
      monthstr = "0" + this.props.currData.month.toString();
    } else {
      monthstr = this.props.currData.month.toString();
    }

    fetch(
      "/api/userbudgets/" +
        this.props.currData.email +
        monthstr +
        this.props.currData.year,
      {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((response) => {
      if (response.status >= 200 && response.status < 300) {
        this.props.update(this.props.month, this.props.year);
      } else {
        console.log("Something Went Wrong Try Again");
      }
    });
    this.props.update(this.props.month, this.props.year);
  }

  render() {
    return (
      <div>
        <h4>Update This Month</h4>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="monthlyIncomeUser">
            <Form.Label>Change Income($):</Form.Label>
            <Form.Control
              name="income"
              placeholder="7000"
              type="number"
              value={this.state.income}
              onChange={this.handleChange}
              onKeyDown={(evt) =>
                ["e", "E", "+"].includes(evt.key) && evt.preventDefault()
              } //Stop the user from entering the letter 'e'
              required
            />
          </Form.Group>

          <Form.Row>
            <Form.Group as={Col} md="5" controlId="categoryUser">
              <Form.Label>Change/Add Category:</Form.Label>
              <Form.Control
                as="select"
                name="category"
                onChange={this.handleChange}
                value={this.state.category}
              >
                <option value="Auto & Transport">Auto & Transport</option>
                <option value="Bills & Utilities">Bills & Utilities</option>
                <option value="Business Services">Business Services</option>
                <option value="Education">Education</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Fees & Charges">Fees & Charges</option>
                <option value="Financials">Financials</option>
                <option value="Food & Dining">Food & Dining</option>
                <option value="Gifts & Donations">Gifts & Donations</option>
                <option value="Health & Fitness">Health & Fitness</option>
                <option value="Home">Home</option>
                <option value="Personal Care">Personal Care</option>
                <option value="Pets">Pets</option>
                <option value="Shopping">Shopping</option>
                <option value="Groceries">Groceries</option>
                <option value="Taxes">Taxes</option>
                <option value="Travel">Travel</option>
                <option value="Memberships">Memberships</option>
                <option value="Other">Other</option>
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} md="7" controlId="expenseUser">
              <Form.Label>Expense($):</Form.Label>
              <Form.Control
                name="input"
                placeholder="Leave blank if no change"
                value={this.state.input}
                type="number"
                onChange={this.handleChange}
                onKeyDown={(evt) =>
                  ["e", "E", "+"].includes(evt.key) && evt.preventDefault()
                } //Stop the user from entering the letter 'e'
              />
            </Form.Group>
          </Form.Row>
          <Button variant="primary" type="submit">
            Update
          </Button>
        </Form>
      </div>
    );
  }
}

export default UserPageUpdateComponent;
