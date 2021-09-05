const mongoose = require('mongoose');
const { Schema } = mongoose;

const documentSchema = new Schema({
	value: { type: String, required: true },
	expire_at: { type: Date, default: Date.now, expires: 86400 },
});

const Document = mongoose.model('Document', documentSchema);
module.exports = Document;
