// tests/transactionRepo.test.js
const transactionService = require("../services/transactionService");
const db = require("../db");

jest.mock("../db", () => ({
  runQuery: jest.fn(),
}));

describe("transactionService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("getTransaction calls correct query", async () => {
    db.runQuery.mockResolvedValue([{ id: 1 }]);

    const result = await transactionService.getTransaction();

    expect(db.runQuery).toHaveBeenCalledWith("SELECT * FROM transaction");
    expect(result).toEqual([{ id: 1 }]);
  });

  test("getOneTransaction calls correct query", async () => {
    db.runQuery.mockResolvedValue([{ id: 99 }]);

    const result = await transactionService.getOneTransaction(99);

    expect(db.runQuery).toHaveBeenCalledWith("SELECT * FROM transaction WHERE id = $1", [99]);
    expect(result).toEqual([{ id: 99 }]);
  });

  test("createTransaction inserts correct row", async () => {
    const fakeTransaction = { id: 5 };
    db.runQuery.mockResolvedValue(fakeTransaction);

    const payload = {
      account_id: 1,
      category_id: 2,
      amount: 50.0,
      tags: ["groceries"],
    };

    const result = await transactionService.createTransaction(payload);

    expect(db.runQuery).toHaveBeenCalledWith("INSERT INTO transaction ( account_id, category_id, amount, tags) VALUES ($1, $2, $3, $4 ) RETURNING *", [1, 2, 50.0, ["groceries"]]);
    expect(result).toEqual(fakeTransaction);
  });
});
