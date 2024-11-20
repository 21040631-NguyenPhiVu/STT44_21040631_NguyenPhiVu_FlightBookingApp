const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const port = 4000;
const secretKey = 'my_secret_key';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect('mongodb://localhost:27017/flightbooking');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    gender: String,
    email: { type: String, unique: true },
    phone: String,
    password: String,
});

const User = mongoose.model('User', userSchema);

app.post('/register', async (req, res) => {
    try {
        const { firstName, lastName, gender, email, phone, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            firstName,
            lastName,
            gender,
            email,
            phone,
            password: hashedPassword,
        });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token, user });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

const fromSuggestionSchema = new mongoose.Schema({
    id: String,
    city: String,
    country: String,
    subtitle: String,
    airports: [
        {
            name: String,
            code: String,
            distance: String,
        },
    ],
});

const toSuggestionSchema = new mongoose.Schema({
    id: String,
    city: String,
    country: String,
    subtitle: String,
    airports: [
        {
            name: String,
            code: String,
            distance: String,
        },
    ],
    isSpecial: Boolean,
});
const FromSuggestion = mongoose.model('FromSuggestion', fromSuggestionSchema);
const ToSuggestion = mongoose.model('ToSuggestion', toSuggestionSchema);

const cabinClassSchema = new mongoose.Schema({
    name: { type: String, required: true },
})

const CabinClass = mongoose.model('CabinClass', cabinClassSchema);

app.get('/api/fromSuggestions', async (req, res) => {
    try {
        const fromSuggestions = await FromSuggestion.find();
        res.json(fromSuggestions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching fromSuggestions', error });
    }
});


app.get('/api/toSuggestions', async (req, res) => {
    try {
        const toSuggestions = await ToSuggestion.find();
        res.json(toSuggestions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching toSuggestions', error });
    }
});

app.get('/api/cabin-classes', async (req, res) => {
    try {
        const cabinClasses = await CabinClass.find();
        res.json(cabinClasses);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching cabin classes', error });
    }
})

const flightSchema = new mongoose.Schema({
    legs: [
        {
            flightNo: String,
            departDate: String,
            arrivalDate: String,
            departureTime: String,
            arrivalTime: String,
            departureCode: String,
            arrivalCode: String,
            airline: String,
            duration: String,
            stops: String,
            airlineLogo: String,
            amenities: {
                seatPitch: String,
                meal: String,
                wifi: String,
                power: String,
                entertainment: String
            }
        }
    ],
    price: String
});
const Flight = mongoose.model('Flight', flightSchema);
app.get('/api/flights', async (req, res) => {
    try {
        const flights = await Flight.find();
        res.json(flights);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching flights', error });
    }
});

const travelInfoSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    gender: String,
    email: String,
    phoneCode: String,
    phone: String,
    flight: Object,
    from: String,
    to: String,
    departDate: String,
    returnDate: String,
    passengers: Object,
    cabinClass: String,
    ticketType: String
});

const TravelInfo = mongoose.model('TravelInfo', travelInfoSchema);

app.post('/api/travelinfo', async (req, res) => {
    try {
        const travelInfo = new TravelInfo(req.body);
        await travelInfo.save();
        res.status(201).json({ message: 'Travel information saved successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error saving travel information', error });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});