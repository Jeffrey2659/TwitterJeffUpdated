
//allows us to use express functions
const express = require("express");

// intializing router instance
const router = express.Router();
//brining in the functions from the database
const tweetController = require("../../controllers/tweetController");

// ig this redurects the routes to these functions
router.route('/')
.get(tweetController.getTweets)
.post(tweetController.createTweet);

module.exports =router;