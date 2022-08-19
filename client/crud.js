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
  const response = await fetch(`/course/${course}`,
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

export async function getReviewPage(courseName) {
  const response = await fetch(`/review/${courseName}`,
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

export async function getReviewsOf(userName) {
  const response = await fetch(`/reviews/${userName}`,
    {
      method: 'GET',
    }
  );
  const data = await response.json();
  return data;
}

export async function postReview(courseName, reviewObj) {
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

export async function deleteReview(id) {
  const response = await fetch(`/review/delete/`,
  {
    method: 'DELETE',
    body: JSON.stringify({ id: id }),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  });
  const data = await response.json();
  return data;
}

export async function login(username, password) {
  const response = await fetch(`/login`,
  {
    method: 'POST',
    body: JSON.stringify({ username: username, password: password}),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  });
  const data = await response.json();
  return data;
}

export async function isLoggedIn() {
  const response = await fetch(`/isLoggedIn`,
  {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  });
  const data = await response.json();
  return data.isLoggedIn;
}

export async function getUsername() {
  const response = await fetch(`/username`,
  {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  });
  const data = await response.json();
  return data;
}

export async function logout() {
  const response = await fetch(`/logout`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  });
  const data = await response.json();
  return data;
}

export async function register(username, password) {
  const response = await fetch(`/register`,
  {
    method: 'POST',
    body: JSON.stringify({ username: username, password: password}),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  });
  const data = await response.json();
  return data;
}