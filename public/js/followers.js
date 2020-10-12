window.addEventListener('DOMContentLoaded', async (e) => {

  try {
    const userId = localStorage.getItem('babble_user_id');
    const path = window.location.pathname
    const res2 = await fetch(`/api${path}`, {
      headers: {
        Authorizations: `Bearer ${localStorage.getItem('babble_accerss_token')}`
      }
    })

    const follower = await res2.json();
    const followersContainer = document.querySelector('.follow-list-div')
    followersContainer.setAttribute('id', "followers-list")
    for (let follow of follower) {
      const id = follow.followerUserID
      let followDiv = document.createElement('div');
      followDiv.setAttribute('class', 'follow-div')
      let followNameAnchor = document.createElement('a')
      let followPicAnchor = document.createElement('a')
      const name = `${follow.Following.firstName} ${follow.Following.lastName}`
      let profilePic = document.createElement('img')
      profilePic.setAttribute('class', "mini-profile-pic")
      if (!follow.Following.profilePicture) {
        profilePic.setAttribute('src', 'https://hancroft.co.nz/wp-content/uploads/2019/05/profile-placeholder.png')
    } else {
        profilePic.setAttribute('src', follow.Following.profilePicture)
    }
      followNameAnchor.setAttribute('href', `/users/${follow.followerUserID}/profile`);
      followNameAnchor.setAttribute('class', `name-anchor`);
      followPicAnchor.setAttribute('href', `/users/${follow.followerUserID}/profile`)
      followNameAnchor.innerHTML = name
      followDiv.append(profilePic)
      followDiv.append(followNameAnchor)
      followersContainer.append(followDiv)
    }

  } catch (e) {

  }
})
