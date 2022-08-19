import * as crud from "./crud.js";

// let ALL_COURSES_OBJ = await crud.getAllCourses();

class HomePageApp {
  constructor() {
    this.header = new Header();
    this.login = new LoginButton();
    this.logout = new LogoutButton();
    this.profile = new UserProfileButton();
    this.courses = new Courses();
  }

  async render() {
    const element = document.createElement('div');
    element.appendChild(this.header.render("UMass Course Review", "Computer Science"));
    
    const isLoggedIn = await crud.isLoggedIn();
    if (isLoggedIn) {
      element.appendChild(this.profile.render());
      element.appendChild(this.logout.render());
    } else {
      element.appendChild(this.login.render(true));
      element.appendChild(this.login.render(false));
    }
    element.appendChild(await this.courses.render());
    return element;
  }
}

class LoginButton {
  render(isLogin) {
    const button = document.createElement('input');
    button.classList.add("review-button");
    button.type = 'button';
    button.value = isLogin ? 'Log In' : 'Register';
    button.addEventListener('click', () => {
      isLogin? startLoginPage() : startRegisterPage();
    });
    return button;
  }
}

class LogoutButton {
  render() {
    const button = document.createElement('input');
    button.classList.add("review-button");
    button.type = 'button';
    button.value = 'Log Out';
    button.addEventListener('click', () => {
      crud.logout();
      startHomePage();
    });
    return button;
  }
}

class UserProfileButton {
  render() {
    const button = document.createElement('input');
    button.classList.add("review-button");
    button.type = 'button';
    button.value = 'Profile';
    button.addEventListener('click', () => {
      startUserProfilePage();
    });
    return button;
  }
}

