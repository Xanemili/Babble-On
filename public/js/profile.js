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
    const date = new Date(Date(babbles.updatedAt))
    const babbleDiv = document.createElement('div');
    const babbleLeftDiv = document.createElement('div');
    const babbleRightDiv = document.createElement('div');
    const babbleTitleDiv = document.createElement('div');
    const babbleSubHeaderDiv = document.createElement('div');
    const babbleTimestampDiv = document.createElement('div');
    const readTimeDiv = document.createElement('div');
    const babbleImgUrl = document.createElement('img');
    const babbleImgDiv = document.createElement('div');


    babbleDiv.classList.add('bottom-div-container');
    babbleLeftDiv.classList.add('bottom-left-div-container');
    babbleRightDiv.classList.add('bottom-right-div-container');
    babbleTitleDiv.classList.add('babble-title-div');
    babbleSubHeaderDiv.classList.add('sub-title-div');
    babbleTimestampDiv.classList.add('timestamp-div');
    readTimeDiv.classList.add('.read-time-div')
    babbleImgDiv.classList.add('babble-img-div');
    babbleImgUrl.classList.add('babble-img');

    const babbleTitle = babbles[i].title;
    const babbleSubHeader = babbles[i].subHeader;
    const babbleTimestamp = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
    const babbleReadTime = babbles[i].readTime;

    babbleTitleDiv.innerHTML = babbleTitle;
    babbleSubHeaderDiv.innerHTML = babbleSubHeader;
    babbleTimestampDiv.innerHTML = babbleTimestamp;
    readTimeDiv.innerHTML = `${babbleReadTime} minutes`;
    babbleImgUrl.setAttribute('src', babbles[i].url);

    babbleLeftDiv.append(babbleTitleDiv);
    babbleLeftDiv.append(babbleSubHeaderDiv);
    babbleLeftDiv.append(babbleTimestampDiv);
    babbleLeftDiv.append(readTimeDiv)

    babbleImgDiv.append(babbleImgUrl);

    babbleRightDiv.append(babbleImgDiv);

    babbleDiv.append(babbleLeftDiv)
    babbleDiv.append(babbleRightDiv);

    profileContainer.append(babbleDiv)

    }

} catch(err) {
    console.error(err)
}
});