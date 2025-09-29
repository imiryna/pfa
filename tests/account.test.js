const accountService = require("../services/accountService");
const db = require("../db");

jest.mock("../db", () => ({
  runQuery: jest.fn(),
}));

describe("accountService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("createAccount inserts correct input data", async () => {
    const fakeAccount = { id: 1 };
    db.runQuery.mockResolvedValue(fakeAccount);

    const payload = {
      user_id: 42,
      accountType: "checking",
      institutionName: "Bank A",
      alias: "main",
      currency: "USD",
      balance: 100,
    };

    const result = await accountService.createAccount(payload);

    expect(db.runQuery).toHaveBeenCalledWith("INSERT INTO account (user_id, account_type, institution_name, alias, currency, balance) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", [42, "checking", "Bank A", "main", "USD", 100]);
    expect(result).toEqual(fakeAccount);
  });

  test("updateAccountInDb updates correct row", async () => {
    const fakeAccount = { id: 1 };
    db.runQuery.mockResolvedValue(fakeAccount);

    const now = Date.now;
    Date.now = jest.fn(() => new Date("2023-01-01T00:00:00Z")); // optional to fix date

    const result = await accountService.updateAccountInDb(1, 42, "savings", "Bank B", "secondary", "EUR", 200);

    expect(db.runQuery).toHaveBeenCalledWith("UPDATE account SET user_id = $1, account_type = $2, institution_name = $3, alias = $4, currency = $5, balance = $6, update_at = $7 WHERE id = $8 RETURNING *", expect.arrayContaining([42, "savings", "Bank B", "secondary", "EUR", 200, expect.any(Date), 1]));
    expect(result).toEqual(fakeAccount);

    Date.now = now;
  });

  test("updateAccountBalance updates only balance", async () => {
    const fakeAccount = { id: 1, balance: 500 };
    db.runQuery.mockResolvedValue(fakeAccount);

    const result = await accountService.updateAccountBalance(1, 500);

    expect(db.runQuery).toHaveBeenCalledWith("UPDATE account SET balance = $1 WHERE id = $2 RETURNING *", [500, 1]);
    expect(result).toEqual(fakeAccount);
  });
});
