// Sample data
const course = {
  name: "COMPSCI 187",
  title: "Programming with Data Structures",
  description: "The course introduces and develops methods for designing and implementing abstract data types using the Java programming language. " + 
    "The main focus is on how to build and encapsulate data objects and their associated operations. " + 
    "Specific topics include linked structures, recursive structures and algorithms, binary trees, balanced trees, and hash tables. " + 
    "These topics are fundamental to programming and are essential to other courses in computer science. " + 
    "The course involves weekly programming assignments, in-class quizzes, discussion section exercises, and multiple exams. " + 
    "Prerequisites: COMPSCI 121 (or equivalent Java experience). " + 
    "A grade of B or better in COMPSCI 121 (or a grade of C or better in COMPSCI 186 (or COMPSCI 190D) is required for students enrolling in COMPSCI 187 " + 
    "and Basic Math Skills (R1). Basic Java language concepts are introduced quickly; if unsure of background, contact instructor. 4 credits.",
  reviews: [
    {
      rating: 4,
      difficulty: 3,
      grade: "A-",
      text: "Solid class. Learned a lot about data structures."
    },
    {
      rating: 1,
      difficulty: 5,
      grade: "C+",
      text: "Very difficult. I hate this class."
    }
  ]
};

export class CoursePageApp {
  constructor() {
    this.header = new Header();
    this.description = new Description();
    this.avg = new Averages();
    this.reviewHeader = new ReviewHeader();
    this.addReviewButton = new AddReviewButton();
    this.reviews = new Reviews();
    this.break = new LineBreak();
  }

  render() {
    // This will show the name of the course being displayed
    // when I implement the backend
    document.title = "COMPSCI 187 - UMass Course Review";

    const element = document.createElement('div');
    element.appendChild(this.header.render());
    element.appendChild(this.description.render());
    element.appendChild(this.avg.render());

    element.appendChild(this.reviewHeader.render());
    element.appendChild(this.addReviewButton.render());
    element.appendChild(this.break.render());
    element.appendChild(this.reviews.render());
    return element;
  }
}

class Header {
  constructor() {
    this.header1 = new Header1();
    this.header2 = new Header2();
  }
  
  render() {
    const block = document.createElement('div');
    block.classList.add('page-header');
    block.appendChild(this.header1.render());
    block.appendChild(this.header2.render());

    return block;
  }
}

class Header1 {
  render() {
    const header = document.createElement('h1');
    header.textContent = "UMass Course Review";
    return header;
  }
}

class Header2 {
  render() {
    const header = document.createElement('h5');
    header.textContent = course.name + ": " + course.title;
    return header;
  }
}

class ReviewHeader {
  render() {
    const header = document.createElement('h2');
    header.textContent = "Reviews";
    return header;
  }
}

class Description {
  render() {
    const div = document.createElement('div');
    div.classList.add('desc-box');
    div.textContent = course.description;
    return div;
  }
}

// Creates a <br> element for better spacing
class LineBreak {
  render() {
    return document.createElement('br');
  }
}

// Clicking this button will pull up the page to write a review
class AddReviewButton {
  render() {
    const button = document.createElement('input');
    button.classList.add('review-button');
    button.type = 'button';
    button.value = 'Add Review';
    button.addEventListener('click', () => console.log("button pressed"));
    const block = document.createElement('div');
    block.appendChild(button);
    return block;
  }
}

class CourseButton {
  render(courseName) {
    const button = document.createElement('input');
    button.classList.add("course-name");
    button.type = 'button';
    button.value = courseName;
    button.addEventListener('click', () => console.log("clicked on " + courseName));

    return button;
  }
}

class Averages {
  constructor() {
    this.row = new TableRow();
    this.col = new TableCol();
    this.button = new CourseButton();
  }

