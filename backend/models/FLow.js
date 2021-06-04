const Datastore = require('nedb-promise')
const Cryptr = require('cryptr')
const cryptr = new Cryptr(process.env.SECRET)

require("dotenv").config();
const streams = new Datastore({
	filename: './streams.db',
	autoload: true
})

module.exports = {
 async insertPlaceholderFlows() {
	const decstreams = await streams.find({})

		decstreams.forEach(stream => {
			stream.date = cryptr.decrypt(stream.date)
			stream.tags = cryptr.decrypt(stream.tags)
			stream.content = cryptr.decrypt(stream.content)
		})

		return decstreams
	}
} 