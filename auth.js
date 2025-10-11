
let isLogin = true; // By default we are in login mode

// reference of all the html tags that are gonna change dynamically
const formTitle = document.getElementById('formTitle');   // login or signup test
const toggleLink = document.getElementById('toggleLink'); // link to switch forms
const toggleText = document.getElementById('toggleText'); // paragraph containing the info
const submitBtn = document.getElementById('submitBtn'); // submit button


// when we click on the toggle link (signup link OR login link) it toggle the content like if login then change to signup and vice-versa
toggleLink.addEventListener('click', () => {
  isLogin = !isLogin;
  formTitle.textContent = isLogin ? 'Login' : 'Signup';
  submitBtn.textContent = isLogin ? 'Login' : 'Signup';
  toggleText.innerHTML = isLogin 
    ? "Don't have an account? <a id='toggleLink'>Signup</a>"    // login mode
    : "Already have an account? <a id='toggleLink'>Login</a>";  // signup mode
  
  // after these changes the anchor tag , element for signup and login recreated so we need to attach the event listner to it
  document.getElementById('toggleLink').addEventListener('click', () => toggleLink.click());
});

// when user click to login or signup this function executes

submitBtn.addEventListener('click', () => {
  // we fetch the username and password from the input fields and trim its extra spaces in the end and start
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  // if any of the field is empty we shows a alert box
  if (!username || !password) {
    alert('Please enter both fields');
    return;
  }

  // get all saved users from localStorage (or create an empty object if no one is there)
  const users = JSON.parse(localStorage.getItem('users')) || {};

  // if we are in login mode
  if (isLogin) {
    // check whether user exist and password matched perfectly
    if (users[username] && users[username] === password) {
      // if matched then in local storage we set the currentUser = user logs in now and send a confirmation alert that login successful!
      localStorage.setItem('currentUser', username);
      alert('Login successful!');[]

      // after login we redirect to the game.html file
      window.location.href = 'game.html';
    } else {
      // otherwise invalid details
      alert('Invalid username or password!');
    }

  } 
  else {    // if we are in signup mode
    // is user already exist then we show the alert username already exist
    if (users[username]) {
      alert('Username already exists!');
    } 
    else {
      // otherwise we set the password and the user in the localStorage , this is a object so we store it as a string using JSON.stringify meathod, and change the page for login 
      
      users[username] = password;
      localStorage.setItem('users', JSON.stringify(users));
      alert('Signup successful! You can now login.');

      isLogin = true;
      formTitle.textContent = 'Login';
      submitBtn.textContent = 'Login';
      toggleText.innerHTML = "Don't have an account? <a id='toggleLink'>Signup</a>";

      // we again create the anchor tag so event listner needs to be attached again
      document.getElementById('toggleLink').addEventListener('click', () => toggleLink.click());
    }
  }
});
