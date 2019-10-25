require("@babel/polyfill");

global.fetch = jest.fn().mockImplementationOnce(() => {
  return new Promise(resolve => {
    resolve({
      ok: true,
      status,
      json: () => {
        return returnBody ? returnBody : {};
      }
    });
  });
});
