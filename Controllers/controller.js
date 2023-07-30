const LoginSchema = require('../schemas/login_schema');
const SlotSchema = require('../schemas/Slot_schema');
const mongoose = require('mongoose');
const { ObjectId } = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const DashSchema = require('../schemas/dash_schema');

const Login =  async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await LoginSchema.findOne({ username });
        if (!user) {
          return res.status(401).json({ message: 'Authentication failed' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          return res.status(401).json({ message: 'Authentication failed' });
        }
        res.json({ userId: user._id.toString() });
        console.log({ userId: user._id.toString() });
      } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ message: 'Login failed' });
      }
};

const Register = async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingUser = await LoginSchema.findOne({ username });
        if (existingUser) {
          return res.status(409).json({ message: 'Username already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new LoginSchema({ username, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'Registration successful' });
      } catch (err) {
        console.error('Error during registration:', err);
        res.status(500).json({ message: 'Registration failed' });
    }
};

const Books = async (req, res) => {
  try{
    SlotSchema.find({})
    .then(data => {
      res.json(data);
      console.log(data);
    })
    .catch(err => {
      console.error('Error retrieving data:', err);
      res.status(500).send('Internal Server Error');
    });
  }catch(err){
    console.error('Error during registration:', err);
    res.status(500).json({ message: 'wasnt able to fetch the data' });
  }
}

const ConfBook= async (req, res) => {
  try {
    const id = req.params.id;
    const item = await SlotSchema.findById(id);
    res.json(item);
  } catch (error) {
    console.error('Error retrieving item:', error);
    res.status(500).send('Internal Server Error');
  }
}

const ConfBooked = async (req, res) => {
  try {
    const { id, slotNumber , userId } = req.params;
    console.log(id);
    console.log(slotNumber);
    console.log(userId);
    const { slots } = req.body; 
    await SlotSchema.findByIdAndUpdate(id, { $set: { [`slots.${slotNumber}`]: false } });
    let dashDoc = await DashSchema.findOne({ 'user.id': userId });

    if (!dashDoc) {
      dashDoc = new DashSchema({
        user: {
          id : userId,
          slots: {
            ...slots,
            [slotNumber]: false,
          },
        },
      });
    } else {
      dashDoc.user.slots[slotNumber] = false;
    }
    await dashDoc.save();

    res.sendStatus(200);
  } catch (error) {
    console.error('Error updating slot status:', error);
    res.status(500).send('Internal Server Error');
  }
}

const getUserData = async (req, res) => {
  try {
    const { userId } = req.params;
    const userData = await DashSchema.findOne({ 'user.id': userId });

    if (!userData) {
      return res.status(404).json({ message: 'User data not found' });
    }
    res.status(200).json(userData);
  } catch (error) {
    console.error('Error getting user data:', error);
    res.status(500).json({ message: 'Failed to retrieve user data' });
  }
};

module.exports = { Login , Register , Books , ConfBook , ConfBooked , getUserData};