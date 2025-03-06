import express from "express";

const app = express();
const PORT = 3000;
const localhost = "127.0.0.1";

app.get("/api/v1/user/home", (req, res) => {
  res.send("<h1>Welcome to HOMEPAGE 🏡</h1>");
});

app.get("/api/v1/user/about", (req, res) => {
  res.send("<h1>Welcome to ABOUT 📚</h1>");
});

app.get("/api/v1/user/profile", (req, res) => {
  res.status(200).json({
    success: true,
    user: {
      userName: "bhanu123",
      password: "bhanu@123",
    },
  });
});

app.get("/api/v1/user/product/:bhanu", (req, res) => {
  // const id = req.params;
  // console.log(id);
  // _________________________
  // const { bhanu } = req.params;
  // console.log(bhanu);
  // _________________________
  // const id = req.params.bhanu;
  console.log(id);

  const product = {
    id: 1,
    productName: "Iphone 16",
    productPrice: 170000,
    productShipping: "eKart",
    orderId: "an2i3bv3452o34b323i ",
  };

  res.status(200).json({
    success: true,
    product,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://${localhost}:${PORT}`);
});
