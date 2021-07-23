var url = pm.variables.get("Auth_Url");
const postRequest = {
  url: url,
  method: 'POST',
  header: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  body: {
    mode: 'urlencoded',
    urlencoded: [
            {key: "client_id", value: pm.variables.get("id"), disabled: false},
            {key: "client_secret", value: pm.variables.get("secret"), disabled: false}
        ]
  }
};

var tokenDate = new Date(2010,1,1);
var tokenTimestamp = pm.environment.get("OAuth_Timestamp");
if(tokenTimestamp){
  tokenDate = Date.parse(tokenTimestamp);
}
var expiresInTime = pm.environment.get("ExpiresInTime");
if(!expiresInTime){
    expiresInTime = 3600000; // Set default expiration time to 5 minutes
}
if((new Date() - tokenDate) >= expiresInTime) 
{
    pm.sendRequest(postRequest, (error, response) => {
        console.log(error ? error : response.json());
        var authresponse = response.json();
        pm.environment.set("OAuth_Token", authresponse['access_token']);
        pm.environment.set("OAuth_Timestamp", new Date());
        
        // Set the ExpiresInTime variable to the time given in the response if it exists
        if(response.json().expires_in){
            expiresInTime = response.json().expires_in * 1000;
        }
        pm.environment.set("ExpiresInTime", expiresInTime);
});
};
