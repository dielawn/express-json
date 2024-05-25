const express = require('express');
const bodyParser = require('body-parser');

const apicache = require('apicache');
const app = express();

let cache = apicache.middleware;
app.use(cache('5 minutes'));

// Parses the JSON reqest body string into JS object assigns to req.body object
app.use(bodyParser.json());

app.post('/', (req, res) => {
  res.json(req.body);
});

// GET all articles
app.get('/articles', (req, res) => {
  const articles = [];
  // code to view all articles
  res.json(articles);
});

// POST new article
app.post('/articles', (req, res) => {
  // code to post an article
  res.json(req.body);
});

// UPDATE article
app.put('/article/:id', (req, res) => {
  const { id } = req.params;
  //code to update an article
  res.json(req.body);
});

// DELETE article
app.delete('/articles/:id', (req, res) => {
  const { id } = req.params;
  //code to delete an article
  res.json({ deleted: id });
});

// GET article comments
app.get('/articles/:articleId/comments', (req, res) => {
  const [ articleId ] = req.params;
  const comments = [];
  // code to get comments by articleId
  res.json(comments);
})

// Reject the data from the request
const users = [
  { email: 'abcd@goo.com' }
]
app.post('/users', (req, res) => {
  const { email } = req.body;
  const userExists = users.find(u => u.email === email);
  if (userExists) {
    return res.status(400).json({ error: 'User already exists' })
  }
  res.json(req.body);
});

// QUERY API
// employees data in a database
const employees = [
  { firstName: 'Jane', lastName: 'Smith', age: 20 },
  //...
  { firstName: 'John', lastName: 'Smith', age: 30 },
  { firstName: 'Mary', lastName: 'Green', age: 50 },
]

app.get('/employees', (req, res) => {
  const { firstName, lastName, age } = req.query;
  let results = [...employees];
  if (firstName) {
    results = results.filter(r => r.firstName === firstName);
  }

  if (lastName) {
    results = results.filter(r => r.lastName === lastName);
  }

  if (age) {
    results = results.filter(r => r.age === age);
  }
  res.json(results);
});

app.get('/employees', (req, res) => {
  res.json(employees);
});

// Versioning API
app.get('/v1/employees', (req, res) => {
  const employees = [];
  // code to get employees
  res.json(employees);
});

app.get('/v2/employees', (req, res) => {
  const employees = [];
  // different code to get employees
  res.json(employees);
});

app.listen(3000, () => console.log('server started'));

module.exports = app;
