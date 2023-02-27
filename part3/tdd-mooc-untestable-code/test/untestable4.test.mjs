import { PasswordService, PostgresUserDao } from "../src/untestable4_solution.mjs";
import { expect } from "chai";
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);

import dotenv from "dotenv"
dotenv.config();

describe("Untestable 4: enterprise application", () => {
  const OLD_ENV = process.env;
  const userInitPassword = "keke"

  let service;
  let dbDao;
  before(() => {
    process.env = { ...OLD_ENV };
    process.env.NODE_ENV = 'test';
    dbDao = PostgresUserDao.getInstance();

    service = new PasswordService(dbDao);
  });

  beforeEach('Add an user to the users table', async function () {
    await dbDao.runQuery('INSERT INTO users (user_id, password_hash) VALUES ($1, $2)', 
    [1,'$argon2id$v=19$m=4096,t=3,p=1$FgdUp2m0tiWulb0bgyvywA$RYyMSLxZn6/gC3Yf9Mh9mLuB43wvKWXVxPMy1xS+IrA']) // password_hash for "keke"
  })

  afterEach('Drop temporary tables', async function () {
    process.env = OLD_ENV;
    await dbDao.runQuery('DELETE FROM users', 
    [])
  })

  it("Changing password should work and return 1 as row updated", async () => {
     expect(service.changePassword(1, userInitPassword, "newPass")).to.eventually.equal(1)
  });

  it("Changing password should throw Wrong password error when trying wrong current password", async () => {
      expect(service.changePassword(1, "wrongPass", "newPass")).to.be.rejectedWith(Error)
  });
});
