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
    this.props.handleFormUpdate(this.state.category, this.state.input);
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
              <option value="Transport">Transportation</option>
              <option value="Insurance">Insurance</option>
              <option value="Other">Other</option>
            </select>
            <input
              name="input"
              onKeyPress="return isNumberKey(event)"
              type="number"
              value={this.state.input}
              onChange={this.handleChange}
              onKeyDown={(evt) =>
                ["e", "E", "+"].includes(evt.key) && evt.preventDefault()
              } //Stop the user from entering the letter 'e'
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

//Checks for the required input
