import 'dotenv/config';
import { MongoClient, ServerApiVersion } from 'mongodb';
import { readFile, writeFile } from 'fs/promises';


export class Database {
  constructor() {
    this.path = 'data.json';
  }

  // READ a course from the database.
  async getCourse(course) {
    const allCourses = await this.getAllCourses();
    const courseObj = allCourses[course];
    return courseObj;
    // const res = await this.collection.findOne({ name: courseName });
    // return res;
  }

  // READ all courses from the database.
  async getAllCourses() {
    const data = await this._read();
    return data;
    // return res;
    // const res = await this.collection.find({}).toArray();
    // return res;
  }

  // CREATE a review in the database.
  async addReview(courseName, reviewObj) {
    // console.log("database.js");
    // console.log(reviewObj);
    const allCourses = await this.getAllCourses();
    const courseObj = allCourses[courseName];
    if ('reviews' in courseObj) {
      courseObj.reviews.push(reviewObj);
    } else {
      courseObj.reviews = [reviewObj];
    }

    await this._write(allCourses);

    // await this.collection.replaceOne({ name: courseName }, courseObj);
    // Note: the result received back from MongoDB does not contain the
    // entire document that was inserted into the database. Instead, it
    // only contains the _id of the document (and an acknowledged field).
    // return res;
  }

  // DELETE a review from the database.
  async deleteReview(id) {
    // Note: the result received back from MongoDB does not contain the
    // entire document that was deleted from the database. Instead, it
    // only contains the 'deletedCount' (and an acknowledged field).
    const res = await this.collection.deleteOne({ _id: id });
    return res;
  }

  async _read() {
    try {
      const data = await readFile(this.path, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.log(error);
      return {
        compsci_121: { name: 'COMPSCI 121' },
        compsci_187: { name: 'COMPSCI 187' },
        compsci_220: { name: 'COMPSCI 220' },
        compsci_230: { name: 'COMPSCI 230' },
        compsci_240: { name: 'COMPSCI 240' },
        compsci_250: { name: 'COMPSCI 250' }, 
      };
    }
  }

  // This is a private methods. The # prefix means that they are private.
  async _write(data) {
    await writeFile(this.path, JSON.stringify(data), 'utf8');
  }

}
