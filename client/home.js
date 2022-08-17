const courses = [
  {
    name: "COMPSCI 121",
    title: "Introduction to Problem Solving with Computers",
    difficulty: 3.2,
    grade: "B+",
    rating: 4.2
  },
  {
    name: "COMPSCI 187",
    title: "Programming with Data Structures",
    difficulty: 4.0,
    grade: "B",
    rating: 2.5
  },
  {
    name: "COMPSCI 220",
    title: "Programming Methodology",
    difficulty: 4.8,
    grade: "B-",
    rating: 4.5
  },
  {
    name: "COMPSCI 230",
    title: "Computer System Principles",
    difficulty: 3.5,
    grade: "A-",
    rating: 3.9
  },
  {
    name: "COMPSCI 240",
    title: "Reasoning Under Uncertainty",
    difficulty: 2.7,
    grade: "A-",
    rating: 4.3
  },
  {
    name: "COMPSCI 250",
    title: "Introduction to Computation",
    difficulty: 4.3,
    grade: "B+",
    rating: 4.0
  }
];

export class HomePageApp {
  constructor() {
    this.header = new Header();
    this.courses = new Courses();
  }

  render() {
    const element = document.createElement('div');
    element.appendChild(this.header.render());
    element.appendChild(this.courses.render());
    return element;
  }
}

class CourseButton {
  render(courseName) {
    const button = document.createElement('input');
    button.classList.add("course-name");
    button.type = 'button';
    button.value = courseName;
    button.addEventListener('click', () => {
      console.log("clicked on " + courseName)
    });

    return button;
  }
}

class Courses {
  constructor() {
    this.row = new TableRow();
    this.col = new TableCol();
    this.button = new CourseButton();
    this.lineBreak = new LineBreak();
  }

  render() {
    const table = document.createElement("div");
    table.id = "courses";
    table.classList.add("container");
    table.classList.add("text-center");
    // table.innerHTML = "hello";

    for (const course of courses) {
      // display the name of the course
      // each of these will be a button that gets the info page
      // of the corresponding course
      const nameRow = this.row.render();
      const nameCol = this.col.render();
      const courseButton = this.button.render(course.name);
      nameCol.append(courseButton);
      nameRow.appendChild(nameCol);
      table.appendChild(nameRow);

      // display the title of the course
      const titleRow = this.row.render();
      const titleCol = this.col.render();
      titleCol.classList.add("title");
      titleCol.innerHTML = course.title;
      titleRow.appendChild(titleCol);
      table.appendChild(titleRow);

      // dispaly some basic info about the course
      const infoRow = this.row.render();

      const ratingCol = this.col.render();
      ratingCol.innerHTML = "Overall Rating: <b>" + course.rating + "</b>/5";
      infoRow.appendChild(ratingCol);

      const diffCol = this.col.render();
      diffCol.innerHTML = "Difficulty: <b>" + course.difficulty + "</b>/5";
      infoRow.appendChild(diffCol);

      const gradeCol = this.col.render();
      gradeCol.innerHTML = "Average Grade: <b>" + course.grade + "</b>";
      infoRow.appendChild(gradeCol);

      table.appendChild(infoRow);

      // Create a line break for spacing
      const lineBreak = this.lineBreak.render();
      table.appendChild(lineBreak);
    }
    return table;
  }
}

function main() {
  const app = new HomePageApp();
  const root = document.getElementById('app');
  root.appendChild(app.render());
}

// Course Page
class CoursePageApp {
  constructor() {
    this.header = new Header();
    this.description = new Description();
    this.avg = new Averages();
    this.reviewHeader = new ReviewHeader();
    this.addReviewButton = new AddReviewButton();
    this.reviews = new Reviews();
    this.break = new LineBreak();
  }

