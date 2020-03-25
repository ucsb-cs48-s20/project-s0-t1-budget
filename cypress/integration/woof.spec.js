describe("Random Dog page", () => {
  it("is reachable from the navbar", () => {
    cy.visit("http://localhost:3000");

    cy.contains("Random Dog").click();

    cy.url().should("contain", "/woof");
  });

  it("displays a dog from the api", () => {
    const image = "https://images.dog.ceo/breeds/chow/n02112137_10654.jpg";

    cy.server().route("/api/dog", { image }).as("dog");

    cy.visit("http://localhost:3000/woof");

    cy.wait("@dog");

    cy.get("[data-cy=doggo]").should("have.attr", "src", image);
  });
});
