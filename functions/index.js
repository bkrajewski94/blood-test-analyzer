const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const firestore = admin.firestore();

exports.create = functions.firestore
  .document('users/{userId}/results/{resultId}')
  .onCreate(async (snapshot, context) => {
    const { userId, resultId } = context.params;
    const userRef = firestore.collection(`users/${userId}/resultsSummary`);

    const newSummaryElement = {
        resultId: resultId,
        createdAt: new Date()
    }

    return userRef.add(newSummaryElement);
  });
