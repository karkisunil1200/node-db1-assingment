const express = require('express');
const db = require('../data/dbConfig');

const router = express.Router();

router.get('/', (req, res) => {
  db.select('*')
    .from('accounts')
    .limit('7')
    .orderBy('name')
    .then(accounts => {
      res.status(200).json(accounts);
    })
    .catch(err => {
      res.status(500).json({message: 'Could not retrieve accounts'});
    });
});

router.get('/:id', (req, res) => {
  const {id} = req.params;

  db.select('*')
    .from('accounts')
    .where({id})
    .first()
    .then(account => {
      if (account) {
        res.status(200).json(account);
      } else {
        res.status(404).json({message: 'Account with that ID not found'});
      }
    })
    .catch(err => {
      res.status(500).json({message: 'Could not retrieve account'});
    });
});

router.post('/', (req, res) => {
  const data = req.body;

  db.select('*')
    .from('accounts')
    .insert(data, 'id')
    .then(ids => {
      const id = ids[0];
      db.select('*')
        .from('accounts')
        .where({id})
        .first()
        .then(account => {
          res.status(201).json({data: account});
        });
    })
    .catch(err => {
      res.status(500).json({message: 'Something went wrong'});
    });
});

router.put('/:id', (req, res) => {
  const {id} = req.params;
  const changes = req.body;

  db.select('*')
    .from('accounts')
    .where({id})
    .update(changes)
    .then(count => {
      if (count > 0) {
        db.select('*')
          .from('accounts')
          .where({id})
          .first()
          .then(account => {
            res.status(200).json({data: account});
          });
      } else {
        res.status(404).json({message: 'Id not found'});
      }
    })
    .catch(err => {
      res.status(500).json({message: 'Something went wrong updating'});
    });
});

router.delete('/:id', (req, res) => {
  const {id} = req.params;

  db.select('*')
    .from('accounts')
    .where({id})
    .del()
    .then(account => {
      if (account > 0) {
        res.status(200).json({message: ` Id ${id} removed`});
      } else {
        res.status(404).json({message: 'Id not found'});
      }
    })
    .catch(err => {
      res.status(500).json({message: 'Something went wrong deleting the account'});
    });
});

module.exports = router;
