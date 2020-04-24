import { render } from "react-dom";

class ChartFormComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert("A value was submitted " + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <h4>Monthly Expense</h4>
        <form onSubmit={this.handleSubmit}>
          <label>
            Enter Value of expense($)
            <br />
            <input
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </label>
          <br />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default ChartFormComponent;
