import * as variable from "./support/variable";

describe("Instance", () => {
  beforeEach(() => {
    cy.visit("/instance");

    cy.get(".input100")
      .first()
      .type(variable.username);
    cy.get(".input100")
      .last()
      .type(variable.password);
    cy.get(".login100-form-btn").click();
    cy.wait(1500)
    cy.get(".md-list-item:nth-child(3)")
      .find("a")
      .first()
      .click();
  });

  // it("Click form add instance", () => {
  //   cy.get("#btn-add-instance")
  //     .first()
  //     .click({ force: true });
  //   cy.get("#formAddInstance").should("be.visible");
  // });

  // it("Add instance with empty info", () => {
  //   cy.get("#btn-add-instance").click();
  //   cy.get("#btn_add_instance").click();

  //   // add insstance wrong image id
  //   cy.get("#formAddInstance .md-layout-item:nth-child(1) input").type(
  //     variable.accountName
  //   );
  //   cy.get("#formAddInstance .md-layout-item:nth-child(2) input").type(
  //     "instance test"
  //   );
  //   cy.get("#formAddInstance .md-layout-item:nth-child(3) input").type(
  //     "ae9ef4c38"
  //   );
  //   cy.get("#formAddInstance .md-layout-item:nth-child(4) input").type(
  //     "t2.micro"
  //   );
  //   cy.get("#formAddInstance .md-layout-item:nth-child(5) input").type(
  //     "duy-key"
  //   );
  //   cy.get("#formAddInstance .md-layout-item:nth-child(6) input").type("1");
  //   cy.get("#formAddInstance .md-layout-item:nth-child(7) input").type("1");
  //   cy.get("#btn_add_instance").click();
  //   cy.wait(1300);
  //   // clear text input
  //   cy.get("#formAddInstance .md-layout-item:nth-child(1) input").clear();
  //   cy.get("#formAddInstance .md-layout-item:nth-child(2) input").clear();
  //   cy.get("#formAddInstance .md-layout-item:nth-child(3) input").clear();
  //   cy.get("#formAddInstance .md-layout-item:nth-child(4) input").clear();
  //   cy.get("#formAddInstance .md-layout-item:nth-child(5) input").clear();
  //   cy.get("#formAddInstance .md-layout-item:nth-child(6) input").clear();
  //   cy.get("#formAddInstance .md-layout-item:nth-child(7) input").clear();
  //   cy.wait(1300);
  //   // add insstance success
  //   cy.get("#formAddInstance .md-layout-item:nth-child(1) input").type(
  //     variable.accountName
  //   );
  //   cy.get("#formAddInstance .md-layout-item:nth-child(2) input").type(
  //     "instance test"
  //   );
  //   cy.get("#formAddInstance .md-layout-item:nth-child(3) input").type(
  //     "ami-0b37e9efc396e4c38"
  //   );
  //   cy.get("#formAddInstance .md-layout-item:nth-child(4) input").type(
  //     "t2.micro"
  //   );
  //   cy.get("#formAddInstance .md-layout-item:nth-child(5) input").type(
  //     "duy-key"
  //   );
  //   cy.get("#formAddInstance .md-layout-item:nth-child(6) input").type("1");
  //   cy.get("#formAddInstance .md-layout-item:nth-child(7) input").type("1");
  //   cy.get("#btn_add_instance").click();

  //   cy.wait(3400);
  // });

  it("Search instance", () => {
    cy.wait(4000);
    cy.get(".md-layout-item:nth-child(1) input[type=text]")
      .first()
      .type(variable.keyName);
    cy.get(".md-layout-item:nth-child(1) input[type=text]")
      .first()
      .type("{enter}");
    cy.wait(1500);

    cy.get(".md-layout-item:nth-child(1) input[type=text]")
      .first()
      .type("adsf");
    cy.get(".md-layout-item:nth-child(1) input[type=text]")
      .first()
      .type("{enter}");
    cy.wait(1500);
    cy.get(".md-layout-item:nth-child(1) input[type=text]")
      .first()
      .clear();
    cy.get(".md-layout-item:nth-child(1) input[type=text]")
      .first()
      .type("{enter}");
    cy.wait(1500);
  });

  it("Start an instance", () => {
    cy.wait(4000);
    cy.get("#btnStart").click()
    cy.wait(500)
    cy.get(".md-dialog-actions button:nth-child(2) .md-button-content")
      .first()
      .click({ force: true });
    cy.wait(3000);
  });

  it("Stop an instance", () => {
    cy.wait(4000);
    cy.get("#btnStop").click();
    cy.wait(700);
    cy.get(".md-dialog-actions button:nth-child(2) .md-button-content")
      .first()
      .click({ force: true });
    cy.wait(3000);
  });

  it("Remove an instance", () => {
    cy.wait(4000);
    cy.get("#btnRemove").click();
    cy.wait(700);
    cy.get(".md-dialog-actions button:nth-child(2) .md-button-content")
      .first()
      .click({ force: true });
    cy.wait(3000);
  });
});
