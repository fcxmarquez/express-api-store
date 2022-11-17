const express = require('express');
const router = express.Router();

// Query params
router.get('/', (req, res) => {
  const { limit, offset } = req.query;

  if (limit && offset)
    return res.json({
      limit,
      offset,
    });

  res.send('No limit or offset');
});

module.exports = router;
