const express = require('express');
const Message = require('../Models/Message')
const route = express.Router();

   
//show messages list
const getMessages = (req,res,next)  => {

	try 
	{
	    Message.find({'sender':req.body.senderId,'receiver':req.body.connectedId}).exec(function (err, messages) {
	        if (err) {
	            return res.json({
	            message: ('error get messages ' + err)
	            });
	        }
	        else {
	        	var chat = []
	        	if (messages.length==0) {//try backwards
	        		console.log("trying backwards");
					    Message.find({'sender':req.body.connectedId,'receiver':req.body.senderId}).exec(function (err, secondmessages) {
					        if (err) {
					            return res.json({
					            message: ('error get messages ' + err)
					            });
					        }
					        else {
					        	if (secondmessages.length==0) {//try backwards
					        		res.json([]);
									console.log("asef")
					        	} else {
					        		res.json(secondmessages);
									console.log(secondmessages)
					        	}
					        }
					    });
	        	} else {
	        		console.log("normal");
	        		for (var i = 0; i < messages.length; i++) {
	        			chat.push(messages[i])
	        		}
	        		console.log("looking for more");
	        		Message.find({'sender':req.body.connectedId,'receiver':req.body.senderId}).exec(function (err, secondmessages) {
					        if (err) {
					            return res.json({
					            message: ('error get messages ' + err)
					            });
					        }
					        else {
					        	if (secondmessages.length==0) {
					        		res.json(chat);
									console.log(chat)
					        	} else {
					        		for (var i = 0; i < secondmessages.length; i++) {
					        			chat.push(secondmessages[i])
					        		}
					        		res.json(chat);
									console.log(chat)
					        	}
					        }
					    });
	        		//res.json(messages);
	        	}
	        }
	    });

	} catch (err) {
	    console.log(err);
	    res.json({
	        message: '500 Internal Server Error'
	    })

	}
}

//add product
const addMessage = (req,res,next) => {

	let message = new Message({
		sender: req.body.sender,
		receiver: req.body.receiver,
		type: req.body.type,
		message: req.body.message
	})

	message.save()
	.then(response => {
		res.json({
			message:"message Added Successfully"
		})
	})
	.catch(error  => {
		res.json({
			message: "an error occured when adding message"
		})
	})
}

route.post('/getMessages', getMessages);
route.post('/addMessage', addMessage);



module.exports = route;