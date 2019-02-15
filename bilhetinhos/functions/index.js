const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.getAllUsers = functions.https.onRequest((req, res) => {
    admin.database().ref('users/').once('value').then(usersSnapshot => {
        res.json(usersSnapshot.toJSON())
        return (usersSnapshot.toJSON())
    }).catch(err => {
        res.json(err)
    })
})

exports.registerUser = functions.https.onRequest((req, res) => {
    admin.database().ref(`users`).child(req.body.uid).set(req.body).then(() => {
        res.json(req.body)
        return req.body
    }).catch(err => res.json(err))
})

exports.callableRegisterUser = functions.https.onCall((data) => {
    return new Promise((res, rej) => {
        admin.database().ref(`users`).child(data.uid).set({
            bio: data.user.bio || "",
            email: data.user.email || "",
            name: data.user.name || "",
            phone: data.user.phone || "",
            profilePic: data.user.profilePic || "",
            mates: data.user.mates || []
        })
            .then(data => {
                res(data)
                return data
            }).catch(err => rej(err))
    })
})