const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
dotenv.config({ path: "./config.env" });

app.use(express.json());
// db
require("./database/index");
//cors
app.use(cors());
// router
const router = require("./router");
app.use(router);

// model
const { User, Appointment, Doctor, UserWithOTP } = require('./models/index')

app.listen(process.env.PORT, () => {
    console.log(`Server is running in ${process.env.PORT}`);
});
