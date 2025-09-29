
require('dotenv').config({ path: '../server/.env' });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../server/models/User'); // Assuming the User model is in the server directory

const newUsername = process.argv[2];
const newPassword = process.argv[3];

if (!newUsername || !newPassword) {
  console.error('ত্রুটি: অনুগ্রহ করে নতুন ইউজারনেম এবং পাসওয়ার্ড দিন।');
  console.log('ব্যবহার: node reset-admin.js <new_username> <new_password>');
  process.exit(1);
}

const resetAdminPassword = async () => {
  try {
    // Connect to DB
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB ডাটাবেস সংযুক্ত হয়েছে।');

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Find and update the admin user, or create if it doesn't exist
    let adminUser = await User.findOne({ role: 'admin' });

    if (adminUser) {
      // Update existing admin
      adminUser.username = newUsername;
      adminUser.password = hashedPassword;
      await adminUser.save();
      console.log(`অ্যাডমিন সফলভাবে আপডেট করা হয়েছে। নতুন ইউজারনেম: ${newUsername}`);
    } else {
      // Create new admin user
      adminUser = new User({
        username: newUsername,
        email: `${newUsername}@example.com`, // Placeholder email
        password: hashedPassword,
        role: 'admin'
      });
      await adminUser.save();
      console.log(`কোনো অ্যাডমিন পাওয়া যায়নি। নতুন অ্যাডমিন তৈরি করা হয়েছে। ইউজারনেম: ${newUsername}`);
    }

  } catch (error) {
    console.error('একটি ত্রুটি ঘটেছে:', error);
  } finally {
    // Disconnect from DB
    await mongoose.disconnect();
    console.log('MongoDB সংযোগ বিচ্ছিন্ন হয়েছে।');
    process.exit(0);
  }
};

resetAdminPassword();
