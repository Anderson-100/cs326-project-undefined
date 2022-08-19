import 'dotenv/config';
import { MongoClient, ServerApiVersion } from 'mongodb';

export class Database {
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
    this.db = this.client.db('umass_course_review');

    // Init the database.
    await this.init();
  }

  async init() {
    this.collection = this.db.collection('courses');

    const count = await this.collection.countDocuments();

    if (count === 0) {
      await this.collection.insertMany([
        { 
          _id: "compsci_121",
          name: 'COMPSCI 121',
          rating: 0,
          difficulty: 0,
          grade: 0,
          reviews: []
        },
        { 
          _id: "compsci_187",
          name: 'COMPSCI 187',
          rating: 0,
          difficulty: 0,
          grade: 0,
          reviews: []
        },
        { 
          _id: "compsci_220",
          name: 'COMPSCI 220',
          rating: 0,
          difficulty: 0,
          grade: 0,
          reviews: [] 
        },
        { 
          _id: "compsci_230", 
          name: 'COMPSCI 230',
          rating: 0,
          difficulty: 0,
          grade: 0,
          reviews: []
        },
        { 
          _id: "compsci_240",
          name: 'COMPSCI 240',
          rating: 0,
          difficulty: 0,
          grade: 0,
          reviews: []
        },
        { 
          _id: "compsci_250",
          name: 'COMPSCI 250',
          rating: 0,
          difficulty: 0,
          grade: 0,
          reviews: []
        }, 
      ]);
    }
  }

  // Close the pool.
  async close() {
    this.client.close();
  }

  async getCourse(course) {
    const res = await this.collection.findOne({ _id: course });
    // Note: the result received back from MongoDB does not contain the
    // entire document that was inserted into the database. Instead, it
    // only contains the _id of the document (and an acknowledged field).
    return res;
  }

  async getAllCourses() {
    const res = await this.collection.find({}).toArray();
    return res;
  }

  async addReview(courseName, reviewObj) {
    const course = getCourse(courseName);
    const reviews = course.reviews;
    reviews.push(reviewObj);
    const res = await this.collection.updateOne(
      { _id: courseName },
      { $set: { reviews }}
    )
  }
}
