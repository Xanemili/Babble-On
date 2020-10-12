window.addEventListener('DOMContentLoaded', async () => {
  let pathName = window.location.pathname.split('/')
  let editCheck = pathName.pop()
  let path = pathName.join('/')
  if (editCheck === 'edit') {
  const deleteButton = document.querySelector('.delete-btn')

    try {
      const res = await fetch(`/api${path}`);
      const babble = await res.json();


      document.querySelector('.form-control__title').value = babble.title
      document.querySelector('.form-control__subHeader').value = babble.subHeader
      document.querySelector('#babble-form__textarea').value = babble.content
      document.querySelector('.form-control__url').value = babble.url
      document.querySelector('.form-control__readTime').value = babble.readTime
      document.querySelector('#topicID').value = babble.topicID

      deleteButton.classList.remove('hidden');

    } catch (e) {
      throw e;
    }
    try {

      deleteButton.addEventListener('click', async (e) => {
        e.preventDefault()
        let deleteResponse = await fetch(`/api${path}`, {
          method: 'DELETE',
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('babble_access_token')}`
          }
        });

        window.location.href= `/users/${localStorage.getItem('babble_user_id')}/profile`
      })
    } catch (err) {
      throw err;
    }
}
})

const createBabbleForm = document.querySelector(".create-babble-form")

createBabbleForm.addEventListener('submit', async (e) => {
  e.preventDefault()
  const formData = new FormData(createBabbleForm)

  const title = formData.get("title")
  const subHeader = formData.get("subHeader");
  const readTime = formData.get("readTime");
  const content = formData.get("content");
  const topicID = formData.get("topicID");
  const url = formData.get("url");
  const userID = localStorage.getItem('babble_user_id')


  const body = {
    title,
    subHeader,
    readTime,
    content,
    topicID,
    url,
    userID,
  }

  let methodType = 'POST'
  let apiUrl = "/api/babbles"

  let path = window.location.pathname.split('/')
  let editCheck = path.pop()

  if (editCheck === 'edit') {
    methodType = 'PUT'
    apiUrl = `/api${path.join('/')}`
  }

  try {
    const res = await fetch(apiUrl, {

          method: methodType,
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('babble_access_token')}`
      },
    });

    if (res.status === 401) {
      window.location.href = "/log-in";
    }

    if (!res.ok) {
      throw res;
    }
    const createRes = await res.json()

    console.log(createRes)
    window.location.href = `/babbles/${createRes.id}`;

  } catch (err) {
    if (err.status >= 400 && err.status < 600) {
      const errorJSON = await err.json();
      const errorsContainer = document.querySelector('.errors-container');
      let errorsHtml = [
        `
          <div class="alert alert-danger">
            Something went wrong. Please try again.
          </div>
          `
        ,
      ];

      const { errors } = errorJSON;
      if (errors && Array.isArray(errors)) {
        errorsHtml = errors.map(
          (message) => `<div class="alert alert-danger">${message}</div>`
        )
      }
      errorsContainer.innerHTML = errorsHtml.join("");
    } else {
      alert(
        "Something went wrong. Please check your internet connection and try again!"
      );
    }
  }
});
