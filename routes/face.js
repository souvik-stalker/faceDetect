const express = require('express');
const request = require('request');
var fs = require("fs");
const router = express.Router();
//const subscriptionKey = 'd25c2cf12334495f9761e3b74c9204b1';
//{"persistedFaceId":"e19fe3ed-27a1-4e0b-b87b-b92d67bd5aa7"}


router.post('/createPerson',(req,res,next)=>{
	const subscriptionKey = req.body.subscriptionKey;
	const base64Data =req.body.base64Data;
	const name = req.body.name;
	const createPersonUrl ="https://westcentralus.api.cognitive.microsoft.com/face/v1.0/persongroups/hotelbookapp/persons";
	var binaryData = new Buffer(base64Data, 'base64').toString('binary');

	require("fs").writeFile("images/"+name+".jpg", binaryData, "binary", function(err) {
			
			const params = {};
			const options = {
			uri: createPersonUrl,
			qs: params,
			body: '{"name": ' + '"' + name + '","userData":' + '"' + name + '"}',
			headers: {
				'Content-Type': 'application/json',
				'Ocp-Apim-Subscription-Key' : subscriptionKey
			}
		};
		    
			request.post(options, (error, response, body) => {
			  if (error) {
				res.status(404).json({error:error});
				return;
			  }
			  var outPut = JSON.parse(body);
			  console.log(outPut.personId);
			  if(outPut.personId){
				 const createPersonFaceUrl ="https://westcentralus.api.cognitive.microsoft.com/face/v1.0/persongroups/hotelbookapp/persons/"+outPut.personId+"/persistedFaces";
				 const params = {
						 "userData": name,
						  "targetFace": "",
					}; 
				const options = {
					uri: createPersonFaceUrl,
					qs: params,
					body: '{"url": "http://localhost:3000/images/'+name+'.jpg"}',
					headers: {
						'Content-Type': 'application/json',
						'Ocp-Apim-Subscription-Key' : subscriptionKey
					}
				};
				
				request.post(options, (error, response, body) => {
					  if (error) {
						console.log('Error: ', error);
						res.status(404).json({error:error});
						return;
					  }
					  res.status(200).json({message:body});
					});
			  }
			  
			});
	});

});



router.post('/train',(req,res,next)=>{
	const subscriptionKey = req.body.subscriptionKey;
	const createPersonFaceUrl ="https://westcentralus.api.cognitive.microsoft.com/face/v1.0/persongroups/hotelbookapp/train";
	const params = {
	};
	const options = {
    uri: createPersonFaceUrl,
	qs: params,
	body: '{}',
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
	  res.status(200).json({
				  message:body
				});
	});
});

router.post('/trainingStatus',(req,res,next)=>{
	const subscriptionKey = req.body.subscriptionKey;
	const createPersonFaceUrl ="https://westcentralus.api.cognitive.microsoft.com/face/v1.0/persongroups/hotelbookapp/training";
	const params = {
	};
	const options = {
    uri: createPersonFaceUrl,
	qs: params,
    headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key' : subscriptionKey
    }
};
	request.get(options, (error, response, body) => {
	  if (error) {
		console.log('Error: ', error);
		return;
	  }
	  res.status(200).json({
				  message:body
				});
	});
});

router.post('/detectFace',(req,res,next)=>{
	const subscriptionKey = req.body.subscriptionKey;
	const base64Data =req.body.base64Data;
	const name = req.body.name;
	
	var binaryData = new Buffer(base64Data, 'base64').toString('binary');

	require("fs").writeFile("images/"+name+".jpg", binaryData, "binary", function(err) {
		const createPersonFaceUrl ="https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true";
		const params = {
		};
		const options = {
			uri: createPersonFaceUrl,
			qs: params,
			body: '{"url": "http://localhost:3000/images/'+name+'.jpg"}',
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
			  var outPut = JSON.parse(body);
			  if(outPut.faceId){
				  
					const createPersonFaceUrl ="https://westcentralus.api.cognitive.microsoft.com/face/v1.0/identify";
					const params = {
					};
					const options = {
					uri: createPersonFaceUrl,
					qs: params,
					body: '{"personGroupId": "hotelbookapp","faceIds":["'+outPut.faceId+'"],"maxNumOfCandidatesReturned": 1,"confidenceThreshold": 0.5}',
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
					  console.log(body);
					  res.status(200).json({
								  message:body
								});
					});
			  }
			  
			});
	});
	
});


module.exports = router;
