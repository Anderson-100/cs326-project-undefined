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
    this.db = this.client.db('courses');

    // Init the database.
    await this.init();
  }

  async init() {
    this.collection = this.db.collection('courses');

    const count = await this.collection.countDocuments();

    if (count === 0) {
      await this.collection.insertMany([
        { compsci_121: { name: 'COMPSCI 121' } },
        { compsci_187: { name: 'COMPSCI 187' } },
        { compsci_220: { name: 'COMPSCI 220' } },
        { compsci_230: { name: 'COMPSCI 230' } },
        { compsci_240: { name: 'COMPSCI 240' } },
        { compsci_250: { name: 'COMPSCI 250' } },
      ]);
    }
  }

  // Close the pool.
  async close() {
    this.client.close();
  }

  // READ a course from the database.
  async getCourse(courseName) {
    const res = await this.collection.findOne({ name: courseName });
    return res;
  }

  // READ all courses from the database.
  async getAllCourses() {
    const res = await this.collection.find({}).toArray();
    return res;
  }

  // CREATE a review in the database.
  async addReview(courseName, reviewObj) {
    const courseObj = await this.getCourse(courseName);
    if ('reviews' in courseObj) {
      courseObj.reviews.push(reviewObj);
    } else {
      courseObj.reviews = [reviewObj];
    }
    await this.collection.replaceOne({ name: courseName }, courseObj);
    // Note: the result received back from MongoDB does not contain the
    // entire document that was inserted into the database. Instead, it
    // only contains the _id of the document (and an acknowledged field).
    return res;
  }

  // DELETE a review from the database.
  async deleteReview(id) {
    // Note: the result received back from MongoDB does not contain the
    // entire document that was deleted from the database. Instead, it
    // only contains the 'deletedCount' (and an acknowledged field).
    const res = await this.collection.deleteOne({ _id: id });
    return res;
  }


}
