const express = require("express");
const { getUsers } = require("../controllers/useController");
const userRouter = express.Router();


userRouter.get('/', getUsers);


module.exports = userRouter;