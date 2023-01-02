const Message = require('../Models/Message')




const addMessage = async (data) => {
    const json = JSON.parse(data);
    console.log(json.receiverId)
    
	let message = new Message({
		sender: json.senderId,
		receiver: json.receiverId,
		type: json.type,
		message: json.message
	})

	await message.save();
}


module.exports = {
    addMessage
}