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
    const followingsContainer = document.querySelector('.follow-list-div')
    followingsContainer.setAttribute('id', "followers-list")
    for (let follow of following) {
      const id = follow.followerUserID
      let followDiv = document.createElement('div');
      followDiv.setAttribute('class', 'follow-div')
      let followNameAnchor = document.createElement('a')
      let followPicAnchor = document.createElement('a')
      const name = `${follow.Followed.firstName} ${follow.Followed.lastName}`
      let profilePic = document.createElement('img')
      profilePic.setAttribute('class', "mini-profile-pic")
      if (!follow.Followed.profilePicture) {
        profilePic.setAttribute('src', 'https://hancroft.co.nz/wp-content/uploads/2019/05/profile-placeholder.png')
      } else {
        profilePic.setAttribute('src', follow.Followed.profilePicture)
      }
      followNameAnchor.setAttribute('href', `/users/${follow.userID}/profile`);
      followNameAnchor.setAttribute('class', `name-anchor`);
      followPicAnchor.setAttribute('href', `/users/${follow.userID}/profile`)
      followNameAnchor.innerHTML = name
      followDiv.append(profilePic)
      followDiv.append(followNameAnchor)
      followingsContainer.append(followDiv)
    }

  } catch (e) {

  }
})
