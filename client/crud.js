export async function getAllCourses() {
  const response = await fetch('/getAllCourses',
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    }
  );
  const data = await response.json();
  return data;
}

export async function getCourse(course) {
  // console.log(course);
  const response = await fetch(`/course/${course}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    }
  );
  const data = await response.json();
  // console.log(data);
  return data;
}

export async function getReviewPage(courseName) {
  const response = await fetch(`/review/${courseName}`,
    {
      method: 'GET',
    }
  );
  const data = await response.json();
  return data;
}

export async function postReview(courseName, reviewObj) {
  // console.log("crud.js");
  // console.log(reviewObj);
  const response = await fetch(`/review/post/${courseName}`, 
  {
    method: 'POST',
    body: JSON.stringify(reviewObj),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  });
  // const data = await response.json();
  // return data;
}

export async function editReview(courseName) {
  const response = await fetch(
    `review/edit/${courseName}`,
    {
      method: 'PUT',
    }
  );
  const data = await response.json();
  return data;
}

export async function deleteReview(courseName) {
  const response = await fetch(
    `review/delete/${courseName}`,
    {
      method: 'DELETE',
    }
  );
  const data = await response.json();
  return data;
}