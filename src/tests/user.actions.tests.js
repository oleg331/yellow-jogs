import userActions from "../actions/user.actions.js";

test("parse date in valid form: '10.06.2011' ", () => {
  expect(userActions.parseDate("10.06.2011")).toBe(1310245200000);
});

test("parse date in valid form: 951955200", () => {
  expect(userActions.parseDate(951955200)).toBe("02.03.2000");
});
