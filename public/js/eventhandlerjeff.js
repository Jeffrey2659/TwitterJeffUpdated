
// waits for the page to be loaded in completly 
document.addEventListener("readystatechange", (event) => {
	if (event.target.readyState === "complete") {
		init();
	}
});




const init =()=>{
// function to pull in all the tweets
const form = document.getElementById('tweets-form');
 loadFeed();
form.addEventListener("submit", (event)=>{

  event.preventDefault();
  try{
    const username =document.getElementById("username");
    const tweettxt = document.getElementById("tweet");
    event.preventDefault();
  
    //console.log(username.value, tweettxt.value, username.value.length);
    if(!username.value  || !tweettxt.value ) {
      alert('Please input a username or tweet');
    } 
    else if(username.value.length >50 || tweettxt.value.length > 280 ){
        alert("Characters exceed limit");
    }else{
        alert('all good')
        // postTweet(username,tweettxt);
      }
  
  }
  catch (err){
    console.log(err);
  }
  finally{
  loadFeed();
  }
 
}) 
};

const loadFeed = async()=>{
  const response = await fetch("/routeHandler",{ 
    method: "GET",
    headers:{
      "Content-Type" : "application/json",
    },

  });
  

  if(response.status == 204){
    alert('No tweets')
    return;
  }
// turning all the tweets into json text to display in the html
  const responseJson =await response.json();
  let feed ='';
// displaus the tweets in order from newest to oldest
  for( let i = responseJson.length -1; i >=0;i--){
    feed += ` <div class="tweet-container">
    <div class="profile-img">
    <img  class="pfp-pic" src ="/JeffreyTwitter/public/img/profileicon.png" alt="profile">
    </div>
    <div class="tweets-place">
      <div class="tweet-username">${responseJson[i].username}</div>

      
      <div class="tweet-text">${responseJson.tweet[i]}</div>
    </div>
  </div>
    `;
  }
  //<div class="tweet-text">${responseJson.tweettxt[i]}</div>   this line may cause issues cuz idk if this is from the schema or from the html doc, look to change if not working
  // this makes sure the tweets actually appear inside the tweet container
  document.getElementById('tweets').innerHTML = feed;


}

const postTweet =async (username,tweettxt) => {

  const url = '/routeHandler';
  // basically getting the the tweet username and passwor into one variable  ig
  const tweet = {
    username: username,
    tweettxt:tweettxt,
  };

  const response = await fetch(url,{
    method : "POST",
    headers : {
      "content-type" : "application/json"
    },
    // combines the tweet data to json
    // cant tell if this posts to database or tho the website
    body : JSON.stringify(tweet),
  });

}
// The JSON.stringify() static method converts a JavaScript value to a JSON string
//console.log(JSON.stringify({ x: 5, y: 6 }));
// Expected output: '{"x":5,"y":6}'
