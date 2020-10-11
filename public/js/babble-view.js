
const insertComments = async (container, comment) => {
  const dateComment = new Date(Date.parse(comment.updatedAt))

  let newComment = document.createElement('div')
  let user = document.createElement('div')
  let text = document.createElement('div')
  let date = document.createElement('div')

  let commentClasses = [`comment-${comment.id}`, 'comment']
  newComment.classList.add(...commentClasses)
  user.classList.add('comment-username')
  text.classList.add('comment-text')
  date.classList.add('comment-date')
  user.innerHTML = comment.User.userName;
  text.innerHTML = comment.comment;
  date.innerHTML = `${dateComment.getMonth() + 1}/${dateComment.getDate()}/${dateComment.getFullYear()} ${dateComment.getHours()}:${dateComment.getMinutes()}`
  user.append(date)
  newComment.appendChild(user);
  newComment.appendChild(text);
  container.prepend(newComment);
}

window.addEventListener("DOMContentLoaded", async () => {

  try {
    const res = await fetch(`/api${window.location.pathname}`);
    const babble = await res.json()
    const date = new Date(Date.parse(babble.updatedAt))

    document.querySelector('#babble-header').innerHTML = babble.title;
    document.querySelector('#babble-subheader').innerHTML = babble.subHeader;
    document.querySelector('#babble-user-fullname').setAttribute('href', `/users/${babble.userID}/profile`);
    document.querySelector('#babble-user-fullname').innerHTML = `${babble.User.firstName} ${babble.User.lastName}`
    document.querySelector('#babble-date').innerHTML = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()} `;
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


    const resReaction = await fetch(`/api${window.location.pathname}/reactions`)
    const reactions =  await resReaction.json();
    let reactionObj = {
      clap: 0,
      like: 0,
      love: 0
    }

    for(let i=0; i<reactions.length; i++){
      if(reactions[i].reaction === 'clap'){
        reactionObj.clap++
      } else if (reactions[i].reaction === 'like'){
        reactionObj.like++
      } else if (reactions[i].reaction === 'love'){
        reactionObj.love++
      }
    }

    if(reactionObj.clap){
      document.querySelector('#babble-reaction__clap-count').innerHTML = reactionObj.clap
    }
     if (reactionObj.like) {
    document.querySelector('#babble-reaction__like-count').innerHTML = reactionObj.like
     }
      if (reactionObj.love) {
    document.querySelector('#babble-reaction__love-count').innerHTML = reactionObj.love
      }


    document.querySelector('#comment-add').addEventListener('click', () => {
      document.querySelector('.babble-new-comment-div').classList.remove('hidden')
    })


  } catch (err) {
    handleErrors(err)
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
      handleErrors(err)
    }
  });

document.querySelector('#comment-cancel')
  .addEventListener('click', (event) => {
    document.querySelector('#new-comment__textarea').value = '';
    document.querySelector('.babble-new-comment-div').classList.add('hidden');
  })

document.querySelector('.babble-reactions-container')
  .addEventListener('click', async (event) => {

if (event.target.localName === 'button') {
  let react = event.target.innerHTML
  const reactionRes = await fetch(`/api${window.location.pathname}/reactions/${react}`, {
    method: 'get',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem('babble_access_token')}`
    }
  })
  let count = document.querySelector(`#babble-reaction__${react}-count`)
  if (count.innerHTML > 0) {

    count.innerHTML = parseInt(count.innerHTML, 10) + 1
    }
    else {
      count.innerHTML = 1;
    }
    }
    })
