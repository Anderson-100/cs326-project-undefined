// import { main } from "/home.js";
// import { CoursePageApp } from "./course_page";
// import { ReviewApp } from "./submit_review";

const homePageApp = main();
// const coursePageApp = new CoursePageApp();
// const reviewApp = new ReviewApp();

const root = document.getElementById('app');
root.appendChild(homePageApp.render());