  render() {
    const table = document.createElement("div");
    table.id = "averages";
    table.classList.add("container");
    table.classList.add("text-center");
    // table.innerHTML = "hello";

    // dispaly some basic info about the course
    const titleRow = this.row.render();
    titleRow.classList.add("title");

    const ratingTitleCol = this.col.render();
    ratingTitleCol.textContent = "Rating";
    titleRow.appendChild(ratingTitleCol);

    const diffTitleCol = this.col.render();
    diffTitleCol.textContent = "Difficulty";
    titleRow.appendChild(diffTitleCol);

    const gradeTitleCol = this.col.render();
    gradeTitleCol.textContent = "Average Grade";
    titleRow.appendChild(gradeTitleCol);

    table.appendChild(titleRow);

    // dispaly some basic info about the course
    const dataRow = this.row.render();
    // dataRow.classList.add("title");

    const ratingDataCol = this.col.render();
    ratingDataCol.innerHTML = this._avg("rating");
    ratingDataCol.classList.add('average');
    dataRow.appendChild(ratingDataCol);

    const diffDataCol = this.col.render();
    diffDataCol.innerHTML = this._avg("difficulty");
    diffDataCol.classList.add('average');
    dataRow.appendChild(diffDataCol);

    const gradeDataCol = this.col.render();
    gradeDataCol.innerHTML = this._avgGrade();
    gradeDataCol.classList.add('average');
    dataRow.appendChild(gradeDataCol);

    table.appendChild(dataRow);

    // Create a line break for spacing
    const lineBreak = document.createElement('br');
    table.appendChild(lineBreak);
    
    return table;
  }

  /**
   * Calculates the average value of the inputted property to be displayed on screen.
   * 
   * @param {string} property The property of the review to be averaged 
   *                          (rating or difficulty)
   * @returns {string} The message to be displayed on the screen
   */
  _avg(property) {
    const arr = course.reviews;
    if (arr.length === 0) {
      return "No reviews"
    }

    const avg = arr.reduce((acc, e) => acc + parseInt(e[property]), 0) / arr.length;
    return "<b>" + avg.toFixed(1) + "</b>/5";  // rounds to 1 decimal point
  }

  /**
   * Calculates the average grade obtained from reviews by mapping each letter grade
   * to a number.
   * 
   * @returns {string} The message to be displayed on the screen:
   *                   average grade, or "No reviews" if there are no reviews.
   */
  _avgGrade() {
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
    const arr = course.reviews;
    const gradeSum = arr.reduce((acc, e) => acc + parseInt(gradeToNum[e.grade]), 0);

    const avg = Math.floor(gradeSum / arr.length + 0.5);  // round to nearest int

    for (const letter in gradeToNum) {
      if (gradeToNum[letter] === avg) {
        return "<b>" + letter + "</b>";
      }
    }
    
    return "No reviews";
  }
}

class Reviews {
  constructor() {
    this.row = new TableRow();
    this.col = new TableCol();
    this.button = new CourseButton();
    this.space = new LineBreak();
  }

  render() {
    const table = document.createElement("div");
    table.id = "courses";
    table.classList.add("container");
    table.classList.add("text-center");
    // table.innerHTML = "hello";

    for (const review of course.reviews) {

      // dispaly some basic info about the course
      const infoRow = this.row.render();

      const ratingCol = this.col.render();
      ratingCol.innerHTML = "Overall Rating: <b>" + review.rating + "</b>/5";
      infoRow.appendChild(ratingCol);

      const diffCol = this.col.render();
      diffCol.innerHTML = "Difficulty: <b>" + review.difficulty + "</b>/5";
      infoRow.appendChild(diffCol);

      const gradeCol = this.col.render();
      gradeCol.innerHTML = "Average Grade: <b>" + review.grade + "</b>";
      infoRow.appendChild(gradeCol);

      table.appendChild(infoRow);


      // display the text of the review
      const reviewText = document.createElement('div');
      reviewText.classList.add("review-text");
      reviewText.innerHTML = review.text;
      table.appendChild(reviewText);

      // Create a line break for spacing
      // const lineBreak = document.createElement('br');
      table.appendChild(this.space.render());
    }
    return table;
  }
}

class TableRow {
  render() {
    const row = document.createElement("div");
    row.classList.add("row");
    return row;
  }
}

class TableCol {
  render() {
    const col = document.createElement("div");
    col.classList.add("col");
    return col;
  }
}

function main() {
  const app = new App();
  const root = document.getElementById('app');
  root.appendChild(app.render());
}

main();

// export { main };