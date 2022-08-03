const login = require('./login');

// eslint-disable-next-line no-undef
test("Login test", async () => {
  const mReq = { body: { email: "avatar@email.com", password: "avatarka" } };
  // eslint-disable-next-line no-undef
  const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };
  await login(mReq, mRes);
  // eslint-disable-next-line no-undef
  expect(mRes.status).toBeCalledWith(200);
  // eslint-disable-next-line no-undef
  expect(mRes.token).toEqual(expect.anything());
  // eslint-disable-next-line no-undef
  expect(mRes.user.email).toEqual(expect.not.stringContaining(expected));
  // eslint-disable-next-line no-undef
  expect(mRes.send.user.password).toEqual(expect.not.stringContaining(expected));
});