const courses = [
  {
    name: "COMPSCI 121",
    difficulty: 3.2,
    grade: "B+",
    rating: 4.2
  },
  {
    name: "COMPSCI 187",
    difficulty: 4.1,
    grade: "B",
    rating: 3.8
  },
  {
    name: "COMPSCI 220",
    difficulty: 4.8,
    grade: "B-",
    rating: 4.5
  },
  {
    name: "COMPSCI 230",
    difficulty: 3.5,
    grade: "A-",
    rating: 3.9
  },
  {
    name: "COMPSCI 240",
    difficulty: 2.7,
    grade: "A-",
    rating: 4.3
  },
  {
    name: "COMPSCI 250",
    difficulty: 4.3,
    grade: "B+",
    rating: 4.0
  }
];

class App {
  constructor() {
    const state = new State();
    this.header1 = new Header1();
    this.header2 = new Header2();
    // this.textarea = new TextArea(state);
    // this.button = new Button(this.textarea);
    this.courses = new Courses();
  }

  render() {
    const element = document.createElement('div');
    element.appendChild(this.header1.render());
    element.appendChild(this.header2.render());
    element.appendChild(this.courses.render());
    return element;
  }
}

class Header1 {
  render() {
    const header = document.createElement('h1');
    header.textContent = 'UMass Course Review';
    return header;
  }
}

class Header2 {
  render() {
    const header = document.createElement('h5');
    header.textContent = 'Created by Anderson Hsiao';
    return header;
  }
}

class TextArea {
  element = null;

  constructor(state) {
    this.state = state;
  }

  render() {
    const textarea = document.createElement('textarea');
    textarea.id = 'writing_area';
    textarea.rows = 10;
    textarea.cols = 50;
    textarea.value = this.state.get();
    textarea.addEventListener('keyup', (e) => this.keyup(e));
    this.element = textarea;
    return textarea;
  }

  keyup(e) {
    this.state.set(e.target.value);
  }

  clear() {
    this.state.set('');
    this.element.value = '';
  }
}

class Button {
  constructor(textarea) {
    this.textarea = textarea;
  }

  render() {
    const button = document.createElement('input');
    button.type = 'button';
    button.value = 'Clear';
    button.addEventListener('click', () => this.textarea.clear());
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

class Courses {
  constructor() {
    this.row = new TableRow();
    this.col = new TableCol();
    this.button = new CourseButton();
  }

  render() {
    const table = document.createElement("div");
    table.id = "courses";
    table.classList.add("container");
    table.classList.add("text-center");
    // table.innerHTML = "hello";

    for (const course of courses) {
      // display the name of the course
      const nameRow = this.row.render();
      const nameCol = this.col.render();
      // nameCol.innerHTML = course.name;
      const courseButton = this.button.render(course.name);
      nameCol.append(courseButton);
      nameRow.appendChild(nameCol);
      table.appendChild(nameRow);

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
      const lineBreak = document.createElement('br');
      table.appendChild(lineBreak);
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

class State {
  get() {
    const v = window.localStorage.getItem('state');
    return v ? v : '';
  }

  set(value) {
    window.localStorage.setItem('state', value);
  }
}

function main() {
  const app = new App();
  const root = document.getElementById('app');
  root.appendChild(app.render());
}

main();
