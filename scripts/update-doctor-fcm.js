const mongoose = require('mongoose');

async function main() {
  await mongoose.connect('mongodb://localhost:27017/AI-Healthcare');
  const res = await mongoose.connection.collection('doctors').updateMany(
    {},
    { $set: { fcmtoken: 'default_fcm_token_placeholder' } }
  );
  console.log('Doctors updated:', res.modifiedCount);
  const doc = await mongoose.connection.collection('doctors').findOne({});
  console.log('Doctor name:', doc.name, '| fcmtoken:', doc.fcmtoken);
  await mongoose.disconnect();
}

main().catch(console.error);
