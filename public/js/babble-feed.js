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

    const babbles = await res1.json();
    const users = await res2.json();


    //Don't forget to include the date!!
    function mainBableInfo() {
      const mainBabbleImgDiv = document.querySelector('.main-babble-img-div')
      const mainBabbleImg = document.createElement('img')
      mainBabbleImg.classList.add('main-babble-img')
      mainBabbleImg.setAttribute('src', `${babbles[0].url}`)
      mainBabbleImgDiv.append(mainBabbleImg)

      const mainBabbleTitle = document.createElement('div')
      mainBabbleTitle.classList.add('babble-title');
      mainBabbleTitle.innerHTML = babbles[0].title

      const mainBabbleSubHeader = document.createElement('div')
      mainBabbleSubHeader.classList.add('babble-subHeader')
      mainBabbleSubHeader.innerHTML = babbles[0].subHeader

      const mainBabbleAuthor = document.createElement('div')
      mainBabbleAuthor.classList.add('babble-author')
      mainBabbleAuthor.innerHTML = `By: ${babbles[0].User.firstName} ${babbles[0].User.lastName}`

      const mainBabbleReadTime = document.createElement('div')
      mainBabbleReadTime.classList.add('main-babble-read-time')
      mainBabbleReadTime.innerHTML = `${babbles[0].readTime} min read`

      const mainBabbleInfo = document.querySelector('.main-babble-info');

      mainBabbleInfo.append(mainBabbleTitle)
      mainBabbleInfo.append(mainBabbleSubHeader)
      mainBabbleInfo.append(mainBabbleAuthor)
      mainBabbleInfo.append(mainBabbleReadTime)
<<<<<<< HEAD
    }

    function sideBabbleInfo() {
      for (i = 1; i < 5; i++) {
        const sideBabbleImg = document.createElement('img')
        sideBabbleImg.setAttribute('src', `${babbles[i].url}`)
        sideBabbleImg.classList.add('side-babble-img')
        const sideBabbleImgDiv = document.createElement('div')
        sideBabbleImgDiv.classList.add('side-babble-img-div')

        const sideBabbleTitle = document.createElement('div')
        sideBabbleTitle.classList.add('side-babble-title');
        sideBabbleTitle.innerHTML = babbles[i].title

        const sideBabbleSubHeader = document.createElement('div')
        sideBabbleSubHeader.classList.add('side-babble-subHeader')
        sideBabbleSubHeader.innerHTML = babbles[i].subHeader

        const sideBabbleAuthor = document.createElement('div')
        sideBabbleAuthor.classList.add('side-babble-author')
        sideBabbleAuthor.innerHTML = `By: ${babbles[i].User.firstName} ${babbles[0].User.lastName}`

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

    function userFollowInfo() {
      for (i = 1; i < 6; i++) {
=======
    }

    function sideBabbleInfo() {
      for (i = 1; i < 5; i++) {
        const sideBabbleImg = document.createElement('img')
        sideBabbleImg.setAttribute('src', `${babbles[i].url}`)
        sideBabbleImg.classList.add('side-babble-img')
        const sideBabbleImgDiv = document.createElement('div')
        sideBabbleImgDiv.classList.add('side-babble-img-div')

        const sideBabbleTitle = document.createElement('div')
        sideBabbleTitle.classList.add('side-babble-title');
        sideBabbleTitle.innerHTML = babbles[i].title

        const sideBabbleSubHeader = document.createElement('div')
        sideBabbleSubHeader.classList.add('side-babble-subHeader')
        sideBabbleSubHeader.innerHTML = babbles[i].subHeader

        const sideBabbleAuthor = document.createElement('div')
        sideBabbleAuthor.classList.add('side-babble-author')
        sideBabbleAuthor.innerHTML = `By: ${babbles[i].User.firstName} ${babbles[0].User.lastName}`

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

    function userFollowInfo() {
      for (i = 0; i < 5; i++) {
>>>>>>> 99dc494ab3ec8c34d0c2b5bbad51caf69eb4c63a
        const followUserDiv = document.querySelector(`.follow-user-${i}`)

        const followUserImgDiv = document.createElement('div')
        followUserImgDiv.classList.add('follow-user-img-div')

<<<<<<< HEAD
        const followUserImg = document.createElement('img');
        followUserImg.classList.add('follow-user-img')
        followUserImg.setAttribute('src', 'https://placeimg.com/640/480/people')

=======
>>>>>>> 99dc494ab3ec8c34d0c2b5bbad51caf69eb4c63a
        const followUserInfoDiv = document.createElement('div')
        followUserInfoDiv.classList.add('follow-user-info-div')

        const followUserName = document.createElement('div')
        followUserName.classList.add('follow-user-name')
        followUserName.innerHTML = users[i].userName

        const followUserFullName = document.createElement('div')
        followUserFullName.classList.add('follow-user-full-name');
        followUserFullName.innerHTML = `${users[i].firstName} ${users[i].lastName}`

        const userFollowBtn = document.createElement('button');
<<<<<<< HEAD
        userFollowBtn.classList.add(`follow-user-btn-${i}`);
        userFollowBtn.innerHTML = 'Follow'

        followUserImgDiv.append(followUserImg)
        followUserInfoDiv.append(followUserName)
        followUserInfoDiv.append(followUserFullName);
        followUserInfoDiv.append(userFollowBtn)

        followUserDiv.append(followUserImgDiv)
=======
        userFollowBtn.classList.add('user-follow-button');

        followUserInfoDiv.append(followUserName)
        followUserInfoDiv.append(followUserFullName);
>>>>>>> 99dc494ab3ec8c34d0c2b5bbad51caf69eb4c63a
        followUserDiv.append(followUserInfoDiv)


      }
    }

    mainBableInfo();
    sideBabbleInfo();
    userFollowInfo();

  } catch (err) {
    console.error(err);
  }
});
