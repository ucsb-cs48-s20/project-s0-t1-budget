import { render } from "react-dom";

class ChartFormComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { input: "", category: "Groceries" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    if (event.target.name == "input") {
      let numTest = event.target.value;

      if (!Number(numTest) && !(numTest == "")) {
        alert("Please Enter a Valid Number you entered " + numTest);
        return;
      }
    }

    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    alert(
      "A value was submitted input: " +
        this.state.input +
        " category: " +
        this.state.category
    );
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <h4>Monthly Expense</h4>
        <form onSubmit={this.handleSubmit}>
          <label>
            Enter Value of expense($):
            <br />
            <select
              name="category"
              value={this.state.category}
              onChange={this.handleChange}
            >
              <option value="Groceries">Groceries</option> 
              <option value="Utility">Utility</option> 
              <option value="Decor">Decoration</option> 
              <option value="Other">Other</option> 
            </select>
            <input
              name="input"
              type="text"
              value={this.state.input}
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
