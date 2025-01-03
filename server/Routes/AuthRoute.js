const { Signup, Login, UpdateAccount, GetCurrentUser } = require("../Controllers/AuthController");
const { userVerification } = require("../Middlewares/AuthMiddleware");
const router = require("express").Router();
const Receipt_id = require('../Models/Receipt_id');
const Receipt = require('../Models/User_Receipt');
//const UserReceipt = require('../Models/User_Receipts');
const User = require('../Models/UserModel');
const UserInfo = require('../Models/UserModel');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

router.post('/signup', Signup);
router.post('/login', Login)
router.post('/', userVerification)
router.post('/update_account', UpdateAccount); 

router.put('/api/create_receipt', async (req, res) => {
  try {
    const { receipt_id, timestamp, store_number, donation_value, userId } = req.body;

    const newReceipt = new Receipt({
      receipt_id,
      timestamp,
      store_number,
      donation_value
    });
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }
    // Find the correct index to insert newReceipt in sorted order
    let i = user.user_receipts.length - 1;
    while (i >= 0 && new Date(user.user_receipts[i].timestamp) > new Date(timestamp)) {
      i--;
    }

    // Insert newReceipt at the correct position
    user.user_receipts.splice(i + 1, 0, newReceipt);

    await user.save();

    res.send({user});
  } catch (error) {
    console.log(error);
    res.status(500).send(`Server error: ${error.message}`);
  }
});

router.put('/api/receipt', async (req, res) => {
  console.log("updating receipt donation value: " + req.query.id);
  try {
    const receipt = await Receipt_id.findOne({'receipt_id': req.query.id});
    if (!receipt) {
      return res.status(404).send('Receipt not found');
    }

    receipt.donation_value = req.body.donation_value;
    await receipt.save();

    res.send(receipt);
  } catch (error) {
    res.status(501).send('Server error');
  }
});

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
  
  try {
const { newReceipt, userInfo } = req.body;
const user = await User.findById(userInfo._id);
    if (!user) {
      return res.status(404).send('User not found');
    }
    //const user = userData;
    console.log("New Receipt in server: " + newReceipt);
    user.user_receipts.push(newReceipt);

    await user.save();
    res.send({user});
  } catch (error) {
    console.error(error);
    res.status(500).send('Server errorr');
  }
});
/*
router.put('/users/:id', async (req, res) => {
  
  try {
    const { newReceipt } = req.body;
    // Check if newReceipt is provided
    if (!newReceipt) {
      return res.status(400).send('No receipt provided');
    }
    const user = await User.findById(req.params.id);
    // Check if user exists
    if (!user) {
      return res.status(404).send('User not found');
    }
    console.log("User before server: ", user);
  // Separate the info in newReceipt
  const { receipt_id, timestamp, store_number, donation_value } = newReceipt;
  console.log("Receipt ID: ", receipt_id);
  
  
  // Create a new Receipt object with the separated info
  const newReceiptObject = {
    receipt_id,
    timestamp,
    store_number,
    donation_value
  };

  // Add the newReceiptObject to the user's user_receipts array
  user.user_receipts.push(newReceiptObject);

  // Save the updated user back to the database
  await user.save();

    console.log("User in server: ", user);

    // Save the updated user back to the database
    //await user.save();

    res.send({ user });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});*/


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