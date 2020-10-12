window.addEventListener('DOMContentLoaded', async (e) => {

    try {
        const userId = parseInt(localStorage.getItem('babble_user_id'), 10);

        const res1 = await fetch(`/api${window.location.pathname}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('babble_access_token')}`,
            },
        });

        const res2 = await fetch(`/api${window.location.pathname}/babbles`, {});

        let path = window.location.pathname
        path = path.split('/')
        path.pop();
        path = path.join('/')

        const res3 = await fetch(`/api${path}/following`, {
            headers: {
                Authorizations: `Bearer ${localStorage.getItem('babble_accerss_token')}`
            }
        })
        const res4 = await fetch(`/api${path}/followers`, {
            headers: {
                Authorizations: `Bearer ${localStorage.getItem('babble_accerss_token')}`
            }
        })
        const {
            user
        } = await res1.json();
        const {
            babbles
        } = await res2.json();
        const following = await res3.json();
        const follower = await res4.json();

        document.querySelector('.username-div').innerHTML = user.userName
        document.querySelector('.user-name-div').innerHTML = `${user.firstName} ${user.lastName}`
        document.querySelector('.user-email-div').innerHTML = user.email
        document.querySelector('.bio-div').innerHTML = user.biography
        let profilePic = document.createElement('img');
        document.querySelector(".profile-pic-div").append(profilePic)
        if (!user.profilePicture) {
            profilePic.setAttribute('src', 'https://hancroft.co.nz/wp-content/uploads/2019/05/profile-placeholder.png')
        } else {
            profilePic.setAttribute('src', `${user.profilePicture}`)
        }
        document.querySelector(".followers-count-a").setAttribute('href', `${path}/followers`)
        document.querySelector(".following-count-a").setAttribute('href', `${path}/following`)
        document.querySelector(".followers-count-a").innerHTML = `${follower.length} followers  `
        document.querySelector(".following-count-a").innerHTML = `  ${following.length} following`

        let followButton = document.querySelector('.follow-button');
        let userID = window.location.pathname;
        userID = userID.split('/')
        userID = parseInt(userID[userID.length - 2], 10);
        if (userID === userId) {
            followButton.setAttribute('hidden', 'true')
        }
        followButton.innerHTML = "follow"
        for (let follow of follower) {
            if(follow.userID === userID && follow.followerUserID === userId) {
                followButton.innerHTML = "unfollow"
            }
        }

        followButton.addEventListener("click", async (e) => {
            if (followButton.innerHTML === "unfollow") {
                followButton.innerHTML = "follow"
            } else {
                followButton.innerHTML = "unfollow"
            }
            const body = {
                followerUserID: userId,
                userID: userID
            }
            try {
                await fetch(`/api${path}/followers`, {
                    method: "POST",
                    body: JSON.stringify(body),
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('babble_access_token')}`,
                        'Content-Type': 'application/json'
                    }
                })
                const res = await fetch(`/api${path}/followers`, {
                    headers: {
                        Authorizations: `Bearer ${localStorage.getItem('babble_accerss_token')}`
                    }
                })
                const follower = await res.json();
                console.log(follower.length)
                document.querySelector('.following-count-div').innerHTML = `  ${follower.length} following`
            } catch (e) {
                console.log(e)
            }

        })

        const profileContainer = document.querySelector('.main-container')

        for (let i = 0; i < babbles.length; i++) {
            const date = new Date(Date.parse(babbles[i].updatedAt))
            const babbleDiv = document.createElement('div');
            const babbleLeftDiv = document.createElement('div');
            const babbleRightDiv = document.createElement('div');
            const babbleTitleDiv = document.createElement('div');
            const babbleSubHeaderDiv = document.createElement('div');
            const babbleTimestampDiv = document.createElement('div');
            const readTimeDiv = document.createElement('div');

            const babbleAnchor = document.createElement('a');
            const babbleImgUrl = document.createElement('img');
            const babbleImgDiv = document.createElement('div');

            babbleAnchor.classList.add('babble-anchor')
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
            babbleTimestampDiv.innerHTML = `Created on ${babbleTimestamp}`;
            readTimeDiv.innerHTML = `Reading time: ${babbleReadTime} minutes`;
            babbleImgUrl.setAttribute('src', babbles[i].url);
            babbleAnchor.setAttribute('href', `/babbles/${babbles[i].id}`)


            babbleAnchor.append(babbleImgUrl)
            babbleImgDiv.append(babbleAnchor);

            babbleRightDiv.append(babbleImgDiv);

            babbleLeftDiv.append(babbleTitleDiv);
            babbleLeftDiv.append(babbleSubHeaderDiv);
            babbleLeftDiv.append(babbleTimestampDiv);
            babbleLeftDiv.append(readTimeDiv)

            babbleDiv.append(babbleLeftDiv)
            babbleDiv.append(babbleRightDiv);

            profileContainer.append(babbleDiv)

        }

    } catch (err) {
        console.error(err)
    }

});
