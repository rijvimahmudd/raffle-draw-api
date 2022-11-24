const router = require('express').Router();
const db = require('../db/DB');

router
  .route('/t/:ticketId')
  .get((req, res) => {
    const { ticketId } = req.params;
    const ticket = db.findById(ticketId);

    res.status(200).json({
      message: 'success',
      ticket,
    });
  })
  .patch((req, res) => {
    const { ticketId } = req.params;
    const updatedTicket = db.updateById(ticketId, req.body);
    res.status(200).json({
      message: 'updated successfully',
      updatedTicket,
    });
  })
  .delete((req, res) => {
    const { ticketId } = req.params;
    db.deleteById(ticketId);
    res.status(203).send();
  });

router
  .route('/u/:username')
  .get((req, res) => {
    const { username } = req.params;
    const tickets = db.findByUsername(username);
    res.status(200).json({
      message: 'success',
      tickets,
    });
  })
  .patch((req, res) => {
    const { username } = req.params;
    const tickets = db.updateByUsername(username, req.body);
    res.status(200).json({
      message: 'success',
      tickets,
    });
  })
  .delete((req, res) => {
    const { username } = req.params;
    db.deleteByUsername(username);
    res.status(203).send();
  });

router.post('/sell', (req, res) => {
  const { username, price } = req.body;
  const ticket = db.create(username, price);
  res.status(201).json({
    message: 'Ticket created successfully',
    ticket,
  });
});

router.post('/bulk', (req, res) => {
  const { username, price, quantity } = req.body;
  const ticket = db.bulkCreate(username, price, quantity);
  console.log(req.body);
  res.status(201).json({
    message: 'Bulk ticket created successfully',
    ticket,
  });
});

router.get('/draw', (req, res) => {
  const winnerCount = req.query.wc ?? 3;
  const winners = db.draw(winnerCount);

  res.status(200).json({
    message: 'Successfully winners counted',
    winners,
  });
});

router.get('/', (req, res) => {
  const tickets = db.find();
  res.status(200).json({
    message: 'Successful',
    tickets,
  });
});

module.exports = router;
