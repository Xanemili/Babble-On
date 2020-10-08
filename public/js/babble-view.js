const insertComments = async (id, container) => {
  const res = await fetch(`/api/babbles/${id}/comments`);

  const comments = await res.json()
  for (index of comments) {
    let newComment = document.createElement('div')
    let user = document.createElement('div')
    let text = document.createElement('div')


    let commentClasses = [`comment-${index.id}`, 'comment']

    newComment.classList.add(...commentClasses)
    user.classList.add('comment-username')
    text.classList.add('comment-text')


    user.innerHTML = index.User.userName;
    text.innerHTML = index.comment;

    newComment.appendChild(user);
    newComment.appendChild(text);
    container.appendChild(newComment);
  }

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
    document.querySelector('#babble-read-time').innerHTML = `${babble.readTime}`;
    document.querySelector('#babble-topic').innerHTML = `${babble.topicID}`;

    const babbleImage = document.querySelector('#babble-image');
    babbleImage.setAttribute('src', `${babble.url}`);

    document.querySelector('.babble-content').innerHTML = babble.content;

    const commentContainer = document.querySelector('.babble-comments')

    insertComments(babble.id, commentContainer);

    document.querySelector('.comments-button').addEventListener('click', (event) => {
      document.querySelector('.babble-new-comment').classList.remove('hidden');


      // let newComment = document.createElement('div')
      // let input = document.createElement('input')
      // let addComment = document.createElement('button')
      // newComment.innerHTML = 'new comment'
      // newComment.appendChild(input)
      // commentContainer.prepend(newComment)
    })

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
  });

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
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjo1LCJlbWFpbCI6InhhbkBnbWFpbC5jb20ifSwiaWF0IjoxNjAyMDE4MzM2LCJleHAiOjE2MDI2MjMxMzZ9.2Ao4CiNzFMCYktacNFnsiQUVar_2NWOoKgmSWqa6Qt4',
                'Content-Type': 'application/json'
              }
            });
            if (!res.ok) {
              throw res;
            }

            //update comments with ajax
          } catch (err) {

          }
})
