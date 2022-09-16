const PORT = 3000;
const users = [];

const express = require("express"); // Импортим экспресс
const yup = require("yup");
const app = express(); // Создание сервера

app.use(express.json());

//! Создаем Роутер
app.get("/", (req, res) => {
  res.send("Home");
});

const validation = async (req, res, next) => {
  const validateSchema = yup.object({
    fName: yup.string().trim().required(),
    lName: yup.string().trim().required(),
    email: yup.string().trim().email().required(),
    password: yup.string().trim().required(),
    age: yup.number().required(),
    isMale: yup.boolean().required(),
  });

  try {
    req.body = await validateSchema.validate(req.body);
    next();
  } catch (error) {
    res.send(error.message);
  }

  res.end();
};

const saveUser = (req, res, next) => {
  try {
    const user = req.body;
    user.id = Date.now();
    delete user.password;
    user.createAt = new Date();
    users.push(user);
    console.log(users);
    res.status(201).send(user);
  } catch (error) {
    res.send(error.message);
  }
};

app.post("/users", validation, saveUser);

app.get("/users/:userId", (req, res) => {
  console.log(req.params.userId);
  res.end()
});

app.listen(PORT, () => console.log("Server started at 3000 port!")); // Слушаем 3000 порт
