const Habit = require("../../../models/habits.models");
const User = require("../../../models/users.models");

jest.mock("../../../models/users.models");

const pg = require("pg");
jest.mock("pg");

const db = require("../../../dbConfig/init");

describe("Habit", () => {
  beforeEach(() => jest.clearAllMocks());
  afterAll(() => jest.resetAllMocks());

  describe("all", () => {
    test("Resolves with Habits on successful db query", async () => {
      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [{}, {}, {}, {}] });

      const all = await Habit.all;
      console.log(all);
      expect(all).toHaveLength(4);
    });
  });

  describe("findById", () => {
    test("Resolves with Habit by its ID on successful db query", async () => {
      let habitData = {
        id: 1,
        habit: "test Habit",
        habit_freq_type: "weekly",
        habit_frequency: 5,
        habit_aim_total: 5,
        date: "2022-06-26T00:00:00.000Z",
        user_id: 1,
      };

      jest
        .spyOn(db, "query")
        .mockResolvedValueOnce({ rows: [{ ...habitData, id: 1 }] });

      const result = await Habit.findById(1);
      console.log(result);
      expect(result).toBeInstanceOf(Habit);
    });
  });

  describe("create", () => {
    test("Resolves with habit on successful db query", async () => {
      let habitData = {
        id: 1,
        habit: "test Habit",
        habit_freq_type: "weekly",
        habit_frequency: 5,
        habit_aim_total: 5,
        date: "2022-06-26T00:00:00.000Z",
        user_id: 1,
      };
      jest
        .spyOn(db, "query")
        .mockResolvedValueOnce({ rows: [{ ...habitData, id: 1 }] });

      jest
        .spyOn(User, "findOrCreateByName")
        .mockResolvedValueOnce(new User({ id: 1, username: "testuser" }));
      const result = await Habit.create(habitData);
      expect(result).toHaveProperty("id");
    });
  });
});
