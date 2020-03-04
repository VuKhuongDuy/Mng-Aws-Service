import * as variable from './support/variable.js'

describe("Login", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("Choose Vietnamese", () => {
    cy.get("select").select("Vietnamese");
    cy.wait(2000);
  });

  it("Type username, password", () => {
    cy.wait(1000);
    cy.get(".login100-form-btn").click();

    cy.get(".input100")
      .first()
      .type("asdf");
    cy.get(".input100")
      .last()
      .type("adfsad");
    cy.get(".login100-form-btn").click();
    cy.wait(1000);
    cy.get(".input100")
      .first()
      .clear();
    cy.get(".input100")
      .last()
      .clear();

      cy.get(".input100")
      .first()
      .type(variable.username);
    cy.get(".input100")
      .last()
      .type(variable.password);
    cy.wait(1000);
    cy.get(".login100-form-btn").click();

    cy.url().should("eq", variable.HOST + "/#/dashboard");
  });
});
