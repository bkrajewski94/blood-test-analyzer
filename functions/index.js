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


exports.delete = functions.firestore
  .document('users/{userId}/results/{resultId}')
  .onDelete(async (snapshot, context) => {
    const { userId, resultId } = context.params;
    const resultSummaryRef = firestore.collection(`users/${userId}/resultsSummary`).where("resultId", "==", resultId);
    const resultSnapshot = await resultSummaryRef.get();

    if (resultSnapshot.empty) return;

    return resultSnapshot.forEach(doc => {
      doc.ref.delete();
    });
  })

exports.summaryDelete = functions.firestore
  .document('users/{userId}/resultsSummary/{summaryId}')
  .onDelete(async (snapshot, context) => {
    const { resultId } = snapshot.data();
    const { userId } = context.params;

    const resultRef = firestore.doc(`users/${userId}/results/${resultId}`)
    const resultSnapshot = await resultRef.get();

    if (!resultSnapshot.exists) return;

    return resultRef.delete();
  })