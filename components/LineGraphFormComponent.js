import { Component } from "react";
import { Form, Col, Button } from "react-bootstrap";

export default class LineGraphFormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { year: 2020 };
  }

  handleChange = (e) => {
    this.loadData(e.target.value);
  };

  loadData = (selectedYear) => {
    this.setState({
      year: selectedYear,
    });
  };

  render() {
    return (
      <div>
        <h4>Year</h4>
        <Form.Row>
          <Form.Group as={Col} md="2" controlId="YearForm">
            <Form.Control
              as="select"
              name="Year"
              onChange={this.handleChange}
              value={this.state.year}
            >
              <option value="2020">2020</option>
              <option value="2019">2019</option>
              <option value="2018">2018</option>
              <option value="2017">2017</option>
              <option value="2016">2016</option>
              <option value="2015">2015</option>
              <option value="2014">2014</option>
              <option value="2013">2013</option>
              <option value="2012">2012</option>
              <option value="2011">2011</option>
              <option value="2010">2010</option>
            </Form.Control>
          </Form.Group>
        </Form.Row>
      </div>
    );
  }
}
