const searchVal = document.querySelector('.search__bar')
const searchbtn = document.querySelector('.nav__search');
searchbtn.addEventListener('click', async() => {
  try{
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




window.addEventListener('DOMContentLoaded', async (e) => {
    try {
        const res1 = await fetch('/api/babbles');
        const res2 = await fetch('/api/topics');

        const babbles = await res1.json();
        const topics  = await res2.json();

        const mainBabbleImgDiv = document.querySelector('.main-babble-img')
        const mainBabbleImg = document.createElement('img')
        // mainBabbleImg.classList.add('babble-image')
        // mainBabbleImg.setAttribute('src', 'https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg')
        mainBabbleImgDiv.innerHTML = "<img src = 'https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg'>";


        function mainBableInfo() {
        const mainBabbleTitle = document.createElement('div')
        mainBabbleTitle.classList.add('babble-title');
        mainBabbleTitle.innerHTML = babbles[0].title

        const mainBabbleSubHeader = document.createElement('div')
        mainBabbleSubHeader.classList.add('babble-subHeader')
        mainBabbleSubHeader.innerHTML = babbles[0].subHeader

        const mainBabbleAuthor = document.createElement('div')
        mainBabbleAuthor.classList.add('babble-author')
        mainBabbleAuthor.innerHTML = `By: ${babbles[0].User.firstName} ${babbles[0].User.lastName}`

        const mainBabbleReadTime = document.createElement('div')
        mainBabbleReadTime.classList.add('main-babble-read-time')
        mainBabbleReadTime.innerHTML = `${babbles[0].readTime} min read`

        const mainBabbleInfo = document.querySelector('.main-babble-info');

        mainBabbleInfo.append(mainBabbleTitle)
        mainBabbleInfo.append(mainBabbleSubHeader)
        mainBabbleInfo.append(mainBabbleAuthor)
        mainBabbleInfo.append(mainBabbleReadTime)
        }

        mainBableInfo();

    } catch (err){
        console.error(err);
    }
});