class CourseButton {
  render(courseObj) {
    const button = document.createElement('input');
    button.classList.add("course-name");
    button.type = 'button';
    button.value = courseObj.name;
    // console.log(course);
    button.addEventListener('click', () => {
      startCoursePage(courseObj._id);
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

  async render() {
    const table = document.createElement("div");
    table.id = "courses";
    table.classList.add("container");
    table.classList.add("text-center");
    // table.innerHTML = "hello";

    const courses = await crud.getAllCourses();
    // console.log(courses);
    for (const cnt in courses) {
      // display the name of the course
      // each of these will be a button that gets the info page
      // of the corresponding course
      // console.log(courses[cnt]);
      const curCourse = courses[cnt]
      const nameRow = this.row.render();
      const nameCol = this.col.render();
      const courseButton = this.button.render(curCourse);
      nameCol.append(courseButton);
      nameRow.appendChild(nameCol);
      table.appendChild(nameRow);

      // display the title of the course
      const titleRow = this.row.render();
      const titleCol = this.col.render();
      titleCol.classList.add("title");
      titleCol.innerHTML = curCourse.title;
      titleRow.appendChild(titleCol);
      table.appendChild(titleRow);

      // dispaly some basic info about the course
      const infoRow = this.row.render();

      function generateAvgText(element, isNumber) {
        if (curCourse[element] === 0) { 
          return "<b>N/A<b>";
        }
        let text = "<b>" + curCourse[element] + "</b>";
        if (isNumber) {
          text += "/5";
        }
        return text;
      }

      const ratingCol = this.col.render();
      const rating = generateAvgText("rating", true);
      ratingCol.innerHTML = "Overall Rating: " + rating;
      infoRow.appendChild(ratingCol);

      const diffCol = this.col.render();
      const difficulty = generateAvgText("difficulty", true)
      diffCol.innerHTML = "Difficulty: " + difficulty;
      infoRow.appendChild(diffCol);

      const gradeCol = this.col.render();
      const grade = generateAvgText("grade", false);
      gradeCol.innerHTML = "Average Grade: " + grade;
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
  constructor(course) {
    this.header = new Header();
    this.backButton = new BackToHomeButton();
    this.description = new Description();
    this.avg = new Averages();
    this.reviewHeader = new ReviewHeader();
    this.addReviewButton = new AddReviewButton();
    this.reviews = new Reviews();
    this.break = new LineBreak();
    this.course = course; // ex: "compsci_121"
  }

  async render() {
    // This will show the name of the course being displayed
    // when I implement the backend
    // console.log(this.course)
    const courseObj = await crud.getCourse(this.course);

    document.title = `${courseObj.name} - UMass Course Review`;

    const element = document.createElement('div');
    element.appendChild(this.header.render("UMass Course Review", `${courseObj.name}: ${courseObj.title}`));
    element.appendChild(this.backButton.render());

    element.appendChild(this.description.render(courseObj.description));
    element.appendChild(this.avg.render(courseObj));

    element.appendChild(this.reviewHeader.render());
    element.appendChild(this.addReviewButton.render(this.course));
    element.appendChild(this.break.render());
    element.appendChild(this.reviews.render(courseObj.reviews, false));
    return element;
  }
}

class BackToHomeButton {
  render() {
    const button = document.createElement('input');
    button.type = 'button';
    button.classList.add('review-button');
    button.value = 'Back';
    button.addEventListener('click', () => {
      startHomePage();
    });
    return button;
  }
}

class Description {
  render(text) {
    const div = document.createElement('div');
    div.classList.add('desc-box');
    div.textContent = text;
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
  render(courseName) {
    const button = document.createElement('input');
    button.classList.add('review-button');
    button.type = 'button';
    button.value = 'Add Review';
    button.addEventListener('click', () => startReviewPage(courseName));
    const block = document.createElement('div');
    block.appendChild(button);
    return block;
  }
}

class Averages {
  constructor() {
    this.row = new TableRow();
    this.col = new TableCol();
    // this.button = new CourseButton();
  }

  render(courseObj) {
    this.course = courseObj;

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
    ratingDataCol.innerHTML = this.course.rating;
    ratingDataCol.classList.add('average');
    dataRow.appendChild(ratingDataCol);

    const diffDataCol = this.col.render();
    diffDataCol.innerHTML = this.course.difficulty;
    diffDataCol.classList.add('average');
    dataRow.appendChild(diffDataCol);

    const gradeDataCol = this.col.render();
    gradeDataCol.innerHTML = this.course.grade;
    gradeDataCol.classList.add('average');
    dataRow.appendChild(gradeDataCol);

    table.appendChild(dataRow);

    // Create a line break for spacing
    const lineBreak = document.createElement('br');
    table.appendChild(lineBreak);
    
    return table;
  }
}

class Reviews {
  constructor() {
    this.row = new TableRow();
    this.col = new TableCol();
    this.button = new CourseButton();
    this.space = new LineBreak();
    this.delete = new DeleteButton();
  }

  render(courseReviews, isUser) {
    const table = document.createElement("div");
    table.id = "courses";
    table.classList.add("container");
    table.classList.add("text-center");
    // table.innerHTML = "hello";

    for (const review of courseReviews) {

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

      // Add delete button if this is the list of user reviews
      if (isUser) {
        const delButton = this.delete.render();
        table.appendChild(delButton);
      }

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
  constructor(course) {
    this.header = new Header();
    this.gradeQuestion = new GradeQuestion();
    this.diffQuestion = new DifficultyQuestion();
    this.ratingQuestion = new RatingQuestion();
    this.reviewText = new ReviewTextBox();
    this.buttons = new ButtonsDiv();
    this.break = new LineBreak();
    this.course = course;
  }

  async render() {
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

    element.appendChild(this.buttons.render(this.course));

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
    this.back = new BackToCourseButton();
    this.submit = new SubmitButton();
  }

  render(course) {
    const div = document.createElement('div');
    div.appendChild(this.back.render(course));
    div.appendChild(this.submit.render(course));
    return div;
  }
}

class BackToCourseButton {
  render(course) {
    const button = document.createElement('input');
    button.type = 'button';
    button.classList.add('review-button');
    button.value = 'Back';
    button.addEventListener('click', () => {
      startCoursePage(course);
    });
    return button;
  }
}

class SubmitButton {
  render(course) {
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
          user: "aaa",
          grade: gradesQ,
          difficulty: diffQ,
          rating: ratingQ,
          text: reviewText
        }
        crud.postReview(course, newReview);
        // courses[courseNumber].reviews.push(newReview);
        // console.log(course);
        startCoursePage(course);
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
// Login Page
class LoginPage {
  constructor() {
    this.backButton = new BackToHomeButton();
  }

  render(isLogin) {
    // Div to contain everything
    const element = document.createElement('div');

    // Back Button
    element.appendChild(this.backButton.render());

    // Header
    const header = document.createElement('h1');
    header.textContent = isLogin ? "Login" : "Register";
    element.appendChild(header);

    // Form
    const form = document.createElement('login_form');
    form.action = isLogin? '/login' : '/register';
    // form.method = 'post';

    // Username
    const usernameDiv = document.createElement('div');
    const usernameLabel = document.createElement('label');
    usernameLabel.textContent = 'Username:';
    const usernameInput = document.createElement('input');
    usernameInput.type = 'text';
    usernameInput.name = 'username';
    usernameDiv.appendChild(usernameLabel);
    usernameDiv.appendChild(usernameInput);

    // Password
    const passwordDiv = document.createElement('div');
    const passwordLabel = document.createElement('label');
    passwordLabel.textContent = 'Password:';
    const passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.name = 'password';
    passwordDiv.appendChild(passwordLabel);
    passwordDiv.appendChild(passwordInput);

    // Submit button
    const submitDiv = document.createElement('div');
    const submitInput = document.createElement('input');
    submitInput.type = 'button';
    submitInput.value = isLogin ? 'Log In' : 'Register';
    submitInput.addEventListener('click', async () =>{
      const username = document.getElementsByName('username')[0].value;
      const password = document.getElementsByName('password')[0].value;

      if (isLogin) {
        const res = await crud.login(username, password);

        if (res.ok) {
          startHomePage();
        } else {
          alert("Username or password incorrect. Try again");
        }
      } else {
        const res = await crud.register(username, password);

        if (res.ok) {
          startLoginPage();
        } else {
          alert("This username has already been taken");
        }
     }
    });
    submitDiv.appendChild(submitInput);

    form.appendChild(usernameDiv);
    form.appendChild(passwordDiv);
    form.appendChild(submitDiv);

    element.appendChild(form);

    return element;
  }
}


// ----------------------------------------
// User Profile Page (can only be accessed when logged in)
class UserProfilePage {
  constructor() {
    this.backButton = new BackToHomeButton();
    this.reviews = new Reviews();
  }

  async render() {
    const div = document.createElement('div');
    
    // Back Button
    const backButton = this.backButton.render();
    div.appendChild(backButton);

    const userReviews = await this._filterReviewsByUser();

    const reviews = this.reviews.render(userReviews, true);
    div.appendChild(reviews);

    return div;
  }

  async _filterReviewsByUser() {
    const usernameData = await crud.getUsername();
    const curUsername = usernameData.username;
    const userReviews = await crud.getReviewsOf(curUsername);
    return userReviews;
  }
}

class DeleteButton {
  render() {
    const button = document.createElement('input');
    button.type = 'button';
    button.classList.add('review-button');
    button.value = 'Delete';
    return button;
  }
}


// ----------------------------------------

// Start the app
async function startHomePage() {
  const app = new HomePageApp();
  const root = document.getElementById('app');
  root.innerHTML = "";
  root.appendChild(await app.render());
}

async function startCoursePage(courseName) {
  const app = new CoursePageApp(courseName);
  const root = document.getElementById('app');
  root.innerHTML = "";
  root.appendChild(await app.render());
}

async function startReviewPage(courseName) {
  const app = new ReviewPageApp(courseName);
  const root = document.getElementById('app');
  root.innerHTML = "";
  root.appendChild(await app.render());
}

function startLoginPage() {
  const app = new LoginPage();
  const root = document.getElementById('app');
  root.innerHTML = "";
  root.appendChild(app.render(true));
}

function startRegisterPage() {
  const app = new LoginPage();
  const root = document.getElementById('app');
  root.innerHTML = "";
  root.appendChild(app.render(false));
}

async function startUserProfilePage() {
  const app = new UserProfilePage();
  const root = document.getElementById('app');
  root.innerHTML = "";
  root.appendChild(await app.render());
}

startHomePage();