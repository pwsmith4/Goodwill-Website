const { Signup, Login, UpdateAccount, GetCurrentUser } = require("../Controllers/AuthController");
const { userVerification } = require("../Middlewares/AuthMiddleware");
const router = require("express").Router();
const Receipt_id = require('../Models/Receipt_id');
const User = require('../Models/UserModel');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

router.post('/signup', Signup);
router.post('/login', Login)
router.post('/', userVerification)
router.post('/update_account', UpdateAccount); // Add this line

router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
});

router.get('/api/receipt_ids', async (req, res) => {
  try{
  console.log(`${process.env.REACT_APP_BASE_URL}/api/receipt_ids?id=${req.query.id}`);

  const test = await Receipt_id.findOne({ 'receipt_id': req.query.id });  
  console.log("Test: ", test);

  if (!test) {
    return res.status(404).json(null);
  }

  res.send(test);
} catch (error) {
  res.status(501).send('Server error');
}
});

router.get('/api/id', async (req, res) => {
  try{
  console.log(`${process.env.REACT_APP_BASE_URL}/api/id?id=${req.query.id}`);
  console.log("ID sent to server: " + req.query.id);

  const test = await Receipt_id.findOne({ '_id': req.query.id });  

  if (!test) {
    return res.status(404).json(null);
  }

  res.send(test);
} catch (error) {
  res.status(501).send('Server error');
}
});

router.put('/users/:id', async (req, res) => {
  console.log("ID sent to server: " + req.params.id);
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send('User not found');
    }

    user.receipts = req.body.receipts;    

    await user.save();
    res.send({ user });
  } catch (error) {
    res.status(501).send('Server error');
  }
});

router.get('/current_user', userVerification, async (req, res) => {
  try{
  console.log("ID sent to server: " + req.query.id);
    // Assuming req.userId contains the id of the current user
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).send('User not found');
    }
    // Exclude password from the user data for security reasons
    const userData = user.toObject();
    delete userData.password;
  
    res.send({ user: userData });
  } catch (error) {
    res.status(501).send('Server error');
  }
  });
module.exports = router;