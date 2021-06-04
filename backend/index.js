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
//models
const User = require('./models/User.js');
const Tags = require('./models/Tag');
const Flow = require('./models/Flow')

const { verify } = require('./auth');



app.get('/users', (request, response) => {
	db.find({}, (error, users) => {
		response.send(users)
	})
})

app.get('/users/:id', (request, response) => {
	

})

app.put('/users/:id', (request, response) => {

})

app.delete('/users/:id', (request, response) => {

})

app.post('/users', (request, response) => {

})
app.post('/api/register', async (request, response) => {
	const user = await User.register(request.body);

	if (user) {
		response.status(201).json(user);
	} else {
		response.status(500).json({ error: "Reg error " })
	}
})

app.post('/api/login', async (request, response) => {
	const user = await User.auth(request.body);

	if (user) {
		response.json(user);
	} else {
		response.send("Login error")
	}
})

app.get('/api/tags', verify, async (req, res) => {
	const tags = await Tags.getTags(req.user.userID)
	if (tags) {
		res.json(tags)
		return
	}
	res.status(401).json({ error: 'Failed to get resources' })
})

app.get('/api/flow', verify, async (request, response) => {
	const flowItems = await Flow.insertPlaceholderFlows({})

	if (flowItems) {
		response.json(flowItems)
	} else {
		response.status(401).json({ error: 'Failed to get resources' })
	}
})

app.post('/api/tags', verify, async (req, res) => {
	const tags = await Tags.insertedTags(req.body, req.user.userID)
	if (tags) {
		res.json({ message: 'hej' })
		return
	}
	res.status(401).json({ error: 'Failed to get resources' })
})


app.delete('/api/user', verify, async (req, res) => {
	const tags = await User.deleteUser(req.user.userID)
	if (tags) {
		res.json({ message: 'user deleted from db' })
		return
	}
	res.status(401).json({ error: 'Failed to get resources' })
})


app.listen(3000)