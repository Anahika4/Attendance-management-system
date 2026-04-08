async function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const res = await fetch('/auth/login', {   
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.error);
    return;
  }

  if (data.user.role === 'admin') {
    window.location.href = 'admin.html';
  } else if (data.user.role === 'faculty') {
    window.location.href = 'faculty.html';
  } else {
    window.location.href = 'student.html';
  }
}