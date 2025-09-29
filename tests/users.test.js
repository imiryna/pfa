const userServise = require("../services/usersService");
const db = require("../db");

jest.mock("../db", () => ({
  runQuery: jest.fn(),
}));

describe("userservice", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("getAllUsers return DB object results", async () => {
    db.runQuery.mockResolvedValue([{ id: 1 }]);

    const result = await userServise.getUsers();

    expect(db.runQuery).toHaveBeenCalledWith("SELECT * FROM users");
    expect(result).toEqual([{ id: 1 }]);
  });

  test("CreateUser test correct input data", async () => {
    const fakeUser = { id: 1, name: "John Dir" };
    db.runQuery.mockResolvedValue(fakeUser);

    const result = await userServise.createUser({
      name: "John",
      email: "john@test.com",
      password: "secret",
    });

    expect(db.runQuery).toHaveBeenCalledWith("INSERT INTO users (full_name, email, password) VALUES ($1, $2, $3) RETURNING *", ["John", "john@test.com", "secret"]);
    expect(result).toEqual(fakeUser);
  });

  test("updateUserInDb calls correct update", async () => {
    db.runQuery.mockResolvedValue({ id: 2 });

    const result = await userServise.updateUserInDb(2, "Jane", "jane@test.com");

    expect(db.runQuery).toHaveBeenCalledWith("UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *", ["Jane", "jane@test.com", 2]);
    expect(result).toEqual({ id: 2 });
  });

  test("deleteUserById calls correct delete", async () => {
    db.runQuery.mockResolvedValue({ id: 3 });

    const result = await userServise.deleteUserById(3);

    expect(db.runQuery).toHaveBeenCalledWith("DELETE FROM users WHERE id = $1 RETURNING *", [3]);
    expect(result).toEqual({ id: 3 });
  });
});
