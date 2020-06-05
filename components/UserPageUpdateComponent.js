import { render } from "react-dom";
import { Component } from "react";
import { Form, Col, Button, Alert } from "react-bootstrap";

class UserPageUpdateComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      income: this.props.currData.data[0],
      input: "",
      category: "Groceries",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const diff = parseInt(this.state.income) - parseInt(this.state.input);
    var newLabels = this.props.currData.labels;
    var newData = this.props.currData.data;
    if (newLabels.indexOf(this.state.category) == -1) {
      newLabels.push(this.state.category);
      newData.push(this.state.input);
    } else {
      let i = newLabels.indexOf(this.state.category);
      alert(i);
      newLabels[i] = this.state.category;
      newData[i] = this.state.input;
    }
    const data = {
      $set: {
        labels: newLabels,
        data: newData,
      },
      //email: this.props.user.email,
      //month: parseInt(this.props.month),
      //year: parseInt(this.props.year),
    };
    var monthstr;
    if (this.props.currData.month.toString().length == 1) {
      monthstr = "0" + this.props.currData.month.toString();
    } else {
      monthstr = this.props.currData.month.toString();
    }
    alert(JSON.stringify(data));

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
            <Form.Group as={Col} md="4" controlId="categoryUser">
              <Form.Label>Change Or Add Category:</Form.Label>
              <Form.Control
                as="select"
                name="category"
                onChange={this.handleChange}
                value={this.state.category}
              >
                <option value="Groceries">Groceries</option>
                <option value="Utility">Utility</option>
                <option value="Decoration">Decoration</option>
                <option value="Transportation">Transportation</option>
                <option value="Insurance">Insurance</option>
                <option value="Other">Other</option>
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} md="8" controlId="expenseUser">
              <Form.Label>Expense($):</Form.Label>
              <Form.Control
                name="input"
                placeholder="300"
                value={this.state.input}
                type="number"
                onChange={this.handleChange}
                onKeyDown={(evt) =>
                  ["e", "E", "+"].includes(evt.key) && evt.preventDefault()
                } //Stop the user from entering the letter 'e'
                required
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
