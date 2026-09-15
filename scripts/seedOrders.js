const mongoose = require('mongoose');

const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017/AI-Healthcare';

async function seedOrders() {
  try {
    console.log('Connecting to MongoDB at:', DB_URL);
    await mongoose.connect(DB_URL);
    console.log('MongoDB connected successfully.');

    const db = mongoose.connection.db;

    // Fetch existing users and products if any
    const users = await db.collection('users').find({}).limit(5).toArray();
    const products = await db.collection('products').find({}).limit(5).toArray();

    console.log(`Found ${users.length} users and ${products.length} products.`);

    const userId1 = users[0]?._id || new mongoose.Types.ObjectId();
    const userId2 = users[1]?._id || new mongoose.Types.ObjectId();

    const prodId1 = products[0]?._id || new mongoose.Types.ObjectId();
    const prodId2 = products[1]?._id || new mongoose.Types.ObjectId();
    const prodPrice1 = products[0]?.price || 150;
    const prodPrice2 = products[1]?.price || 320;

    const sampleOrders = [
      {
        user: userId1,
        paymetStatus: 'success',
        shippingAddress: 'No. 42, 4th Cross Street, Anna Nagar, Chennai, Tamil Nadu - 600040',
        items: [
          {
            product: prodId1,
            quantity: 2,
          },
        ],
        price: prodPrice1 * 2,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
        updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
      },
      {
        user: userId1,
        paymetStatus: 'pending',
        shippingAddress: '15/B, Avinashi Road, Peelamedu, Coimbatore, Tamil Nadu - 641004',
        items: [
          {
            product: prodId1,
            quantity: 1,
          },
          {
            product: prodId2,
            quantity: 2,
          },
        ],
        price: prodPrice1 * 1 + prodPrice2 * 2,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
        updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 5),
      },
      {
        user: userId2,
        paymetStatus: 'success',
        shippingAddress: '88, Bypass Road, Ponmeni, Madurai, Tamil Nadu - 625016',
        items: [
          {
            product: prodId2,
            quantity: 3,
          },
        ],
        price: prodPrice2 * 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    // Insert into 'oders' collection (matches mongoose.model('Oders', ...))
    const result = await db.collection('oders').insertMany(sampleOrders);
    console.log(`Successfully inserted ${result.insertedCount} sample orders into 'oders' collection!`);

    const totalOrders = await db.collection('oders').countDocuments();
    console.log(`Total orders in DB now: ${totalOrders}`);

    await mongoose.disconnect();
    console.log('Done!');
  } catch (error) {
    console.error('Error seeding orders:', error);
    process.exit(1);
  }
}

seedOrders();
