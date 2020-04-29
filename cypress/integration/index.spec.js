describe("Index page", () => {
  it("Does have a form submit button", () => {
    cy.visit("http://localhost:3000");

    cy.contains("Submit");
  });
});
