window.addEventListener('DOMContentLoaded', async(e) => {
  try {
    const userId = localStorage.getItem('babble_user_id');

    const res = await fetch(`/api/users/${userId}/edit`)

    const { user } = await res.json();

    console.log(user)

    const firstNameInput = document.querySelector('.firstName-input')
    const lastNameInput = document.querySelector('.lastName-input')
    const emailInput = document.querySelector('.email-input')
    const bioInput = document.querySelector('.bio-input')
    const firstNameLabel = document.querySelector('.firstName-label')
    const lastNameLabel = document.querySelector('.lastName-label')
    const emailLabel = document.querySelector('.email-label')
    const bioLabel = document.querySelector('.bio-label')


    bioInput.value = user.biography
    firstNameInput.setAttribute('value', user.firstName)
    lastNameInput.setAttribute('value', user.lastName)
    emailInput.setAttribute('value', user.email)

    bioLabel.innerHTML = "biography"
    firstNameLabel.innerHTML = "first name"
    lastNameLabel.innerHTML = "last name"
    emailLabel.innerHTML = "e-mail"


  } catch (e) {
    console.log(e)
  }


})
