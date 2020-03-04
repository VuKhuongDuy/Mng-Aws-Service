import * as variable from "./support/variable";
import setDate from "./support/setDate";

describe("Plan", () => {
  beforeEach(() => {
    cy.visit("/plan");
    cy.get(".input100")
      .first()
      .type(variable.username);
    cy.get(".input100")
      .last()
      .type(variable.password);
    cy.get(".login100-form-btn").click();
    cy.wait(1500)
    cy.get(".md-list-item:nth-child(4)")
      .find("a")
      .first()
      .click();
  });

  it("create an plan", () => {
    //empty info
    cy.get("#btnCreate").click();
    cy.wait(1000);

    cy.get("#formAddInstance input[type=radio]").check("key_name");
    cy.get("#formAddInstance input[type=text]")
      .first()
      .type("duy-key");

    cy.get("#formAddInstance input[type=radio]").check("stop");
    cy.get("#formAddInstance input[type=radio]").check("nodaily");
    cy.get("#formAddInstance input[type=datetime-local]").then(input =>
      setDate(input[0], "2022-12-12T00:00")
    );

    cy.get("#btnCreate").click();
    cy.wait(1000);
  });

  it("find plan", () => {
    cy.get("input[type=text]")
      .first()
      .type(variable.keyName);
    cy.get("input[type=text]")
      .first()
      .type("{enter}");
    cy.wait(1500);

    cy.get("input[type=text]")
      .first()
      .type("aadfasdf");
    cy.get("input[type=text]")
      .first()
      .type("{enter}");
    cy.wait(1500);

    cy.get("input[type=text]")
      .first()
      .clear();
    cy.get("input[type=text]")
      .first()
      .type("{enter}");
    cy.wait(1500);
  });

  it("Remove plan", () => {
    cy.get("td")
      .first()
      .click({ force: true });
    cy.wait(3000);
    cy.get("#btnRemovePlan").click();
    cy.wait(3000);
    cy.get(".md-dialog-actions button:nth-child(2) .md-button-content")
      .first()
      .click({ force: true });
    cy.wait(3000);
  });
});
