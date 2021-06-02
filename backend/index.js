const express = require('express')
require("dotenv").config();
const cors = require('cors')
const Datastore = require('nedb-promise')
const jwt = require('jsonwebtoken');
const app = express();
const Cryptr = require('cryptr')
const cryptr = new Cryptr(process.env.SECRET)

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(3000)