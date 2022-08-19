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


let _isLoggedIn = false;
let _username;

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

    this.app.get(`/reviews/:username`, async (req, res) => {
      try {
        const { username } = req.params;
        const reviewArr = await self.db.getReviewsOf(username);
        res.send(reviewArr);
      } catch (err) {
        res.status(500).send(err);
      }
    })

    this.app.delete(`/review/delete`, async (req, res) => {
      console.log("yeet");
      if (!_isLoggedIn) {
        res.status(500);
      }
      const { id } = req.body;
      const data = await self.db.deleteReview(id);
      res.status(200).send(data);
    })

    // Login stuff
    this.app.post('/login', (req, res) => {
      const { username, password } = req.body;
      if (users.validatePassword(username, password)) {
        // console.log(username + " logged in!");
        _isLoggedIn = true;
        _username = username
        res.send({ ok: true });
      } else {
        // console.log("not logged in");
        res.status(500).send({ ok: false });
      }
    });

    this.app.get('/username', (req, res) => {
      if (_isLoggedIn) {
        res.send({ ok: true, username: _username });
      } else {
        res.send( { ok: false });
      }
    })
    
    this.app.post('/logout', (req, res) => {
      _isLoggedIn = false;
      res.send({ ok: true });
    });

    this.app.post('/register', (req, res) => {
      const { username, password } = req.body;
      if (users.addUser(username, password)) {
        // console.log(username + " added!");
        res.send({ ok: true });
      } else {
        res.send({ ok: false });
      }
    });


    this.app.get('/isLoggedIn', (req, res) => {
      res.send({ isLoggedIn: _isLoggedIn });
    });
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
