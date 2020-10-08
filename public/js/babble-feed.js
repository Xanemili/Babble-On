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

        console.log(res2);

        const leftContainer = document.querySelector('.left-container');
        const centerContainer = document.querySelector('.center-container');
        const rightContainer = document.querySelector('.right-container')
        const topicsDiv = document.createElement('div');

        topicsDiv.classList.add('topics-div')
        topicsDiv.innerHTML = 'Topics'


        //Loop for babbles
        for (let i = 0; i < 4; i++) {
            // const date = new Date(Date(babbles[i].updatedAt))
            const babbleDiv = document.createElement('div');
            const babbleTitleDiv = document.createElement('div');
            const babbleSubHeaderDiv = document.createElement('div');
            const babbleTopicDiv = document.createElement('button');
            const babbleReadTimeDiv = document.createElement('div');
            const babbleTimestampDiv = document.createElement('div');
            const babbleImg = document.createElement('img');
            const babbleImgDiv = document.createElement('div');
            const babbleLink = document.createElement('a');


            babbleDiv.classList.add('babble-div');
            babbleTitleDiv.classList.add('babble-title-div');
            babbleSubHeaderDiv.classList.add('babble-sub-header-div');
            babbleTopicDiv.classList.add('babble-topic-div');
            babbleReadTimeDiv.classList.add('babble-read-time');
            babbleTimestampDiv.classList.add('babble-timestamp-div');
            babbleImg.classList.add('babble-img');
            babbleImgDiv.classList.add('babble-img-div');

            const babbleTitle = babbles[i].title;
            const babbleSubHeader = babbles[i].subHeader
            const babbleReadTime = `${babbles[i].readTime} minute(s) read time`;
            const babbleTimestamp = babbles[i].updatedAt
            const babbleTopic = babbles[i].Topic.name
            babbleImg.setAttribute('src', 'https://www.njea.org/wp-content/uploads/2014/10/Coding.jpg');
            babbleLink.setAttribute('href', ``)

            babbleTitleDiv.innerHTML = babbleTitle;
            babbleSubHeaderDiv.innerHTML = babbleSubHeader
            babbleReadTimeDiv.innerHTML = babbleReadTime;
            babbleTopicDiv.innerHTML = babbleTopic;
            babbleTimestampDiv.innerHTML = babbleTimestamp;


            babbleDiv.append(babbleTitleDiv);
            babbleDiv.append(babbleSubHeaderDiv)
            babbleDiv.append(babbleReadTimeDiv);
            babbleDiv.append(babbleTopicDiv);
            babbleDiv.append(babbleTimestampDiv);
            babbleDiv.append(babbleImg)
            babbleDiv.append(babbleLink)

            centerContainer.append(babbleDiv);
        }
        //Loop for topics
        for (let i = 0; i < topics.length; i++) {
            const topicsNameDiv = document.createElement('div');
            const topicsBtn = document.createElement('button');

            topicsNameDiv.classList.add('topics-name-div');
            topicsBtn.classList.add('topics-btn');

            const topicsName = topics[i].name;

            topicsBtn.innerHTML = topicsName;
            topicsNameDiv.append(topicsBtn);
            topicsDiv.append(topicsNameDiv);
            leftContainer.append(topicsDiv)
     }

    } catch (err){
        console.error(err);
    }
});
