import { render } from "react-dom";
import { Component } from "react";
import { Form, Col, Button } from "react-bootstrap";
import { ArrowsFullscreen, X } from "react-bootstrap-icons";

class ChartFormComponent extends Component {
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
    this.props.handleFormUpdate(
      this.state.income,
      this.state.category,
      this.state.input
    );
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <h4>Calculate Finances</h4>
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
            <Form.Group as={Col} md="5" controlId="category">
              <Form.Label>Category:</Form.Label>
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
            <Form.Group as={Col} md="7" controlId="expense">
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
          <Button variant="primary" type="submit" id="form-submit-btn">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default ChartFormComponent;
