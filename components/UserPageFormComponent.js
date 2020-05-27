import { render } from "react-dom";
import { Component } from "react";
import { Form, Col, Button, Alert } from "react-bootstrap";

class UserPageFormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { income: "", input: "", category: "Groceries" };

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
          <Form.Group controlId="monthlyIncome">
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

          <Form.Row>
            <Form.Group as={Col} md="4" controlId="category">
              <Form.Label>Category:</Form.Label>
              <Form.Control
                as="select"
                name="category"
                onChange={this.handleChange}
                value={this.state.category}
              >
                <option value="Groceries">Groceries</option>
                <option value="Utility">Utility</option>
                <option value="Decor">Decoration</option>
                <option value="Transport">Transportation</option>
                <option value="Insurance">Insurance</option>
                <option value="Other">Other</option>
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} md="8" controlId="expense">
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
