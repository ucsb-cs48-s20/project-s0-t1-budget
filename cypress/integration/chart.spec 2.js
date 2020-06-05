describe("Chart Component", () => {
  beforeEach(() => {
    // runs before each test in the block
    cy.visit("http://localhost:3000");
  });

  it(" show the bar graph title", () => {
    cy.get("h2#bar-graph-h2").should("have.text", "Bar Graph");
  });

  it("shows bar chart exist", () => {
    // showing bar chart exist on the page
    cy.get("#bar-graph").should("be.visible");
  });

  // it("has a footer element", () => {
  //   cy.visit("http://localhost:3000");
  //   cy.get("footer.footer").should("exist"); //footer.footer = Looking for the element tag footer and then look for the className footer
  // });
});
