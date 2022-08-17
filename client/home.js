const courses = [
  {
    name: "COMPSCI 121",
    title: "Introduction to Problem Solving with Computers",
    difficulty: 3.2,
    grade: "B+",
    rating: 4.2,
    description: "",
    reviews: [],
  },
  {
    name: "COMPSCI 187",
    title: "Programming with Data Structures",
    difficulty: 4.0,
    grade: "B",
    rating: 2.5,
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
  },
  {
    name: "COMPSCI 220",
    title: "Programming Methodology",
    difficulty: 4.8,
    grade: "B-",
    rating: 4.5,
    description: "",
    reviews: []
  },
  {
    name: "COMPSCI 230",
    title: "Computer System Principles",
    difficulty: 3.5,
    grade: "A-",
    rating: 3.9,
    description: "",
    reviews: []
  },
  {
    name: "COMPSCI 240",
    title: "Reasoning Under Uncertainty",
    difficulty: 2.7,
    grade: "A-",
    rating: 4.3,
    description: "",
    reviews: []
  },
  {
    name: "COMPSCI 250",
    title: "Introduction to Computation",
    difficulty: 4.3,
    grade: "B+",
    rating: 4.0,
    description: "",
    reviews: []
  }
];

export class HomePageApp {
  constructor() {
    this.header = new Header();
    this.courses = new Courses();
  }

  render() {
    const element = document.createElement('div');
    element.appendChild(this.header.render("UMass Course Review", "Computer Science"));
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
      let courseNumber = 0;
      for (let i = 0; i < courses.length; i++) {
        if (courses[i].name === courseName) {
          courseNumber = i;
        }
      }
      startCoursePage(courseNumber);
      // console.log(`${courseName} button pressed`);
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

// ----------------------------------------------


// Course Page
class CoursePageApp {
  constructor(courseNumber) {
    this.header = new Header();
    this.description = new Description();
    this.avg = new Averages();
    this.reviewHeader = new ReviewHeader();
    this.addReviewButton = new AddReviewButton();
    this.reviews = new Reviews();
    this.break = new LineBreak();
    this.course = courses[courseNumber];
    this.courseNumber = courseNumber;
  }

  render() {
    // This will show the name of the course being displayed
    // when I implement the backend

    document.title = `${this.course.name} - UMass Course Review`;

    const element = document.createElement('div');
    element.appendChild(this.header.render("UMass Course Review", `${this.course.name}: ${this.course.title}`));
    element.appendChild(this.description.render(this.course));
    element.appendChild(this.avg.render(this.course));

    element.appendChild(this.reviewHeader.render());
    element.appendChild(this.addReviewButton.render(this.courseNumber));
    element.appendChild(this.break.render());
    element.appendChild(this.reviews.render(this.course));
    return element;
  }
}

class Description {
  render(course) {
    const div = document.createElement('div');
    div.classList.add('desc-box');
    div.textContent = course.description;
    return div;
  }
}

class ReviewHeader {
  render() {
    const header = document.createElement('h2');
    header.textContent = "Reviews";
    return header;
  }
}

// Clicking this button will pull up the page to write a review
class AddReviewButton {
  render(courseNumber) {
    const button = document.createElement('input');
    button.classList.add('review-button');
    button.type = 'button';
    button.value = 'Add Review';
    button.addEventListener('click', () => startReviewPage(courseNumber));
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

  render(course) {
    this.course = course;

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
    const arr = this.course.reviews;
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
    const arr = this.course.reviews;
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

  render(course) {
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
      gradeCol.innerHTML = "Grade: <b>" + review.grade + "</b>";
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


// ----------------------------------------



// Review App Page
class ReviewPageApp {
  constructor(courseNumber) {
    this.header = new Header();
    this.gradeQuestion = new GradeQuestion();
    this.diffQuestion = new DifficultyQuestion();
    this.ratingQuestion = new RatingQuestion();
    this.reviewText = new ReviewTextBox();
    this.buttons = new ButtonsDiv();
    this.break = new LineBreak();

    this.course = courses[courseNumber];
    this.courseNumber = courseNumber;
  }

  render() {
    document.title = "Submit a Review - UMass Course Review "
    const element = document.createElement('div');

    element.appendChild(this.header.render("UMass Course Review", `Submit a Review for: ${this.course.name}`));

    element.appendChild(this.gradeQuestion.render());
    element.appendChild(this.break.render());

    element.appendChild(this.diffQuestion.render());
    element.appendChild(this.break.render());

    element.appendChild(this.ratingQuestion.render());
    element.appendChild(this.break.render());

    element.appendChild(this.reviewText.render());
    element.appendChild(this.break.render());

    element.appendChild(this.buttons.render(this.courseNumber));

    return element;
  }
}


// Header elements shared by all 3 pages
class Header {
  constructor() {
    this.header1 = new Header1();
    this.header2 = new Header2();
  }
  
  render(h1Text, h2Text) {
    const block = document.createElement('div');
    block.classList.add('page-header');
    block.appendChild(this.header1.render(h1Text));
    block.appendChild(this.header2.render(h2Text));

    return block;
  }
}

// Website Name
class Header1 {
  render(text) {
    const header = document.createElement('h1');
    header.textContent = text;
    return header;
  }
}

// Subtitle
class Header2 {
  render(text) {
    const header = document.createElement('h5');
    header.textContent = text;
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
    });

    div.appendChild(form);

    const resultDiv = document.createElement('div');
    resultDiv.id = name + "Result";
    div.appendChild(resultDiv);
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
      "difficulty",
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

  render(courseNumber) {
    const div = document.createElement('div');
    div.appendChild(this.submit.render(courseNumber));
    return div;
  }
}

class SubmitButton {
  render(courseNumber) {
    const button = document.createElement('input');
    button.type = 'button';
    button.classList.add('review-button');
    button.value = 'Submit Review';
    button.addEventListener('click', () => {
      
      function getInput(question) {
        const qElements = document.getElementsByName(question);

        for (let i = 0; i < qElements.length; i++) {
          if (qElements[i].checked) {
            return qElements[i].value;
          }
        }
        return undefined;
      }
      
      const gradesQ = getInput("grade");
      const diffQ = getInput("difficulty");
      const ratingQ = getInput("rating");
      const textBox = document.getElementById("review_text");
      const reviewText = textBox.value.trim()

      if (!gradesQ || !diffQ || !ratingQ || reviewText === "") {
        alert("Please fill in all the questions");
      }
      else {
        const newReview = {
          grade: gradesQ,
          difficulty: diffQ,
          rating: ratingQ,
          text: reviewText
        }
        courses[courseNumber].reviews.push(newReview);

        startCoursePage(courseNumber);
      }
    })
    return button;
  }
}

// Line break for spacing
class LineBreak {
  render() {
    return document.createElement('br');
  }
}




// ----------------------------------------

// Start the app
function startHomePage() {
  const app = new HomePageApp();
  const root = document.getElementById('app');
  root.innerHTML = "";
  root.appendChild(app.render());
}

function startCoursePage(courseNumber) {
  const app = new CoursePageApp(courseNumber);
  const root = document.getElementById('app');
  root.innerHTML = "";
  root.appendChild(app.render());
}

function startReviewPage(courseNumber) {
  const app = new ReviewPageApp(courseNumber);
  const root = document.getElementById('app');
  root.innerHTML = "";
  root.appendChild(app.render());
}

startHomePage();

