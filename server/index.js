import 'dotenv/config';
import express from 'express';
import expressSession from 'express-session';
import cors from 'cors';
import users from './users.js';
import auth from './auth.js';
import { Database } from './dbmongo.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Session configuration
const sessionConfig = {
  // set this encryption key in Heroku config (never in GitHub)!
  secret: process.env.SECRET || 'SECRET',
  resave: false,
  saveUninitialized: false,
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(dirname(__filename));

class Server {
  constructor(dburl) {
    this.dburl = dburl;
    this.app = express();
    this.app.use(expressSession(sessionConfig));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use('/', express.static('client'));
    this.app.use(cors());
    auth.configure(this.app);
  }

  async initRoutes() {
    // Note: when using arrow functions, the "this" binding is lost.
    const self = this;

    this.app.get('/getAllCourses', async (req, res) => {
      try {
        const courses = await self.db.getAllCourses();
        res.send(courses);
      } catch (err) {
        res.status(500).send(err);
      }
    });

    this.app.get(`/course/:course`, async (req, res) => {
      try {
        const { course } = req.params;
        const courseObj = await self.db.getCourse(course);
        // console.log(courseObj);
        res.send(courseObj);

        // res.status(200);
      } catch (err) {
        res.status(500).send(err);
      }
    });

    // this.app.get(`/review/`, async (req, res) => {
    //   try {
    //     const { courseName } = req.query;
    //     const person = await self.db.readPerson(id);
    //     res.send(JSON.stringify(person));
    //   } catch (err) {
    //     res.status(500).send(err);
    //   }
    // });

    this.app.post(`/review/post/:courseName`, async (req, res) => {
      try {
        const { courseName } = req.params;
        const reviewObj = req.body;
        // console.log("index.js");
        // console.log(reviewObj);
        await self.db.addReview(courseName, reviewObj);
        await self.db.updateAverages(courseName);
        res.status(200);
      } catch (err) {
        res.status(500).send(err);
      }
    });

    // Login stuff
    this.app.get('/login', (req, res) => {
      const { username, password } = req.query;
      if (users.validatePassword(username, password)) {
        console.log(username + " added!");
        // res.send({ ok: true });
        res.redirect('/');
      } else {
        console.log("not added");
        // res.send({ ok: false });
        res.redirect('/');
      }
    });

    this.app.get('/loginSuccess', (req, res) => {
      res.send({ ok: true });
    });

    this.app.get('/loginSuccess', (req, res) => {
      res.send({ ok: false });
    });

    

    this.app.get('/logout', (req, res) => {
      req.logout();
      res.redirect('/login');
    });

    this.app.post('/register', (req, res) => {
      const { username, password } = req.body;
      if (users.addUser(username, password)) {
        console.log(username + " added!");
        res.send({ ok: true });
      } else {
        res.send({ ok: false });
      }
    });

    this.app.get('/register', (req, res) => {
      const { username, password } = req.query;
      if (users.addUser(username, password)) {
        console.log(username + " added!");
        res.json({ ok: true });
      } else {
        console.log("not added");
        res.send({ ok: false });
      }
    });

    // Private data
    this.app.get(
      '/private',
      this.checkLoggedIn, // If we are logged in (notice the comma!)...
      (req, res) => {
        // Go to the user's page.
        res.redirect('/private/' + req.user);
      }
    );

    // A dummy page for the user.
    this.app.get(
      '/private/:userID/',
      this.checkLoggedIn, // We also protect this route: authenticated...
      (req, res) => {
        // Verify this is the right user.
        if (req.params.userID === req.user) {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.write('<H1>HELLO ' + req.params.userID + '</H1>');
          res.write('<br/><a href="/logout">click here to logout</a>');
          res.end();
        } else {
          res.redirect('/private/');
        }
      }
    );
  }

  checkLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      // If we are authenticated, run the next route.
      next();
    } else {
      // Otherwise, redirect to the login page.
      res.redirect('/login');
    }
  }

  async initDb() {
    this.db = new Database(this.dburl);
    await this.db.connect();
  }

  async start() {
    await this.initRoutes();
    await this.initDb();
    const port = process.env.PORT || 3000;
    this.app.listen(port, () => {
      console.log(`Server listening on port ${port}!`);
    });
  }
}

const server = new Server(process.env.MONGODB_URI);
server.start();
