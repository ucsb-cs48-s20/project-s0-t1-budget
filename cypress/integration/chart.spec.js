describe("Chart Component", () => {
  beforeEach(() => {
    // runs before each test in the block
    cy.visit("http://localhost:3000");
  });

  it("show the bar graph title", () => {
    cy.get("#bar-chart-h3").should("have.text", "Bar Chart");
  });

  it("show the pie income chart title", () => {
    cy.get("#pie-chart-h3").should("have.text", "Pie Income Chart");
  });

  it("show the pie chart of expenses title", () => {
    cy.get("#pie-expense-chart-h3").should(
      "have.text",
      "Pie Chart of Expenses"
    );
  });

  it("shows bar chart exist", () => {
    // showing bar chart exist on the page
    cy.get("#bar-graph").should("exist");
  });

  it("shows the pie chart income exist", () => {
    cy.get("#pie-chart-income").should("exist");
  });

  it("shows the pie chart expenses exist", () => {
    cy.get("#pie-chart-expenses").should("exist");
  });

  it("can delete bar chart by clicking danger button", () => {
    cy.get("#delete-bar-chart").click();
    cy.get("#bar-graph").should("be.hidden");
    cy.get("#bar-chart-h3").should("be.hidden");
  });

  it("can delete pie income chart by clicking danger button", () => {
    cy.get("#delete-pie-income-chart").click();
    cy.get("#pie-chart-income").should("be.hidden");
    cy.get("#pie-chart-h3").should("be.hidden");
  });

  it("can delete pie expense chart by clicking danger button", () => {
    cy.get("#delete-pie-expenses-chart").click();
    cy.get("#pie-chart-expenses").should("be.hidden");
    cy.get("#pie-expense-chart-h3").should("be.hidden");
  });
});
