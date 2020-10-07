window.addEventListener("DOMContentLoaded", async () => {

  try {
    const res = await fetch(`/../api/babbles/3`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjo1LCJlbWFpbCI6InhhbkBnbWFpbC5jb20ifSwiaWF0IjoxNjAyMDE4MzM2LCJleHAiOjE2MDI2MjMxMzZ9.2Ao4CiNzFMCYktacNFnsiQUVar_2NWOoKgmSWqa6Qt4`
      }
    });

    const babble = await res.json()

    document.querySelector('#babble-header').innerHTML = babble.title;
    document.querySelector('#babble-subheader').innerHTML = babble.subHeader;
    document.querySelector('#babble-user').innerHTML = `${babble.User.userName}`
    document.querySelector('#babble-user-fullname').innerHTML = `${babble.User.firstName} ${babble.User.lastName}`
    document.querySelector('#babble-date').innerHTML = `insert date here!`;
    document.querySelector('#babble-read-time').innerHTML = `${babble.readTime}`;
    document.querySelector('#babble-topic').innerHTML = `${babble.topicID}`;

    const babbleImage = document.querySelector('#babble-image');
    babbleImage.setAttribute('src', `${babble.url}`);

    document.querySelector('.babble-content').innerHTML = babble.content;


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
