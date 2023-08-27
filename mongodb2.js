const mongoose = require('mongoose');

// Define the session schema
const sessionSchema = new mongoose.Schema({
  sessionId: String,
  userId: String,
  expirationTime: Date,
});

const Session = mongoose.model('Session', sessionSchema);

// Create a new session
async function createSession(userId) {
  const expirationTime = new Date();
  expirationTime.setHours(expirationTime.getHours() + 24);

  const newSession = new Session({
    sessionId: generateUniqueSessionId(),
    userId,
    expirationTime,
  });

  await newSession.save();
  return newSession.sessionId;
}

// Verify a session
async function verifySession(sessionId) {
  const session = await Session.findOne({
    sessionId,
    expirationTime: { $gt: new Date() }, // Check if session has not expired
  });

  return session ? session.userId : null;
}

// Function to generate a unique session ID (you need to implement this)
function generateUniqueSessionId() {
  // Implement your logic to generate a unique session ID
}

// Schedule a cleanup task to remove expired sessions
async function cleanupExpiredSessions() {
  await Session.deleteMany({ expirationTime: { $lt: new Date() } });
}

// Set up your MongoDB connection and start the cleanup task
mongoose.connect('mongodb://127.0.0.1:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB2');
    cleanupExpiredSessions(); // Start the cleanup task
  })
  .catch(err => console.error('MongoDB connection error:', err));

  module.exports= Session;