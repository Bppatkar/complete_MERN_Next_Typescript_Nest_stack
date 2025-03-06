export const register = (req, res) => {
  const obj = req.body;

  console.log(obj);

  res.status(200).json({
    accountCreation: true,
    message: "New A/C Created Successfully",
    data: obj,
  });
};

export const login = (req, res) => {
  const obj = req.body;
  console.log(obj);

  res.status(200).json({
    login: true,
    timeStamp: Date.now(),
    message: "Login Successfully",
    data: obj,
  });
};

