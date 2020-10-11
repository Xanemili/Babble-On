window.addEventListener('DOMContentLoaded', () => {

  document.querySelector('#nav-bar__sign-out').addEventListener('click', event => {
    event.preventDefault()
    localStorage.removeItem('babble_access_token')
    localStorage.removeItem('babble_user_id');

    window.location.href = '/log-in';
  })
  let id = localStorage.getItem('babble_user_id');
  if (id) {
    document.querySelector('#babble-on-text').setAttribute('href', '/babbles')
    document.querySelector('#babble-on-my-profile').setAttribute('href', `/users/${id}/profile`)
    document.querySelector('#babble-on-edit-profile').setAttribute('href', `/users/${id}/profile/edit`)
  }
const searchbtn = document.querySelector('.nav__search');
searchbtn.addEventListener('click', async () => {
  const searchVal = document.querySelector('.search__bar').value
  window.location.href = `/babbles/search/${searchVal}`
})

})
