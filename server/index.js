import express from 'express';
import { PeopleDatabase } from './people-db.js';

class PeopleServer {
  constructor(dburl) {
    this.dburl = dburl;
    this.app = express();
    this.app.use('/', express.static('client'));
  }

  async initRoutes() {
    // Note: when using arrow functions, the "this" binding is lost.
    const self = this;

    this.app.get(`/course?course=${courseName}`, async (req, res) => {
      try {
        const { courseName } = req.query;
        const person = await self.db.createPerson(dept, courseNumber);
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
  }

  async initDb() {
    this.db = new PeopleDatabase(this.dburl);
    await this.db.connect();
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

const server = new PeopleServer(process.env.DATABASE_URL);
server.start();
