const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Game = require('../models/game');
const connectDB = require('../DB/connection');

connectDB();

router.get('/', (req, res) => {
  res.send('Desde API route');
});

router.post('/register', (req, res) => {
  let userData = req.body;
  let newUser = new User(userData);
  User.findOne(
    {
      $or: [{ email: userData.email }, { userName: userData.userName }],
    },
    (error, user) => {
      if (error) {
        console.log('Error al buscar para registrar usuario');
        console.error(error);
      } else {
        if (!user) {
          newUser.save((error, registeredUser) => {
            if (error) {
              console.log('Error al guardar el usuario');
              console.error(error);
            } else {
              res.status(200).send(registeredUser);
            }
          });
        } else if (user.email == userData.email) {
          res.status(401).send('Ya existe un usuario registrado con ese email');
        } else {
          res.status(401).send('Ya existe un usuario con ese nombre');
        }
      }
    }
  );
});

router.post('/login', (req, res) => {
  let userData = req.body;

  User.findOne(
    {
      $or: [{ email: userData.loginId }, { userName: userData.loginId }],
    },
    (error, user) => {
      if (error) {
        console.log('Error al buscar para logear usuario');
        console.error(error);
      } else {
        if (!user) {
          res.status(401).send('Usuario o email incorrectos');
        } else if (user.password !== userData.password) {
          res.status(401).send('Contraseña incorrecta');
        } else {
          res.status(200).send(user);
        }
      }
    }
  );
});

router.post('/addgame', (req, res) => {
  const gameData = req.body;
  const newGame = new Game(gameData);
  newGame.save({}, (error, newGame) => {
    if (error) {
      res.status(500).send('Error al guardar juego en BD', error);
    } else {
      res.status(200).send(newGame);
    }
  });
});

router.post('/removegame', (req, res) => {
  const gameData = req.body;
  const searchedGame = new Game(gameData);
  Game.findOneAndDelete(searchedGame, (error, result) => {
    if (error) {
      res.status(500).send('Error al eliminar en bd', error);
    } else {
      res.status(200).send(result);
    }
  });
});

router.get('/games', (req, res) => {
  Game.find((error, games) => {});
});

module.exports = router;
