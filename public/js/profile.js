window.addEventListener('DOMContentLoaded', async (e) => {



    try {
        const userId = localStorage.getItem('babble_user_id');

        const res1 = await fetch(`/api${window.location.pathname}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('babble_access_token')}`,
            },
        });

        const res2 = await fetch(`/api${window.location.pathname}/babbles`, {});

        const res3 = await fetch(`/api/users/${userId}/following`, {
            headers: {
                Authorizations: `Bearer ${localStorage.getItem('babble_accerss_token')}`
            }
        })
        const res4 = await fetch(`/api/users/${userId}/followers`, {
            headers: {
                Authorizations: `Bearer ${localStorage.getItem('babble_accerss_token')}`
            }
        })
        console.log('location', window.location.pathname)
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
        if (user.profilePicture) {
            let profilePic = document.createElement('img');
            profilePic.setAttribute('src', `${user.profilePicture}`)
            document.querySelector('.profile-pic-div').appendChild(profilePic)
        } else {
            document.querySelector('#profile-picture').setAttribute('src', `https://images.medicaldaily.com/sites/medicaldaily.com/files/2014/06/10/journal-writing.jpg`)
        }
        document.querySelector('.followers-count-div').innerHTML = `${follower.length} followers  `
        document.querySelector('.following-count-div').innerHTML = `  ${following.length} following`


        const profileContainer = document.querySelector('.main-container')
        const followersContainer = document.querySelector('.follow-list-div')
        followersContainer.setAttribute('id', "followers-list")
        for (let follow of following) {
            const id = follow.followerUserID

            let followDiv = document.createElement('div');
            followDiv.setAttribute('class', 'follow-div')
            let followNameAnchor = document.createElement('a')
            let followPicAnchor = document.createElement('a')
            const name = `${follow.Followed.firstName} ${follow.Followed.lastName}`
            let profilePic = document.createElement('img')
            profilePic.setAttribute('class', "mini-profile-pic")
            profilePic.setAttribute('src', follow.Followed.profilePicture)
            followNameAnchor.setAttribute('href', `/users/${follow.followerUserID}`);
            followNameAnchor.setAttribute('class', `name-anchor`);
            followPicAnchor.setAttribute('href', `/users/${follow.followerUserID}`)
            followNameAnchor.innerHTML = name
            followDiv.append(profilePic)
            followDiv.append(followNameAnchor)
            followersContainer.append(followDiv)
        }


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
