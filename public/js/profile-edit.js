window.addEventListener('DOMContentLoaded', async(e) => {
  try {
    const userId = localStorage.getItem('babble_user_id');

    const res = await fetch(`/api/users/${userId}/edit`)

    const { user } = await res.json();

    console.log(user)

    document.querySelector('.user-firstName-div').innerHTML = `${user.firstName} ${user.lastName}`
    document.querySelector('.user-lastName-div').innerHTML = `${user.firstName} ${user.lastName}`
    document.querySelector('.user-email-div').innerHTML = user.email
    document.querySelector('.bio-div').innerHTML = user.biography
    const profileContainer = document.querySelector('.main-container')

  } catch (e) {
    console.log(e)
  }


})
