window.addEventListener('DOMContentLoaded', async (e) => {
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

// document.querySelector(".profile-edit-form").addEventListener('submit', async (e) => {
//   e.preventDefault()
//   const userId = localStorage.getItem('babble_user_id');

//   const user = await user.findByPk(userId)

//   const formData = new FormData(createBabbleForm)

//   const firstName = formData.get("firstName");
//   const lastName = formData.get("lastName");
//   const email = formData.get("email");
//   const biography = formData.get("biography");



//   const body = {
//     firstName,
//     lastName,
//     email,
//     biography
//     // topics
//   }

//   try {
//     const res = await fetch(`/api/users/${userId}/edit`, {
//       method: "PATCH",
//       body: JSON.stringify(body),
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${localStorage.getItem('babble_access_token')}`
//       },
//     });

//     if (res.status === 401) {
//       console.log("here")
//       window.location.href = "/log-in";
//     }

//     if (!res.ok) {
//       throw res;
//     }

//     window.location.href = '/';

//   } catch (err) {
//     if (err.status >= 400 && err.status < 600) {
//       const errorJSON = await err.json();
//       const errorsContainer = document.querySelector('.errors-container');
//       let errorsHtml = [
//         `
//           <div class="alert alert-danger">
//             Something went wrong. Please try again.
//           </div>
//           `
//         ,
//       ];

//       const { errors } = errorJSON;
//       if (errors && Array.isArray(errors)) {
//         errorsHtml = errors.map(
//           (message) => `<div class="alert alert-danger">${message}</div>`
//         )
//       }
//       errorsContainer.innerHTML = errorsHtml.join("");
//     } else {
//       alert(
//         "Something went wrong. Please check your internet connection and try again!"
//       );
//     }
//   }
// });
