const Habit = require("../../../models/habits.models");
const User = require("../../../models/users.models");

jest.mock("../../../models/users.models");

const pg = require("pg");
jest.mock("pg");

const db = require("../../../dbConfig/init");

describe("User", () => {
  beforeEach(() => jest.clearAllMocks());
  afterAll(() => jest.resetAllMocks());

  describe("all", () => {
    test("Resolves with all users on successful db query", async () => {
      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [{}, {}, {}, {}] });

      const all = await User.all;

      expect(all).toHaveLength(4);
    });
  });

  describe("habits", () => {
    test("it resolves with formatted books on successful db query", async () => {
      jest.spyOn(db, "query").mockResolvedValueOnce({
        rows: [
          { id: 1, title: "habit1" },
          { id: 2, title: "habit2" },
        ],
      });
      let testUser = new User({ id: 1, name: "Test Author" });
      const habits = await testUser.habits;
      expect(habits).toHaveLength(2);
    });
  });

  describe("findById", () => {
    test("Resolves with author on successful db query", async () => {
      let userData = { id: 1, name: "TestUser" };
      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [userData] });
      const result = await User.findById(1);
      expect(result).toBeInstanceOf(User);
    });
  });

  describe("create", () => {
    test("it resolves with author on successful db query", async () => {
      let userData = { id: 1, name: "TestUser" };
      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [userData] });
      const result = await User.create("TestUser");
      expect(result).toBeInstanceOf(User);
    });
  });
});
