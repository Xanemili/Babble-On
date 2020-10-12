const searchVal = document.querySelector('.search__bar')
const searchbtn = document.querySelector('.nav__search');
searchbtn.addEventListener('click', async () => {
  try {
    const searchObj = searchVal.value;

    const res = await fetch(`/api/babbles/search/${searchObj}`);
    const search = await res.json();
  } catch (err) {
    if (err.status >= 400 && err.status < 600) {
      const errorJSON = await err.json();
      const errorsContainer = document.querySelector('.errors-container');
      logo.setAttribute("class", "logo-left")
      instructions.innerHTML = 'There seems to be some issues, please refer to the instructions above'
      let errorsHtml = [
        `
                <div class="error-alert">
                    Something went wrong. Please try again.
                </div>
              `,
      ];

      const {
        errors
      } = errorJSON;
      if (errors && Array.isArray(errors)) {
        errorsHtml = errors.map(
          (message) => `
                    <div class "error-alert">
                        ${message}
                    </div> `
        );
      }
      errorsContainer.innerHTML = errorsHtml.join("");
    } else {
      alert("Something went wrong. Please check your internet connection and try again!")
    }
  }
})




window.addEventListener('DOMContentLoaded', async (e) => {
  try {
    const res1 = await fetch('/api/babbles');
    const res2 = await fetch('/api/users');
    const res3 = await fetch(`/api/users/${localStorage.getItem('babble_user_id')}/following`);

    const babbles = await res1.json();
    const users = await res2.json();
    const following = await res3.json();

    //Don't forget to include the date!!
    function mainBableInfo() {
      const mainBabbleImgDiv = document.querySelector('.main-babble-img-div')
      mainBabbleImgDiv.classList.add('a-tag')
      mainBabbleImgDiv.setAttribute('href', `/babbles/${babbles[0].id}`)
      const mainBabbleImg = document.createElement('img')
      mainBabbleImg.classList.add('main-babble-img')
      mainBabbleImg.setAttribute('src', `${babbles[0].url}`)
      mainBabbleImgDiv.append(mainBabbleImg)

      const mainBabbleTitle = document.createElement('a')
      mainBabbleTitle.classList.add('main-babble-title', 'a-tag');
      mainBabbleTitle.innerHTML = babbles[0].title
      mainBabbleTitle.setAttribute('href', `/babbles/${babbles[0].id}`)

      const mainBabbleSubHeader = document.createElement('div')
      mainBabbleSubHeader.classList.add('babble-subHeader')
      mainBabbleSubHeader.innerHTML = babbles[0].subHeader

      const mainBabbleAuthor = document.createElement('a')
      mainBabbleAuthor.classList.add('babble-author', 'a-tag')
      mainBabbleAuthor.innerHTML = `By: ${babbles[0].User.firstName} ${babbles[0].User.lastName}`
      mainBabbleAuthor.setAttribute('href', `/users/${babbles[0].userID}/profile`)

      const mainBabbleReadTime = document.createElement('div')
      mainBabbleReadTime.classList.add('main-babble-read-time')
      mainBabbleReadTime.innerHTML = `${babbles[0].readTime} min read`

      const mainBabbleInfo = document.querySelector('.main-babble-info');

      mainBabbleInfo.append(mainBabbleTitle)
      mainBabbleInfo.append(mainBabbleSubHeader)
      mainBabbleInfo.append(mainBabbleAuthor)
      mainBabbleInfo.append(mainBabbleReadTime)
    }

    function sideBabbleInfo() {
      for (i = 1; i < 5; i++) {
        const sideBabbleImg = document.createElement('img')
        sideBabbleImg.setAttribute('src', `${babbles[i].url}`)
        sideBabbleImg.classList.add('side-babble-img')
        const sideBabbleImgDiv = document.createElement('a')
        sideBabbleImgDiv.classList.add('side-babble-img-div', 'a-tag')
        sideBabbleImgDiv.setAttribute('href', `/babbles/${babbles[i].id}`)

        const sideBabbleTitle = document.createElement('a')
        sideBabbleTitle.classList.add('side-babble-title', 'a-tag');
        sideBabbleTitle.innerHTML = babbles[i].title
        sideBabbleTitle.setAttribute('href', `/babbles/${babbles[i].id}`)

        const sideBabbleSubHeader = document.createElement('div')
        sideBabbleSubHeader.classList.add('side-babble-subHeader')
        sideBabbleSubHeader.innerHTML = babbles[i].subHeader

        const sideBabbleAuthor = document.createElement('a')
        sideBabbleAuthor.classList.add('side-babble-author', 'a-tag')
        sideBabbleAuthor.innerHTML = `By: ${babbles[i].User.firstName} ${babbles[i].User.lastName}`
        sideBabbleAuthor.setAttribute('href', `/users/${babbles[i].userID}/profile`)

        const sideBabbleReadTime = document.createElement('div')
        sideBabbleReadTime.classList.add('side-babble-read-time')
        sideBabbleReadTime.innerHTML = `${babbles[i].readTime} min read`

        const sideBabbleInfo = document.createElement('div')
        sideBabbleInfo.classList.add('side-babble-info');
        const sideBabble = document.querySelector(`.side-babble-${i}`)

        sideBabbleInfo.append(sideBabbleTitle)
        sideBabbleInfo.append(sideBabbleSubHeader)
        sideBabbleInfo.append(sideBabbleAuthor)
        sideBabbleInfo.append(sideBabbleReadTime)
        sideBabbleImgDiv.append(sideBabbleImg)
        sideBabble.append(sideBabbleImgDiv)
        sideBabble.append(sideBabbleInfo)
      }
    }

    async function userFollowInfo() {
      for (i = 1; i < 6; i++) {
        const followUserDiv = document.querySelector(`.follow-user-${i}`)

        const followUserImgDiv = document.createElement('a')
        followUserImgDiv.classList.add('follow-user-img-div', 'a-tag')
        followUserImgDiv.setAttribute('href', `/babbles/${babbles[i].id}`)

        const followUserImg = document.createElement('img');
        followUserImg.classList.add('follow-user-img')

        if (users[i].profilePicture){
          followUserImg.setAttribute('src', `${users[i].profilePicture}`)
        }

        const followUserInfoDiv = document.createElement('div')
        followUserInfoDiv.classList.add('follow-user-info-div')

        const followUserName = document.createElement('a')
        followUserName.classList.add('follow-user-name', 'a-tag')
        followUserName.innerHTML = users[i].userName
        followUserName.setAttribute('href', `/users/${babbles[i].userID}/profile`)

        const followUserFullName = document.createElement('div')
        followUserFullName.classList.add('follow-user-full-name');
        followUserFullName.innerHTML = `${users[i].firstName} ${users[i].lastName}`


        const userFollowBtn = document.createElement('button');
        userFollowBtn.classList.add(...[`follow-user-btn-${i}`, `follow-button`]);

        userFollowBtn.innerHTML = "follow"
        for (let follow of following) {
          if (parseInt(follow.followerUserID, 10) === parseInt(localStorage.getItem('babble_user_id'), 10) && parseInt(follow.userID, 10) === parseInt(users[i].id, 10)) {
            userFollowBtn.innerHTML = "unfollow"
          }
        }
        followUserImgDiv.append(followUserImg)
        followUserInfoDiv.append(followUserName)
        followUserInfoDiv.append(followUserFullName);
        followUserInfoDiv.append(userFollowBtn)
        followUserDiv.append(followUserImgDiv)
        followUserDiv.append(followUserInfoDiv)

        followButtonListener(userFollowBtn, users[i].id)
      }

    }

    function followButtonListener(followButton, userId) {
      followButton.addEventListener("click", async (e) => {
        if (followButton.innerHTML === "unfollow") {
          followButton.innerHTML = "follow"
        } else {
          followButton.innerHTML = "unfollow"
        }
        const body = {
          followerUserID: localStorage.getItem('babble_user_id'),
          userID: userId
        }
        // console.log(body)
        try {
          await fetch(`/api/users/${userId}/followers`, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
              Authorization: `Bearer ${localStorage.getItem('babble_access_token')}`,
              'Content-Type': 'application/json'
            }
          })
        } catch (e) {
          console.log(e)
        }
      })

    }




    function trendingBabbleInfo() {

      for (let i = 7; i < 13; i++) {
        const trendingBabble = document.querySelector(`.trending-babble-${i}`)

        const trendingBabbleUserInfoDiv = document.createElement('div')
        trendingBabbleUserInfoDiv.classList.add('trending-babble-user-info-div')

        const trendingBabbleUserInfo = document.createElement('a')
        trendingBabbleUserInfo.classList.add('trending-babble-user-info', 'a-tag')
        trendingBabbleUserInfo.innerHTML = `${babbles[i].User.firstName} ${babbles[i].User.lastName}`
        trendingBabbleUserInfo.setAttribute('href', `/users/${babbles[i].userID}/profile`)
        const trendingBabbleUserImg = document.createElement('img')
        if (babbles[i].User.profilePicture !== null) {
          trendingBabbleUserImg.classList.add('trending-babble-user-img');
          trendingBabbleUserImg.setAttribute('src', `${babbles[i].User.profilePicture}`)
        }

        const trendingBabbleInfoDiv = document.createElement('div')
        trendingBabbleInfoDiv.classList.add('trending-babble-info-div')

        const trendingBabbleInfo = document.createElement('div')
        trendingBabbleInfo.classList.add('trending-babble-info')

        const trendingBabbleTitle = document.createElement('a')
        trendingBabbleTitle.classList.add('trending-babble-title', 'a-tag')
        trendingBabbleTitle.innerHTML = babbles[i].title
        trendingBabbleTitle.setAttribute('href', `/babbles/${babbles[i].id}`)
        const trendingBabbleSubHeader = document.createElement('div')
        trendingBabbleSubHeader.classList.add('trending-babble-subHeader')
        trendingBabbleSubHeader.innerHTML = babbles[i].subHeader
        const trendingBabbleReadTime = document.createElement('div')
        trendingBabbleReadTime.classList.add('trending-babble-readTime')
        trendingBabbleReadTime.innerHTML = `${babbles[i].readTime} min read`

        const trendingUserInfoDiv = document.createElement('div');
        trendingUserInfoDiv.classList.add('trending-user-info-div')

        trendingBabbleUserInfoDiv.append(trendingBabbleUserInfo);

        if (babbles[i].User.profilePicture !== null) {
          trendingBabbleUserInfoDiv.append(trendingBabbleUserImg)
        }
        trendingBabbleInfo.append(trendingBabbleTitle)
        trendingBabbleInfo.append(trendingBabbleSubHeader)
        trendingBabbleInfo.append(trendingBabbleReadTime)

        trendingBabbleInfoDiv.append(trendingBabbleInfo)
        trendingBabble.append(trendingBabbleUserInfoDiv)
        trendingBabble.append(trendingBabbleInfoDiv)
      }
    }

    function babbleInfo() {
      for (let i = 13; i < 18; i++) {
        const babbleContainer = document.querySelector('.babbles-container')

        const babble = document.createElement('div');
        babble.classList.add(`babble-${i}`)
        const babbleInfoDiv = document.createElement('div')
        babbleInfoDiv.classList.add('babble-info-div');
        const babbleImgDiv = document.createElement('a')
        babbleImgDiv.classList.add('babble-img-div', 'a-tag');
        babbleImgDiv.setAttribute('href', `/babbles/${babbles[i].id}`)

        const babbleUserName = document.createElement('a')
        babbleUserName.classList.add('babble-user-name', 'a-tag')
        babbleUserName.innerHTML = babbles[i].User.userName
        babbleUserName.setAttribute('href', `/users/${babbles[i].userID}/profile`)
        const babbleAuthor = document.createElement('div')
        babbleAuthor.classList.add('babble-author')
        babbleAuthor.innerHTML = `${babbles[i].User.firstName} ${babbles[i].User.lastName}`
        const babbleProfilePic = document.createElement('img')
        babbleProfilePic.classList.add('babble-profile-pic')

        if (babbles[i].User.profilePicture){
          babbleProfilePic.setAttribute('src', `${babbles[i].User.profilePicture}`)
        }
        const babbleTitle = document.createElement('a', 'a-tag')
        babbleTitle.classList.add('babble-title')
        babbleTitle.innerHTML = babbles[i].title
        babbleTitle.setAttribute('href', `/babbles/${babbles[i].id}`)

        const babbleImg = document.createElement('img')
        babbleImg.classList.add('babble-img')
        babbleImg.setAttribute('src', `${babbles[i].url}`)

        babbleInfoDiv.append(babbleUserName)
        babbleInfoDiv.append(babbleAuthor)
        if (babbles[i].User.profilePicture !== null) {
          babbleInfoDiv.append(babbleProfilePic)
        }
        babbleInfoDiv.append(babbleTitle)
        babbleImgDiv.append(babbleImg)

        babble.append(babbleInfoDiv)
        babble.append(babbleImgDiv)
        babbleContainer.append(babble)

      }
    }


    await mainBableInfo();
    await sideBabbleInfo();
    await userFollowInfo();
    await trendingBabbleInfo();
    await babbleInfo();



  } catch (err) {
    console.error(err);
  }
});
