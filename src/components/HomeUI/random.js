// const callId = callInput;
// const callDoc = firestore.collection('calls').doc(callId);
// const answerCandidates = callDoc.collection('answerCandidates');
// const offerCandidates = callDoc.collection('offerCandidates');

// pc.onicecandidate = (event) => {
//   event.candidate && answerCandidates.add(event.candidate.toJSON());
// };

// const callData = (await callDoc.get()).data();
// console.log('callData');
// console.log(callData);
// const offerDescription = callData.offer;
// await pc.setRemoteDescription(new RTCSessionDescription(offerDescription));

// const answerDescription = await pc.createAnswer();
// await pc.setLocalDescription(answerDescription);

// const answer = {
//   type: answerDescription.type,
//   sdp: answerDescription.sdp,
// };

// await callDoc.update({ answer });

// offerCandidates.onSnapshot((snapshot) => {
//   snapshot.docChanges().forEach(async (change) => {
//     console.log(change);
//     if (change.type === 'added') {
//       let data = change.doc.data();
//       console.log(`Got new remote ICE candidate: ${JSON.stringify(data)}`);
//       await pc.addIceCandidate(new RTCIceCandidate(data));
//     }
//   });
// });
