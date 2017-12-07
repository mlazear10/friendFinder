var friends = require("../data/friends");

module.exports = function(app) {
    app.get("/api/friends", function(req, res) {
        res.json(friends);
      });

    app.post("/api/friends", function(req, res) {

        var bestMatch = {
            name: "",
            photo: "",
            friendDifference: Infinity
        };

        // console.log(req.body);
        
        // here we take the result of the user's survey POST and parse it
        var userData = req.body;
        var userScores = userData.scores;

        // console.log(userScores);

        // this variable will calculate the difference bewteen the user's scores and the scores of each user in the database
        var totalDifference;
        // loop through the friend possiblities to find the total differences
        for (var i = 0; i < friends.length; i++) {
            // console.log(friends[i]);
            totalDifference = 0;
            //We then loop throught the scores of each friend
            for (var j = 0; j < friends[i].scores[j]; j++) {
                // we calculate the difference bw the scores and sum them into the totalDifference
                totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));
                // If the sum of the differnces is less than the differences of the current best match
                if (totalDifference <= bestMatch.friendDifference) {
                    //reset the bestMatch to be the new friend
                    bestMatch.name = friends[i].name;
                    bestMatch.photo = friends[i].photo;
                    bestMatch.friendDifference = totalDifference;
                }
            }
        }
        // Finally save the user's data o the database (this has to happen AFTER the check, otherwise, the database will always return the user is the user's best friend).
        friends.push(userData);
        //return a JSON object with the user's bestMatch. This will be sued by the HMTL in the next page
        res.json(bestMatch);
    });
}

