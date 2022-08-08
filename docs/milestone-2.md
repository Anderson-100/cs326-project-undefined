## List of Data Interactions

#### Home Page
- Clicking on course name will display the details for that course.
- More specifically, it will send a **GET** method with `course/?dept=compsci&course={course name}` as the URL and fetch the data for the course that was clicked on *(to be implemented with backend)*.

#### Course Page:
- Displays the data (description, rating, difficulty, grade, reviews) for a specific course. The data will be different for every course, but the layout and code for every course will be the same.
- Clicking on the review button will invoke a **GET** method with `review/?course={course name}` as the URL, where the course name corresponds with the course page that the user was just on. This will get the contents of the Review Page, where users can submit a new review for the course in the URL *(to be implemented with backend)*.

#### Review Page:
- Displays the 3 multiple-choice questions and text box for the review.
- Clicking the submit review button will **POST** the inputted info into the server and be saved as another review for the corresponding course. Then, the website will return to the course page, where the new review will be visible and the average values will be updated.