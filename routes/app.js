'use strict';

const request = require('request');
var fs = require("fs");

// Replace <Subscription Key> with your valid subscription key.
const subscriptionKey = 'd25c2cf12334495f9761e3b74c9204b1';

// You must use the same location in your REST call as you used to get your
// subscription keys. For example, if you got your subscription keys from
// westus, replace "westcentralus" in the URL below with "westus".
//const uriBase = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect';

//const imageUrl ='https://upload.wikimedia.org/wikipedia/commons/3/37/Dagestani_man_and_woman.jpg';

// Request parameters.
/*const params = {
    'returnFaceId': 'true',
    'returnFaceLandmarks': 'false',
    'returnFaceAttributes': 'age,gender,headPose,smile,facialHair,glasses,' +
        'emotion,hair,makeup,occlusion,accessories,blur,exposure,noise'
};

const options = {
    uri: uriBase,
    qs: params,
    body: '{"url": ' + '"' + imageUrl + '"}',
    headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key' : subscriptionKey
    }
};

request.post(options, (error, response, body) => {
  if (error) {
    console.log('Error: ', error);
    return;
  }
  let jsonResponse = JSON.stringify(JSON.parse(body), null, '  ');
  console.log('JSON Response\n');
  console.log(jsonResponse);
});
*/
/*var personGroupId="hotelbookapp";
const personGroupUrl = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/persongroups/"+personGroupId;
const params = {
};
const options = {
    uri: personGroupUrl,
	qs: params,
	body: "{'name': 'hotelbookapp','userData': 'user-provided data attached to the person group.'}",
    headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key' : subscriptionKey
    }
};
request.put(options, (error, response, body) => {
  if (error) {
    console.log('Error: ', error);
    return;
  }
  console.log(JSON.stringify(JSON.parse(body)));
  console.log(JSON.stringify(JSON.parse(response)));
});*/

//Created Person ID
//{"personId":"2cc2e0fd-06bd-4415-8133-c13b852668d9"}
/*const createPersonUrl ="https://westcentralus.api.cognitive.microsoft.com/face/v1.0/persongroups/hotelbookapp/persons";
const params = {
};
const options = {
    uri: createPersonUrl,
	qs: params,
	body: "{'name': 'Souvik','userData': 'souvik banerjee.31.male'}",
    headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key' : subscriptionKey
    }
};
request.post(options, (error, response, body) => {
  if (error) {
    console.log('Error: ', error);
    return;
  }
  console.log(JSON.stringify(JSON.parse(body)));
});
*/
/*
fs.readFile('image.jpg', function(err, data) {
  if (err) throw err;

  // Encode to base64
  var encodedImage = new Buffer(data, 'binary');
  fs.writeFile("test.txt", encodedImage, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 
  // Decode from base64
 // var decodedImage = new Buffer(encodedImage, 'base64').toString('binary');
});
*/

const createPersonFaceUrl ="https://westcentralus.api.cognitive.microsoft.com/face/v1.0/persongroups/hotelbookapp/persons/2cc2e0fd-06bd-4415-8133-c13b852668d9/persistedFaces";
const params = {
	 "userData": "souvik",
      "targetFace": "",
};
fs.readFile('test.txt', function(err, data) {
  const options = {
    uri: createPersonFaceUrl,
	qs: params,
	body: '{"' + data + '"}',
    headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key' : subscriptionKey
    }
};
request.post(options, (error, response, body) => {
  if (error) {
    console.log('Error: ', error);
    return;
  }
  console.log(JSON.stringify(JSON.parse(body)));
});
  
});

