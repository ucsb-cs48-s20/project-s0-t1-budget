import { render } from "react-dom";
import { Component } from "react";
import { Form, Col, Button, Alert } from "react-bootstrap";

class UserPageFormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      income: "",
      goal: "",
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
    const diff = parseInt(this.state.income) - parseInt(this.state.input);
    const data = {
      email: this.props.user.email,
      month: parseInt(this.props.month),
      year: parseInt(this.props.year),
      labels: ["Income", "Net Income", this.state.category],
      data: [this.state.income, diff.toString(), this.state.input],
      goal: this.state.goal,
    };

    fetch("/api/userbudgets", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.status >= 200 && response.status < 300) {
        this.props.update(this.props.month, this.props.year);
      } else {
        Alert("Something Went Wrong Try Again");
      }
    });
  }

  render() {
    return (
      <div>
        <h4>Finances For This Month</h4>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="monthlyIncomeUser">
            <Form.Label>Income($):</Form.Label>
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
          <Form.Group controlId="monthlyNetIncomeGoal">
            <Form.Label>Net Income Goal For This Month($):</Form.Label>
            <Form.Control
              name="goal"
              placeholder="3500"
              type="number"
              value={this.state.goal}
              onChange={this.handleChange}
              onKeyDown={(evt) =>
                ["e", "E", "+"].includes(evt.key) && evt.preventDefault()
              } //Stop the user from entering the letter 'e'
              required
            />
          </Form.Group>

          <Form.Row>
            <Form.Group as={Col} md="4" controlId="categoryUser">
              <Form.Label>Category:</Form.Label>
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
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default UserPageFormComponent;
