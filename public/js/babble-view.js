window.addEventListener("DOMContentLoaded", async () => {

  try {
    const res = await fetch(`/../api/babbles/3`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjo1LCJlbWFpbCI6InhhbkBnbWFpbC5jb20ifSwiaWF0IjoxNjAyMDE4MzM2LCJleHAiOjE2MDI2MjMxMzZ9.2Ao4CiNzFMCYktacNFnsiQUVar_2NWOoKgmSWqa6Qt4`
      }
    });

    const babble = await res.json()

    // test this: const month = Date.parse(babble.createdAt)

    document.querySelector('#babble-header').innerHTML = babble.title
    document.querySelector('#babble-subheader').innerHTML = babble.subHeader
    document.querySelector('#babble-date').innerHTML = `insert date here!`
    document.querySelector('#babble-read-time').innerHTML = `${babble.readTime}`
    document.querySelector('#babble-topic').innerHTML = `${babble.topicID}`

    const babbleImage = document.querySelector('#babble-image')
    babbleImage.setAttribute('src', 'https://miro.medium.com/max/2200/0*DaCxg9GGlwe5MA3o')


  } catch (err) {
    throw err;
  }
})
