var Mailgun = require('mailgun');
Mailgun.initialize('sandboxd2064f0b8f7a41cd8ec4a3b3288ae134.mailgun.org', 'pubkey-cc5d6cd3d56ff18849a5fc4de3235973');

Parse.Cloud.beforeSave("CommentObject", function(request, response) {

	var text = "Support Ticket\n" +
		"Branch: "+request.object.get("branch") + "\n"+
		"Name: "+request.object.get("contactName") + "\n"+
		"Email: "+request.object.get("email") + "\n\n"+
    "Phone: "+request.object.get("phone") + "\n\n"+
		"Description:\n" + request.object.get("description");

	Mailgun.sendEmail({
			to: "kyle.richardson@johnstonesupply.com",
			from: request.object.get("email"),
			subject: "Johnstone Support Request - " + request.object.get("description"),
			text: text
		}, {
		success: function(httpResponse) {
			response.success();
		},
		error: function(httpResponse) {
			console.error(httpResponse);
			response.error("Something went wrong");
		}
	});

});
