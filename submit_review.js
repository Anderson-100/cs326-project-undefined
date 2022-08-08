class App {
  constructor() {
    this.gradeQuestion = new GradeQuestion();
    this.ratingQuestion = new RatingQuestion();
  }

  render() {
    const element = document.createElement('div');

    element.appendChild(this.gradeQuestion.render());
    element.appendChild(this.ratingQuestion.render());

    return element;
  }
}

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