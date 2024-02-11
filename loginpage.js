function checkLogin() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var loginStatus = document.getElementById('loginStatus');

    // Add your authentication logic here
    if (username === 'placeholder' && password === 'placeholder') {
        loginStatus.innerHTML = 'Login successful!';
        window.location.href = 'flappybirb.html';
    } else {
        loginStatus.innerHTML = 'Invalid username or password';
    }
}

//npm init -y
//npm install express