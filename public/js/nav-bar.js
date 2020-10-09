window.addEventListener('DOMContentLoaded', () => {

  document.querySelector('#nav-bar__sign-out').addEventListener('click', event => {
    event.preventDefault()
    localStorage.removeItem('babble_access_token')
    localStorage.removeItem('babble_user_id');

    window.location.href = '/log-in';
  })
if (localStorage.getItem('babble_access_token')) {
  document.querySelector('#babble-on-text').setAttribute('href', '/feed')
}
})
