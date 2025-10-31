const mongoose = require('mongoose');


// Generic metric: { type: 'sale'|'view'|'user', value: Number, date: Date }
const metricSchema = new mongoose.Schema({
type: { type: String, required: true },
value: { type: Number, required: true, default: 1 },
date: { type: Date, required: true, default: Date.now },
});


module.exports = mongoose.model('Metric', metricSchema);