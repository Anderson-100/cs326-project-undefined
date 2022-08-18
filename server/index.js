import express from 'express';
import { Database } from './database.js';

class Server {
  constructor(dburl) {
    this.dburl = dburl;
    this.app = express();
    this.app.use('/', express.static('client'));
  }

  async initRoutes() {
    // Note: when using arrow functions, the "this" binding is lost.
    const self = this;

    this.app.get(`/course/:courseName`, async (req, res) => {
      try {
        const { courseName } = req.params;
        const person = await self.db.getCourse(courseName);
        res.send(JSON.stringify(person));
      } catch (err) {
        res.status(500).send(err);
      }
    });

    this.app.get(`/review/?course=${courseName}`, async (req, res) => {
      try {
        const { courseName } = req.query;
        const person = await self.db.readPerson(id);
        res.send(JSON.stringify(person));
      } catch (err) {
        res.status(500).send(err);
      }
    });

    this.app.post(`/review/?course=${courseName}`, async (req, res) => {
      try {
        const { courseName } = req.query;
        const person = await self.db.updatePerson(id, name, age);
        res.send(JSON.stringify(person));
      } catch (err) {
        res.status(500).send(err);
      }
    });

    this.app.get('/', async (req, res) => {
      const courses = await self.db.getAllCourses();
      res.send(courses);
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

const server = new Server(process.env.DATABASE_URL);
server.start();
