import express from 'express';
import cors from 'cors';
import bp from 'body-parser';
import { Database } from './database.js';

class Server {
  constructor(dburl) {
    this.dburl = dburl;
    this.app = express();
    this.app.use('/', express.static('client'));
    this.app.use(express.json());
    this.app.use(express.urlencoded());
    this.app.use(cors());
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
        res.send(courseObj);
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
        res.status(200);
      } catch (err) {
        res.status(500).send(err);
      }
    });

    
  }

  async initDb() {
    this.db = new Database(this.dburl);
    // await this.db.connect();
  }

  async start() {
    await this.initRoutes();
    await this.initDb();
    const port = process.env.PORT || 3000;
    this.app.listen(port, () => {
      console.log(`PeopleServer listening on port ${port}!`);
    });
  }
}

const server = new Server(process.env.MONGODB_URI);
server.start();
