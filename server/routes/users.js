const db = require('../db');
const express = require('express');
const router = express.Router();

/* get all users (example) */
router.get('/', async (_, res) => {
  const allUsers = await db.getAll();
  res.json(allUsers);
});

module.exports = router;
