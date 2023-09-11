const express = require('express');
const path = require('path');
const app = express();
//this one might be diff
const PORT = process.env.PORT || 3500;
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
connectDB();

app.use(express.json());


// routes for the html/css/and event handlers
app.use("/",express.static(path.join(__dirname,"/public")));

// ./ means the current directory
app.use("/",require("./routes/root"));
app.use("/routeHandler", require("./routes/api/routeHandler"));

app.all('*', (req, res) => {
  res.status(404);
	if (req.accepts('html')) {
		res.sendFile(path.join(__dirname, 'views', '404.html'));
	} else if (req.accepts('json')) {
		res.json({error: "404 Not Found"});
	} else {
		res.type('txt').send('404 Not Found');
	}
});

mongoose.connection.once('open', () => {
	console.log('Connected to MongoDB');
	app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});