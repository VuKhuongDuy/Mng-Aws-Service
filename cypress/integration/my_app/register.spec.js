import * as variable from "./support/variable";
import * as axios from "../../../src/axios";
import url from "../../../config/url";
import { getTokenFromCookie } from "../../../src/cookie";

let rand = 42;
const EMAIL = rand + "example@gmail.com";
const USERNAME = rand + "vuduy";
const PASSWORD = rand + "vuduy";
let code = "213123";

async function saveToken() {
  const api = url.url + "/api/login/";
  let data = await axios.post(api, { username: USERNAME, password: PASSWORD });
  document.cookie = escape("token") + "=JWT " + escape(data.token) + "; path=/";
}

async function getCode() {
  const api = url.url + "/api/logup";
  let data = await axios.get(api);
  data.data.forEach(user => {
    if (user.email === EMAIL) {
      code = user.code;
    }
  });
}

describe("register", () => {
  beforeEach(() => {
    cy.visit("/register");
  });

  it("Empty info", () => {
    cy.get("#btnRegister").click();
    cy.get(".form-row")
      .last()
      .should("not.be.visible");
  });

  it("Register", () => {
    // password confirm
    cy.get(".input--style-5")
      .first()
      .type("vuduy");
    cy.get(".form-row:nth-child(2)")
      .find(".input--style-5")
      .type(EMAIL);
    cy.get(".form-row:nth-child(3)")
      .find(".input--style-5")
      .type(USERNAME);
    cy.get(".form-row:nth-child(4)")
      .find(".input--style-5")
      .type("vuduydfd");
    cy.wait(500);
    cy.get("#btnRegister").click();
    cy.wait(1000);
    cy.get(".form-row")
      .last()
      .should("not.be.visible");
    cy.get(".form-row:nth-child(4)")
      .find(".input--style-5")
      .clear();

    // info is correctly.
    cy.get(".form-row:nth-child(4)")
      .find(".input--style-5")
      .type(PASSWORD);
    cy.get("#btnRegister").click();
    cy.get(".form-row")
      .last()
      .should("be.visible");
    cy.wait(1000);

    //send wrong code to email
    cy.get(".form-row:nth-child(5)")
      .find(".input--style-5")
      .type(123123);
    cy.get("#btnRegister").click();
    cy.wait(900);

    cy.get(".form-row:nth-child(5)")
      .find(".input--style-5")
      .clear();
    cy.get(".form-row:nth-child(5)")
      .find(".input--style-5")
      .type(code);
    cy.get("#btnRegister").click();
  });
});
