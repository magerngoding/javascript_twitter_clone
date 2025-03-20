document.addEventListener('DOMContentLoaded', () => {

    // Penting pertama deklarasi 
    const usernameLoggedIn = localStorage.getItem('usernameLoggedIn')

    const instantFeedback = document.getElementById('instantFeedback');
    instantFeedback.style.display = 'none';

    const twittForm = document.getElementById('twittForm');
    const ownerPhoto = document.getElementById('ownerPhoto');
    const twittsWrapper = document.getElementById('twittsWrapper');
    const twittContent = document.getElementById('twittContent');

    let selectedFeeling = null;

    // select semua class
    const feeligItems = document.querySelectorAll('.item-feeling')

    feeligItems.forEach(item => {

        item.addEventListener('click', () => {

            selectedFeeling = item.getAttribute('data-feeling') // attribute div

            feeligItems.forEach(i => i.classList.remove('border-[#1880e8]'));

            item.classList.add('border-[#1880e8]');
        })
    });

    // import model
    const twittManager = new Twitt();
    const userManager = new User();

    const twittUsers = userManager.getUsers();


    const ownerLoggedIn = twittUsers.find(user => user.username.toLowerCase() === usernameLoggedIn.toLowerCase());
    ownerPhoto.src = ownerLoggedIn.avatar;

    // membuat format tanggal yang disimpan 'yyyy-mm-dd'
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0') // 01 02 03
    const day = String(now.getDate()).padStart(2, '0')

    twittForm.addEventListener('submit', (event) => {

        event.preventDefault(); // agar tidak scroll ke atas

        const twittData = { // object data yang akan dilempar
            twittContent: twittContent.value,
            twittUsernameOwner: usernameLoggedIn,
            twittFeeling: selectedFeeling,
            twittCreatedAt: `${year}-${month}-${day}`,
        };

        const result = twittManager.saveTwitt(twittData);

        if (result.success) {
            // reset data form kembali kosong 
            instantFeedback.style.display = 'none';
            twittContent.value = '';
            selectedFeeling = null;

            feeligItems.forEach(item => {
                item.classList.remove('border-[#1880e8]');
            })
        }
        else {
            instantFeedback.style.display = 'flex';
            instantFeedback.textContent = result.error;
        }
    })

});