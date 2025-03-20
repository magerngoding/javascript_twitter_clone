document.addEventListener('DOMContentLoaded', () => {

    const formManager = document.getElementById('formManager')
    const userUsername = document.getElementById('username')
    const userPassword = document.getElementById('password')

    const instantFeedback = document.getElementById('instantFeedback')

    instantFeedback.style.display = 'none'

    const userManager = new User(); // import user / instance

    formManager.addEventListener('submit', (event) => {

        event.preventDefault() // proses lempar data Controller ke Model

        const userData = { // ini object
            username: userUsername.value,
            password: userPassword.value,
        };

        // lempar object ke user model
        const result = userManager.userSignIn(userData);

        if (result.success) {
            instantFeedback.style.display = 'none';
            localStorage.setItem('usernameLoggedIn', userUsername.value);
            // arahkan pengguna kepada halaman lain -> home page
            return window.location.href = '../index.html';

        } else {
            instantFeedback.style.display = 'flex';
            instantFeedback.textContent = result.error;
        }
    })
})