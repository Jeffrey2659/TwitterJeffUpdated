
// This links the MongoDB schema to the java script so it is an object of the schema in a sense
const Tweet = require('../model/tweets');

// this is a function to get all the tweets from the MongoDB database
const getTweets = async(req,res) =>{
  // find function gets all the tweets 
  const TweetDB = await Tweet.find();
  //res.json() needs the colon to seperate the what is being sent and what the actual message is
  if(!TweetDB) return res.status(204).json({'message': 'no tweet found'});
  res.json(TweetDB);
}
const createTweet = async(req,res) =>{
   if(!req?.body?.username || !req?.body?.tweet) return res.status(400).json({'message' : 'Username and tweet required'});
    try{
      //gets the values of the properties from the mongoDB database
      // Tweet.create is not afunction apparentyl 
      const maketweet= await Tweet.create({
        username: req.body.username,
        tweet: req.body.tweet
      });
      res.sendStatus(200);
    }
    catch(err){
      console.error(err);
    }
  }


module.exports = {getTweets,createTweet};
