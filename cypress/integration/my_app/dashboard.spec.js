import * as variable from "./support/variable";

describe("Dashboard", () => {
  beforeEach(() => {
    cy.visit("/dashboard");
  });

  it("Choose Vietnamese", () => {
    cy.get("select").select("Vietnamese");
    cy.wait(2000);
  });

  it("Click log out", () => {
    cy.get(".input100")
      .first()
      .type(variable.username);
    cy.get(".input100")
      .last()
      .type(variable.password);
    cy.get(".login100-form-btn").click();
    cy.wait(3000);
    cy.get("#btnLogout").click();
    cy.url().should("eq", variable.HOST + "/#/login");
  });
});