  render(courseName) {
    // This will show the name of the course being displayed
    // when I implement the backend
    document.title = `${courseName} - UMass Course Review`;

    const element = document.createElement('div');
    element.appendChild(this.header.render());
    element.appendChild(this.description.render("UMass Course Review", courseName));
    element.appendChild(this.avg.render());

    element.appendChild(this.reviewHeader.render());
    element.appendChild(this.addReviewButton.render());
    element.appendChild(this.break.render());
    element.appendChild(this.reviews.render());
    return element;
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

// Review App Page
class ReviewApp {
  constructor() {
    this.header = new Header();
    this.gradeQuestion = new GradeQuestion();
    this.diffQuestion = new DifficultyQuestion();
    this.ratingQuestion = new RatingQuestion();
    this.reviewText = new ReviewTextBox();
    this.buttons = new ButtonsDiv();
    this.break = new LineBreak();
  }

  render(courseName) {
    document.title = "Submit a Review - UMass Course Review "
    const element = document.createElement('div');

    element.appendChild(this.header.render("UMass Course Review", `Submit a Review for: ${courseName}`));

    element.appendChild(this.gradeQuestion.render());
    element.appendChild(this.break.render());

    element.appendChild(this.diffQuestion.render());
    element.appendChild(this.break.render());

    element.appendChild(this.ratingQuestion.render());
    element.appendChild(this.break.render());

    element.appendChild(this.reviewText.render());
    element.appendChild(this.break.render());

    element.appendChild(this.buttons.render());

    return element;
  }
}


// Header elements shared by all 3 pages
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

// Website Name
class Header1 {
  render() {
    const header = document.createElement('h1');
    header.textContent = 'UMass Course Review';
    return header;
  }
}

// Subtitle
class Header2 {
  render() {
    const header = document.createElement('h5');
    header.textContent = 'Computer Science';
    return header;
  }
}


// Generate tables in html
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


// Formatting for questions when submitting review
class MultipleChoiceQuestion {
  constructor() {
    this.break = new LineBreak();
  }

  render(name, question, options) {
    const div = document.createElement('div');

    const title = document.createElement('h4');
    title.textContent = question;
    div.appendChild(title);

    const form = document.createElement('form');

    options.forEach(option => {
      const input = document.createElement('input');
      input.type = 'radio';
      input.id = option;
      input.class = "multiple-choice-question";
      input.value = option;
      input.name = name;
      form.appendChild(input);

      const label = document.createElement('label');
      label.htmlFor = option;
      label.textContent = option;
      form.appendChild(label);

      // form.appendChild(this.break.render());
    });

    div.appendChild(form);
    return div;
  }
}

class GradeQuestion {
  constructor() {
    this.mcq = new MultipleChoiceQuestion();
  }

  render() {
    return this.mcq.render(
      "grade",
      "What grade did you recieve in this course?",
      ["A","A-","B+","B","B-","C+","C","C-","D+","D","D-","F"]
    );
  }
}

class RatingQuestion {
  constructor() {
    this.mcq = new MultipleChoiceQuestion();
  }

  render() {
    return this.mcq.render(
      "rating",
      "What rating would you give this course overall? (1 is worst, 5 is best)",
      ["1","2","3","4","5"]
    );
  }
}

class DifficultyQuestion {
  constructor() {
    this.mcq = new MultipleChoiceQuestion();
  }

  render() {
    return this.mcq.render(
      "rating",
      "How difficult was this course? (1 is easy, 5 is hard)",
      ["1","2","3","4","5"]
    );
  }
}

class ReviewTextBox {
  render() {
    const div = document.createElement('div');

    const title = document.createElement('h4');
    title.textContent = "Type your review below:";
    div.appendChild(title);

    const textarea = document.createElement('textarea');
    textarea.id = 'review_text';
    textarea.rows = 10;
    textarea.cols = 50;

    div.appendChild(textarea);
    return div;
  }
}

class ButtonsDiv {
  constructor() {
    this.submit = new SubmitButton();
  }

  render() {
    const div = document.createElement('div');
    div.appendChild(this.submit.render());
    return div;
  }
}

class SubmitButton {
  render() {
    const button = document.createElement('input');
    button.type = 'button';
    button.classList.add('review-button');
    button.value = 'Submit Review';
    return button;
  }
}

// Line break for spacing
class LineBreak {
  render() {
    return document.createElement('br');
  }
}

main();

