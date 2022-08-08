class App {
  constructor() {
    this.gradeQuestion = new GradeQuestion();
  }

  render() {
    const element = document.createElement('div');

    element.appendChild(this.gradeQuestion.render());

    return element;
  }
}

class GradeQuestion {
  constructor() {
    this.break = new LineBreak();
  }

  render() {
    const div = document.createElement('div');

    const title = document.createElement('h4');
    title.textContent = "What grade did you receive in this course?";
    div.appendChild(title);

    const form = document.createElement('form');
    const grades = ["A","A-","B+","B","B-","C+","C","C-","D+","D","D-","F"];
    grades.forEach(grade => {
      const input = document.createElement('input');
      input.type = 'radio';
      input.id = grade;
      input.class = "multiple-choice-question";
      input.value = grade;
      form.appendChild(input);

      const label = document.createElement('label');
      label.for = grade;
      label.textContent = grade;
      form.appendChild(label);

      // form.appendChild(this.break.render());
    });

    div.appendChild(form);
    return div;
  }
}

class LineBreak {
  render() {
    return document.createElement('br');
  }
}

function main() {
  const app = new App();
  const root = document.getElementById('app');
  root.appendChild(app.render());
}

main();