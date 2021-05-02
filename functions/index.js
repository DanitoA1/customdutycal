/* eslint-disable */
const functions = require("firebase-functions");

const admin = require("firebase-admin");

admin.initializeApp();

const db = admin.firestore();

exports.AddUserRole = functions.auth.user().onCreate(async (authUser) => {
  if (authUser.email) {
    const customClaims = {
      user: true,
    };
    try {
      const _ = await admin.auth().setCustomUserClaims(authUser.uid, customClaims);
    
      return db.collection("roles").doc(authUser.uid).set({
        email: authUser.email,
        createdOn: new Date(),
        role: customClaims,
      });
    } catch (error) {
      console.log(error);
    }
  }
});
exports.setUserRole = functions.https.onCall(async (data, context) => {

  if (!context.auth.token.superAdmin) return

  try {
    var _ = await admin.auth().setCustomUserClaims(data.uid, data.role)

    return db.collection("roles").doc(data.uid).update({
      role: data.role
    })

  } catch (error) {
    console.log(error)
  }

});