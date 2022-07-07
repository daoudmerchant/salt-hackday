const db = require('../db');
const express = require('express');
const router = express.Router();

// const passport = require('../app-passport'); // MY passport

const formatUser = user => ({ username: user.username, snippets: user.snippets, _id: user._id })

// USER ACCOUNTS

router.post("/register", async (req, res) => {
  const existingUser = await db.getUserByUsername(req.body.username);
  if (existingUser) {
    return res.json({action: "create user", result: "failure", error: "User already exists"})
  }
  const user = await db.createNewUser(req.body);
  res.json({action: "create user", result: "success", user: formatUser(user) });
});

router.post("/login", async (req, res) => {
  const user = await db.getUserByUsername(req.body.username);
  if (!user) {
    return res.json({action: "log-in", result: "failure", error: "User does not exist"});
  }
  if (!user.validatePassword(req.body.password)) {
    return res.json({action: "log-in", result: "failure", error: "Password does not match account"});
  }
  res.json({action: "log-in", result: "success", user: formatUser(user) });
});

// ADDING DOCUMENTS

router.post("/:id", async (req, res) => {
  const updatedUser = await db.addSnippet(req.params.id, req.body);
  res.json({ action: "add new snippet", result: "success", user: formatUser(updatedUser) });
})

router.put("/:id", async (req, res) => {
  const updatedUser = await db.updateSnippet(req.params.id, req.body);
  res.json({ action: "update snippet", result: "success", user: formatUser(updatedUser)})
})

router.delete("/:id", async (req, res) => {
  const updatedUser = await db.deleteSnippet(req.params.id, req.body.id);
  res.json({ action: "delete snippet", result: "success", user: formatUser(updatedUser)})
})

module.exports = router;
