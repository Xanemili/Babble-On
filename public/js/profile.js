window.addEventListener('DOMContentLoaded', async (e) => {
    try {
    const userId = localStorage.getItem('babble_user_id');

    const res1 = await fetch(`/api/users/${userId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('babble_access_token')}`,
        },
    });

    const res2 = await fetch(`/api/users/${userId}/babbles`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('babble_access_token')}`,
        },
    });


    const { user } = await res1.json();
    const { babbles } =  await res2.json();

    document.querySelector('.username-div').innerHTML = user.userName
    document.querySelector('.user-name-div').innerHTML = `${user.firstName} ${user.lastName}`
    document.querySelector('.user-email-div').innerHTML = user.email
    document.querySelector('.bio-div').innerHTML = `This will display user biography: ${user.biography}`
    document.querySelector('.follow-list-div').innerHTML = "This will display user following list"
    const profileContainer = document.querySelector('.main-container')
//Implement tennery
    for (let i = 0; i < 5; i++) {
    const babbleDiv = document.createElement('div');
    const babbleTitleDiv = document.createElement('div');
    const babbleSubTitleDiv = document.createElement('div');
    babbleDiv.classList.add('bottom-div-container')
    babbleTitleDiv.classList.add('babble-title-div')
    babbleSubTitleDiv.classList.

    const babbleTitle = babbles[i].title;

    babbleTitleDiv.innerHTML = babbleTitle;

    babbleDiv.append(babbleTitleDiv)
    profileContainer.append(babbleDiv)

    }

} catch(err) {
    console.error(err)
}
});