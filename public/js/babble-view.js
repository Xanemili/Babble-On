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
    document.querySelector('#babble-user').innerHTML = `${babble.User.userName}`
    document.querySelector('#babble-user-fullname').innerHTML = `${babble.User.firstName} ${babble.User.lastName}`
    document.querySelector('#babble-date').innerHTML = `insert date here!`;
    document.querySelector('#babble-read-time').innerHTML = `${babble.readTime} minute read`;
    document.querySelector('#babble-topic').innerHTML = `${babble.Topic.name}`;

    console.log(babble)
    const babbleImage = document.querySelector('#babble-image');
    if (babble.url) {
      babbleImage.classList.remove('hidden')
      babbleImage.setAttribute('src', `${babble.url}`);
    }

    document.querySelector('.babble-content').innerHTML = babble.content;

    const commentContainer = document.querySelector('.babble-old-comments')

    const resComm = await fetch(`/api${window.location.pathname}/comments`);
    const comments = await resComm.json()

    for (comment of comments) {
      insertComments(commentContainer, comment);
    }
  } catch (err) {
    if (err.status >= 400 && err.status < 600) {
      const errorJSON = await err.json();
      const errorsContainer = document.querySelector('.errors-container');
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
});

document.querySelector('.comments-button').addEventListener('click', (event) => {
  document.querySelector('.babble-new-comment-div').classList.remove('hidden');
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
          }
          else {
            alert("Something went wrong. Please check your internet connection and try again!")
          }
    }
  });

  document.querySelector('#comment-cancel')
    .addEventListener('click', (event) => {
        document.querySelector('#new-comment__textarea').value = '';
        document.querySelector('.babble-new-comment-div').classList.add('hidden');
    })
