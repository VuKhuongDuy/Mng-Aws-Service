import * as axios from "../../../src/axios";
import url from "../../../config/url";
import * as variable from "./support/variable";

describe("Account", () => {
  beforeEach(() => {
    cy.visit("/account");
    cy.get(".input100")
      .first()
      .type(variable.username);
    cy.get(".input100")
      .last()
      .type(variable.password);
    cy.get(".login100-form-btn").click();
    cy.wait(1500)
    cy.get(".md-list-item:nth-child(2)")
      .find("a")
      .first()
      .click();
  });

  it("Click add account", () => {
    // click button open form add account
    cy.get("#btn-add-account").click();
    cy.get(".form-add-account").should("be.visible");
    // click add account but info was empty
    cy.get("#btn-add").click();

    // input info new account but wrong account
    cy.get(".md-card-plain .md-layout-item:nth-child(1)")
      .find("input[type=text]")
      .type("a1");
    cy.get(".md-card-plain .md-layout-item:nth-child(2)")
      .find("input[type=text]")
      .type("a1");
    cy.get(".md-card-plain .md-layout-item:nth-child(3)")
      .find("input[type=text]")
      .type("a1");
    cy.get(".md-card-plain .md-layout-item:nth-child(4)")
      .find("input[type=text]")
      .type("a1");
    cy.get("#btn-add").click();
    cy.wait(1700);

    // cy.screenshot('Account incorrect')

    // // clear text in input
    cy.get(".md-card-plain .md-layout-item:nth-child(1)")
      .find("input[type=text]")
      .clear();
    cy.get(".md-card-plain .md-layout-item:nth-child(2)")
      .find("input[type=text]")
      .clear();
    cy.get(".md-card-plain .md-layout-item:nth-child(3)")
      .find("input[type=text]")
      .clear();
    cy.get(".md-card-plain .md-layout-item:nth-child(4)")
      .find("input[type=text]")
      .clear();
    cy.wait(1700);

    // input info new account but wrong account
    cy.get(".md-card-plain .md-layout-item:nth-child(1)")
      .find("input[type=text]")
      .type(variable.accountName);
    cy.get(".md-card-plain .md-layout-item:nth-child(2)")
      .find("input[type=text]")
      .type("AKIA5QS3A2GU754PXBWE");
    cy.get(".md-card-plain .md-layout-item:nth-child(3)")
      .find("input[type=text]")
      .type("abvmKOiJ2Z8LfwUot9sNLQfnMxjI8Gkf7AHuIBdI");
    cy.get(".md-card-plain .md-layout-item:nth-child(4)")
      .find("input[type=text]")
      .type("us-west-2");
    cy.get("#btn-add").click();
    cy.wait(2500);
    cy.get("#btn-add").click();
    // close form add account
    cy.get("#btn-close").click();
    cy.get(".form-add-account").should("not.be.visible");

    // go to form dashboard
    cy.get(".md-list-item:nth-child(1)")
      .find("a")
      .first()
      .click();
    cy.wait(1700);
    cy.get(".md-card-plain:nth-child(1) td").should("have.length.gt", "1");
  });

  it("Delete an account", () => {
    cy.wait(2000)
    cy.get("tr:nth-child(1) #btnRemove").click({ force: true });
    cy.get(".md-dialog-actions button:nth-child(2) .md-button-content")
      .first()
      .click({ force: true });
    cy.wait(1700);
  });
});
