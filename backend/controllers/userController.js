const asyncHandler = require("express-async-handler");
const User = require('../models/User');
const jwt = require("jsonwebtoken");

// @desc Get all users
// @route GET /users
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
});

// @desc Create new user
// @route POST /users
const createUser = asyncHandler(async (req, res) => {
    const { username, password, role, companyName, contactPerson, email, phone, address, balance } = req.body;

    if (!username || !password) {
        res.status(400);
        throw new Error('Please provide username and password');
    }

    const exists = await User.findOne({ username });
    if (exists) {
        res.status(400);
        throw new Error('User with this username already exists');
    }

    const newUser = new User({
        username,
        password,
        role: role || "Member",
        companyName: companyName || "",
        contactPerson: contactPerson || "",
        email: email || "",
        phone: phone || "",
        address: {
            country: address?.country || "",
            provinceState: address?.provinceState || "",
            unitNumber: address?.unitNumber || "",
            streetNumber: address?.streetNumber || "",
            street: address?.street || "",
            city: address?.city || "",
            postalCode: address?.postalCode || ""
        },
        balance: balance || 0
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
});

// @desc Login user
// @route POST /users/login
const loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(400);
        throw new Error('Please provide username and password');
    }

    const user = await User.findOne({ username });

    if (!user || user.password !== password) {
        res.status(401);
        throw new Error('Invalid username or password');
    }

    console.log("process.env.JWT_SECRET: ", process.env.JWT_SECRET)
    const token = jwt.sign(
        { username: user.username, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );

    res.json({
        token,
        user: {
            username: user.username,
            role: user.role,
            balance: user.balance,
            companyName: user.companyName,
            contactPerson: user.contactPerson,
            email: user.email,
            phone: user.phone,
            address: user.address
        }
    });
});

// @desc Update user role by username
// @route PUT /users/:username/role
const updateUserRole = asyncHandler(async (req, res) => {
    const { role } = req.body;
    const validRoles = ['Owner', 'Manager', 'Member'];

    if (!validRoles.includes(role)) {
        res.status(400);
        throw new Error('Invalid role');
    }

    const user = await User.findOneAndUpdate(
        { username: req.params.username },
        { role },
        { new: true }
    );

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    res.status(200).json(user);
});

// @desc Update user info (profile + address)
// @route PUT /users/:username
const updateUserInfo = asyncHandler(async (req, res) => {
    const { companyName, contactPerson, email, phone, address, balance } = req.body;

    const updatedUser = await User.findOneAndUpdate(
        { username: req.params.username },
        {
            companyName: companyName || "",
            contactPerson: contactPerson || "",
            email: email || "",
            phone: phone || "",
            balance: balance ?? undefined,
            address: {
                country: address?.country || "",
                provinceState: address?.provinceState || "",
                unitNumber: address?.unitNumber || "",
                streetNumber: address?.streetNumber || "",
                street: address?.street || "",
                city: address?.city || "",
                postalCode: address?.postalCode || ""
            }
        },
        { new: true }
    );

    if (!updatedUser) {
        res.status(404);
        throw new Error('User not found');
    }

    res.status(200).json(updatedUser);
});

module.exports = {
    getUsers,
    createUser,
    loginUser,
    updateUserRole,
    updateUserInfo
};
