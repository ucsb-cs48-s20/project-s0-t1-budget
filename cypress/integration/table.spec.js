describe.only("Table Component", () => {
  beforeEach(() => {
    // runs before each test in the block
    cy.visit("http://localhost:3000");
  });

  it.only("allows me to input data into the table", () => {
    cy.get('input[name= "income"]').type("10000").should("have.value", "10000");
    cy.get("select").select("Groceries").should("have.value", "Groceries");
    cy.get('input[name= "input"]').type("7000").should("have.value", "7000");
    cy.get("#form-submit-btn").click();
  });

  it.only("allows me to input mutliple data and make sure it is reflected correctly in the table", () => {
    cy.get('input[name= "income"]').type("10000").should("have.value", "10000");
    cy.get("select").select("Groceries").should("have.value", "Groceries");
    cy.get('input[name= "input"]').type("7000").should("have.value", "7000");
    cy.get("#form-submit-btn").click();
    // Asserting the origin value inputted in
    assert_table_value("Income", "10000");
    assert_table_value("Net Income", "3000");
    assert_table_value("Groceries", "-7000");
    //Adding in more values
    cy.get("select")
      .select("Auto & Transport")
      .should("have.value", "Auto & Transport");
    cy.get('input[name= "input"]')
      .clear()
      .type("2000")
      .should("have.value", "2000");
    cy.get("#form-submit-btn").click();
    // Making sure income and groceries stays the same
    assert_table_value("Income", "10000");
    assert_table_value("Groceries", "-7000");
    // Checking the net income shoudld have changed
    assert_table_value("Net Income", "1000");
    // In addition to the new category
    assert_table_value("Auto & Transport", "-2000");
    // Modifying the existing category to make sure the it UPDATES BY REPLACING INSTEAD OF ADDITION
    cy.get("select")
      .select("Auto & Transport")
      .should("have.value", "Auto & Transport");
    cy.get('input[name= "input"]')
      .clear()
      .type("4000")
      .should("have.value", "4000");
    cy.get("#form-submit-btn").click();
    // Making sure income and groceries stays the same
    assert_table_value("Income", "10000");
    assert_table_value("Groceries", "-7000");
    // Checking the net income shoudld have changed ACCORDING TO THE NEW MODIFICATION
    assert_table_value("Net Income", "-1000");
    //  Checking to see if Transporation has been correctly updated
    assert_table_value("Auto & Transport", "-4000");
    // Adding in more values and verifying it as we go
    cy.get("select")
      .select("Bills & Utilities")
      .should("have.value", "Bills & Utilities");
    cy.get('input[name= "input"]')
      .clear()
      .type("1000")
      .should("have.value", "1000");
    cy.get("#form-submit-btn").click();
    // Making sure income, groceries and Auto & Transport stays the same
    assert_table_value("Income", "10000");
    assert_table_value("Groceries", "-7000");
    assert_table_value("Auto & Transport", "-4000");
    // Checking the net income shoudld have changed ACCORDING TO THE NEW MODIFICATION
    assert_table_value("Net Income", "-2000");
    // In addition to the new category
    assert_table_value("Bills & Utilities", "-1000");
    // Adding in the last value
    cy.get("select")
      .select("Business Services")
      .should("have.value", "Business Services");
    cy.get('input[name= "input"]')
      .clear()
      .type("2000")
      .should("have.value", "2000");
    cy.get("#form-submit-btn").click();
    // Making sure income, groceries, Auto & Transport and Bills & Utilitiess stays the same
    assert_table_value("Income", "10000");
    assert_table_value("Groceries", "-7000");
    assert_table_value("Auto & Transport", "-4000");
    assert_table_value("Bills & Utilities", "-1000");
    // Checking the net income shoudld have changed ACCORDING TO THE NEW MODIFICATION
    assert_table_value("Net Income", "-4000");
    // In addition to the new category
    assert_table_value("Business Services", "-2000");
  });

  it.only("lets me reset the table correctly", () => {
    //Inputting data into the table
    cy.get('input[name= "income"]').type("10000").should("have.value", "10000");
    cy.get("select").select("Groceries").should("have.value", "Groceries");
    cy.get('input[name= "input"]').type("7000").should("have.value", "7000");
    cy.get("#form-submit-btn").click();
    cy.get("select")
      .select("Business Services")
      .should("have.value", "Business Services");
    cy.get('input[name= "input"]')
      .clear()
      .type("2000")
      .should("have.value", "2000");
    cy.get("#form-submit-btn").click();
    cy.get("select")
      .select("Bills & Utilities")
      .should("have.value", "Bills & Utilities");
    cy.get('input[name= "input"]')
      .clear()
      .type("1000")
      .should("have.value", "1000");
    cy.get("#form-submit-btn").click();
    cy.get("select")
      .select("Auto & Transport")
      .should("have.value", "Auto & Transport");
    cy.get('input[name= "input"]')
      .clear()
      .type("4000")
      .should("have.value", "4000");
    cy.get("#form-submit-btn").click();
    // Reseting the table and check for the output to see if it has been cleared
    cy.get(".btn-secondary").click();
    // Income and Net Income should be zero
    assert_table_value("Income", "0");
    assert_table_value("Net Income", "0");
    // All the inputted column before should not exist
    cy.get(".col-md-7").contains("Groceries").should("not.exist");
    cy.get(".col-md-7").contains("Business Services").should("not.exist");
    cy.get(".col-md-7").contains("Bills & Utilities").should("not.exist");
    cy.get(".col-md-7").contains("Auto & Transport").should("not.exist");
  });
});

function assert_table_value(category, amount) {
  //Get tje part of the page where the table is displayed
  cy.get(".col-md-7")
    //Get the cell that contains the given cateogry
    .contains(category)
    //Get the parent row that contains the given category
    .parent("tr")
    .within(() => {
      //Get the cell at index 1 in the row (the right cell) and make sure the text is correct
      cy.get("td").eq(1).should("have.text", amount);
    });
}
