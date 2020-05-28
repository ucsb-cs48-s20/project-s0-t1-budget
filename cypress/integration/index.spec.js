describe("Index page", () => {
  it("Website logo exists", () => {
    cy.visit("http://localhost:3000");

    cy.contains("Budget Visualizer");
  });
});
