window.addEventListener("DOMContentLoaded", async () => {
  const buttons = document.querySelectorAll('button');

  console.log(buttons)

  for (button of buttons) {
    button.addEventListener('click', async (e) => {
      window.location.href = `/topics/search/${e.target.innerHTML}`
    })
  }

})
