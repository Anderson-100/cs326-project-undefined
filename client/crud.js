export async function getAllCourses() {
  const response = await fetch(
    '/getAllCourses',
    {
      method: 'GET',
    }
  );
  const data = await response.json();
  return data;
}

export async function getCourse(course) {
  const response = await fetch(
    `/course/${course}`,
    {
      method: 'GET',
    }
  );
  const data = await response.json();
  return data;
}

export async function getReviewPage(courseName) {
  const response = await fetch(
    `/review/${courseName}`,
    {
      method: 'GET',
    }
  );
  const data = await response.json();
  return data;
}

export async function postReview(courseName) {
  const response = await fetch(
    `/review/post/${courseName}`,
    {
      method: 'POST',
    }
  );
  const data = await response.json();
  return data;
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