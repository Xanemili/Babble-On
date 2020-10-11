window.addEventListener('DOMContentLoaded', async (e) => {

  try {
    const userId = localStorage.getItem('babble_user_id');
    const path = window.location.pathname
    console.log(path)
    const res = await fetch(`/api${path}`, {
      headers: {
        Authorizations: `Bearer ${localStorage.getItem('babble_accerss_token')}`
      }
    })

    const following = await res.json();

    console.log("they are following", following)

    const followingsContainer = document.querySelector('.follow-list-div')
    followingsContainer.setAttribute('id', "followers-list")
    for (let follow of following) {
      const id = follow.followerUserID
      console.log(id)
      let followDiv = document.createElement('div');
      followDiv.setAttribute('class', 'follow-div')
      let followNameAnchor = document.createElement('a')
      let followPicAnchor = document.createElement('a')
      const name = `${follow.Followed.firstName} ${follow.Followed.lastName}`
      console.log(name)
      // const name = "Do I see anything?"
      let profilePic = document.createElement('img')
      profilePic.setAttribute('class', "mini-profile-pic")
      profilePic.setAttribute('src', follow.Followed.profilePicture)
      followNameAnchor.setAttribute('href', `/users/${follow.userID}/profile`);
      followNameAnchor.setAttribute('class', `name-anchor`);
      followPicAnchor.setAttribute('href', `/users/${follow.userID}/profile`)
      console.log("follow user id  ", follow.userID)
      followNameAnchor.innerHTML = name
      followDiv.append(profilePic)
      followDiv.append(followNameAnchor)
      followingsContainer.append(followDiv)
    }

  } catch (e) {

  }
})
