import 'dotenv/config';
import { MongoClient, ServerApiVersion } from 'mongodb';

export class PeopleDatabase {
  constructor(dburl) {
    this.dburl = dburl;
  }

  async connect() {
    this.client = await MongoClient.connect(this.dburl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverApi: ServerApiVersion.v1,
    });

    // Get the database.
    this.db = this.client.db('people');

    // Init the database.
    await this.init();
  }

  async init() {
    this.collection = this.db.collection('people');
  }

  // Close the pool.
  async close() {
    this.client.close();
  }

}
