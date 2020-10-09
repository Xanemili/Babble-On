const searchVal = document.querySelector('.search__bar')
const searchbtn = document.querySelector('.nav__search');
searchbtn.addEventListener('click', async () => {
  try {
    const searchObj = searchVal.value;

    const res = await fetch(`/api/babbles/search/${searchObj}`);
    const search = await res.json();
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

const insertComments = async (container, comment) => {
  let newComment = document.createElement('div')
  let user = document.createElement('div')
  let text = document.createElement('div')
  let commentClasses = [`comment-${comment.id}`, 'comment']
  newComment.classList.add(...commentClasses)
  user.classList.add('comment-username')
  text.classList.add('comment-text')
  user.innerHTML = comment.User.userName;
  text.innerHTML = comment.comment;
  newComment.appendChild(user);
  newComment.appendChild(text);
  container.prepend(newComment);
}

window.addEventListener("DOMContentLoaded", async () => {

  try {
    const res = await fetch(`/api${window.location.pathname}`);
    const babble = await res.json()
    document.querySelector('#babble-header').innerHTML = babble.title;
    document.querySelector('#babble-subheader').innerHTML = babble.subHeader;
    document.querySelector('#babble-user-fullname').setAttribute('href', `/users/${babble.userID}/profile`);
    document.querySelector('#babble-user-fullname').innerHTML = `${babble.User.firstName} ${babble.User.lastName}`
    document.querySelector('#babble-date').innerHTML = `insert date here!`;
    document.querySelector('#babble-read-time').innerHTML = `${babble.readTime} minute read`;
    document.querySelector('#babble-topic').innerHTML = `${babble.Topic.name}`;
    if (babble.userID == localStorage.getItem('babble_user_id')) {
      let editButton = document.createElement('button');
      editButton.classList.add('.edit-babble__button');
      editButton.innerHTML = 'Edit Button'
      document.querySelector('.babble-info').prepend(editButton)

      editButton.addEventListener('click', (event) => {
        window.location.href = `${window.location.pathname}/edit`
      })
      }
    const babbleImage = document.querySelector('#babble-image');
    if (babble.url) {
      babbleImage.classList.remove('hidden')
      babbleImage.setAttribute('src', `${babble.url}`);
    }

        const resComm = await fetch(`/api${window.location.pathname}/comments`);
        const comments = await resComm.json()

        const commentContainer = document.querySelector('.babble-old-comments')
        for (comment of comments) {
          insertComments(commentContainer, comment);
        }

    document.querySelector('.babble-content').innerHTML = babble.content;

    document.querySelector('#comment-add').addEventListener('click', () => {
      document.querySelector('.babble-new-comment-div').classList.remove('hidden')
    })


  } catch (err) {
    if (err.status >= 400 && err.status < 600) {
      const errorJSON = await err.json();
      const errorsContainer = document.querySelector('.errors-container');
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

document.querySelector('.babble-new-comment')
  .addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(document.querySelector('.babble-new-comment'));
    const username = 'xanxan';
    const commentText = formData.get('newComment');

    const body = {
      username,
      commentText
    }
    try {

      const res = await fetch(`/api${window.location.pathname}/comments`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          Authorization: `Bearer ${localStorage.getItem('babble_access_token')}`,
          'Content-Type': 'application/json'
        }
      });
      if (!res.ok) {
        throw res;
      };

      comment = await res.json()
      insertComments(document.querySelector('.babble-old-comments'), comment)
    } catch (err) {
      if (err.status >= 400 && err.status < 600) {
        const errorJSON = await err.json();
        const errorsContainer = document.querySelector('.babble-comments-errors-container');
        let errorsHtml = [
          `
        <div class="error-alert">
            Something went wrong. Please try again.
        </div>
        `,
        ];

        if (err.status === 401) {
          errorsContainer.innerHTML = 'You must log in to leave a comment'
        } else {

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
        }
      } else {
        alert("Something went wrong. Please check your internet connection and try again!")
      }
    }
  });

document.querySelector('#comment-cancel')
  .addEventListener('click', (event) => {
    document.querySelector('#new-comment__textarea').value = '';
    document.querySelector('.babble-new-comment-div').classList.add('hidden');
  })
