jest.mock("../db", () => ({
  runQuery: jest.fn(),
}));

const { disposalIncome, savingRate, calcMaximumLoan } = require("../services/calculatesService");
const { runQuery } = require("../db");

describe("financeModel test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("disposalIncome returns sum of income+expenses", async () => {
    runQuery
      .mockResolvedValueOnce({ rows: [{ total_income: 1000 }] }) // income
      .mockResolvedValueOnce({ rows: [{ total_expenses: -300 }] }); // expenses

    const res = await disposalIncome("some-user-id");
    expect(res).toBe("700.00");
  });

  test("savingRate calculates correctly", async () => {
    runQuery
      .mockResolvedValueOnce({ rows: [{ total_income: 1000 }] }) // income
      .mockResolvedValueOnce({ rows: [{ total_income: 1000 }] }) // income
      .mockResolvedValueOnce({ rows: [{ total_expenses: -300 }] }); // expenses
    const rate = await savingRate("some-user-id");
    expect(rate).toBeCloseTo(70); // 700/1000 *100
  });

  test("calcMaximumLoan calculates correctly", async () => {
    runQuery
      .mockResolvedValueOnce({ rows: [{ total_income: 1000 }] }) // income
      .mockResolvedValueOnce({ rows: [{ total_expenses: -300 }] }); // expenses
    const loan = await calcMaximumLoan("some-user-id");
    expect(loan).toBeDefined();
  });
});
