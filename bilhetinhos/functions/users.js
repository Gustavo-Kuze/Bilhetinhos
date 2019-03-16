const cors = require('cors')({ origin: true });
const admin = require('firebase-admin');

admin.initializeApp();

const getAllUsers = (req, resp) => {
    return cors(req, resp, () => {
        admin.database().ref('users/').once('value').then(usersSnapshot => {
            resp.json(usersSnapshot.toJSON())
            return (usersSnapshot.toJSON())
        }).catch(err => {
            resp.json(err)
        })
    });
}

const registerUser = (req, resp) => {
   return cors(req, resp, () => {
       admin.database().ref(`users`).child(req.body.uid).set({
           bio: req.body.user.bio || "",
           email: req.body.user.email || "",
           name: req.body.user.name || "",
           phone: req.body.user.phone || "",
           profilePic: req.body.user.profilePic || "",
           coverPic: req.body.user.coverPic || "",
           mates: req.body.user.mates || []
       })
       .then(data => {
           resp.json(data)
           return data
       }).catch(err => resp.json(err))

   });
}

module.exports = {
    registerUser, getAllUsers
}