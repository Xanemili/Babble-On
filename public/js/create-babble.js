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
    userID
  }
  console.log(localStorage.getItem('babble_access_token'));
  console.log(body);

  try {
    const res = await fetch("api/babbles", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('babble_access_token')}`
      },
    });

    if (res.status === 401) {
      console.log("here")
      window.location.href = "/log-in";
    }

    if (!res.ok) {
      throw res;
    }

    window.location.href = '/';

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
