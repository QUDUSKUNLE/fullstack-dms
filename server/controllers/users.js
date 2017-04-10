import bcrypt from 'bcrypt';
import isEmpty from 'lodash/isEmpty';
import db from '../models';
import jwt from 'jsonwebtoken';
import config from '../config';

const permittedAttributes = (user) => {
  const attributes = {
    id: user.id,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    RoleId: user.RoleId,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  };
  return attributes;
};

export default {

  /**
   * Create a user
   * Route: POST: /users
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Response|void} response object or void
   */
  create(req, res) {
    const { username, firstName, lastName, email, password } = req.body;
    const passwordDigest = bcrypt.hashSync(password, 10);

    db.User.findOne({ where: { email } })
      .then((existingUser) => {
        if (existingUser) {
          return res.status(409)
            .send({ message: `User with email ${req.body.email} already exists`
          });
        }
        const RoleId = 2;
        db.User.create({
          username,
          firstName,
          lastName,
          email,
          passwordDigest,
          RoleId
        }).then((user) => {
          const token = jwt.sign({
            UserId: user.id,
            RoleId: user.RoleId
          }, config.jwtSecret, { expiresIn: 86400 });
          user = permittedAttributes(user);
          res.status(201).send({ token, expiresIn: 86400, user });
        })
        .catch((err) => {
          res.status(400).send({ error: err });
        });
      });
  },

  /**
   * Get all users
   * Route: GET: /users
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void} no returns
   */
  list(req, res) {
    db.User.findAll({
      attributes: [
        'id',
        'username',
        'firstName',
        'lastName',
        'email',
        'RoleId',
        'createdAt',
        'updatedAt'
      ]
    }).then((users) => {
      res.send(users);
    });
  },

  /**
   * Get a particular user
   * Route: GET: /users/:id
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Response|void} response object or void
   */
  retrieve(req, res) {
    db.User.findById(req.params.id)
      .then((user) => {
        if (!user) {
          return res.status(404)
            .send({ message: `User with id: ${req.params.id} not found` });
        }
        user = permittedAttributes(user);
        res.send(user);
      });
  },

  /**
   * Update a particular user
   * Route: PUT: /users/:id
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Response|void} response object or void
   */
  update(req, res) {
    db.User.findById(req.params.id)
      .then((user) => {
        if (!user) {
          return res.status(404)
            .send({ message: `User with id: ${req.params.id} not found` });
        }
        user.update(req.body)
          .then((updatedUser) => {
            updatedUser = permittedAttributes(updatedUser);
            res.send(updatedUser);
          });
      });
  },

  /**
   * Delete a particular user
   * Route: DELETE: /users/:id
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Response|void} response object or void
   */
  destroy(req, res) {
    db.User.findById(req.params.id)
      .then((user) => {
        if (!user) {
          return res.status(404)
            .send({ message: `User with id: ${req.params.id} not found` });
        }
        user.destroy()
          .then(() => res.send({ message: 'User deleted successfully.' }));
      });
  },

  /**
   * Login user
   * Route: POST: /users/login
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Response|void} response object or void
   */
  login(req, res) {
    const { identifier, password } = req.body;

    db.User.findOne({
      where: {
        $or: [{ username: identifier }, { email: identifier }]
      }
    })
    .then((user) => {
      if (bcrypt.compareSync(password, user.passwordDigest)) {
        const token = jwt.sign({
          UserId: user.id,
          RoleId: user.RoleId
        }, config.jwtSecret, { expiresIn: 86400 });

        res.send({ token, expiresIn: 86400 });
      } else {
        res.status(401)
          .send({ message: 'Failed to authenticate.' });
      }
    });
  },

  /**
   * Get all documents that belongs to a user
   * Route: GET: /users/:id/documents
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void} no returns
   */
  userDocuments(req, res) {
    db.Document.findAll({ where: { OwnerId: req.params.id } })
      .then((documents) => {
        res.send(documents);
      });
  },
};

