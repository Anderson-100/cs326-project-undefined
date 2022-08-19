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

  // Read a course
  async getCourse(course) {
    const res = await this.collection.findOne({ _id: course });
    // Note: the result received back from MongoDB does not contain the
    // entire document that was inserted into the database. Instead, it
    // only contains the _id of the document (and an acknowledged field).
    return res;
  }

  // Read all courses
  async getAllCourses() {
    const res = await this.collection.find({}).toArray();
    return res;
  }

  // Create a review
  async addReview(courseName, reviewObj) {
    const course = await this.collection.findOne({ _id: courseName });
    const reviews = course.reviews;
    reviews.push(reviewObj);
    const res = await this.collection.updateOne(
      { _id: courseName },
      { $set: { reviews: reviews }}
    )
    return res;
  }

  // Get reviews of a specific user
  async getReviewsOf(username) {
    const data = await this.collection.find({}).toArray();
    const reviews = [];

    for (const course of data) {
      for (const review of course.reviews) {
        if (review.user === username) {
          reviews.push(review);
        }
      }
    }

    return reviews;
  }

  // Update average values
  async updateAverages(courseName) {
    const courseData = await this.collection.findOne({ _id: courseName });

    function avg(property) {
      const arr = courseData.reviews;
      if (arr.length === 0) {
        return 0;
      }
      const avg = arr.reduce((acc, e) => acc + parseInt(e[property]), 0) / arr.length;
      return avg.toFixed(1);
    }

    function avgGrade() {
      const gradeToNum = {
        "A" : 11,
        "A-": 10,
        "B+": 9,
        "B" : 8,
        "B-": 7,
        "C+": 6,
        "C-": 5,
        "D+": 4,
        "D" : 3,
        "D-": 2,
        "F" : 1
      }
      const arr = courseData.reviews;
      const gradeSum = arr.reduce((acc, e) => acc + parseInt(gradeToNum[e.grade]), 0);
  
      const avg = Math.floor(gradeSum / arr.length + 0.5);  // round to nearest int
  
      for (const letter in gradeToNum) {
        // console.log(courseObj.grade);
        if (gradeToNum[letter] === avg) {
          // Save new grade
          return letter;
        }
      }
      return 0;
    }

    const rating = avg("rating");
    const diff = avg("difficulty");
    const grade = avgGrade();

    const res = this.collection.updateOne(
      { _id: courseName },
      { $set: { rating: rating, difficulty: diff, grade: grade }}
    );
    return res;
  }
}
