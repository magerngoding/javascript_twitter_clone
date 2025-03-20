document.addEventListener('DOMContentLoaded', () => {

    const formManager = document.getElementById('formManager')
    const userName = document.getElementById('name')
    const userAvatar = document.getElementById('avatar')
    const userUsername = document.getElementById('username')
    const userPassword = document.getElementById('password')

    const instantFeedback = document.getElementById('instantFeedback')

    instantFeedback.style.display = 'none'


    const userManager = new User(); // import user / instance

    // membuat format tanggal yang disimpan 'yyyy-mm-dd'
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0') // 01 02 03
    const day = String(now.getDate()).padStart(2, '0')

    formManager.addEventListener('submit', (event) => {

        event.preventDefault() // proses lempar data Controller ke Model

        const userData = { // ini object
            name: userName.value,
            username: userUsername.value,
            avatar: userAvatar.value,
            password: userPassword.value,
            createdAt: `${year}-${month}-${day}`,
        };

        // lempar object ke user model
        const result = userManager.saveUser(userData);

        if (result.success) {
            instantFeedback.style.display = 'none';
            // arahkan pengguna kepada halaman lain -> login
            return window.location.href = '../login.html'

        } else {
            instantFeedback.style.display = 'flex';
            instantFeedback.textContent = result.error;
        }
    })
})