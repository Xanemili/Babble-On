```


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
        const topicsDivTitle = document.createElement('h2');

        topicsDivTitle.innerHTML = 'Topics'

        topicsDivTitle.classList.add('topics-div-titles')

        topicsDiv.classList.add('topics-div')

        topicsDiv.append(topicsDivTitle);



        //Loop for babbles
        for (let i = 0; i < babbles.length; i++) {
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
            babbleImg.setAttribute('src', `${babbles[i].url}`);
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

```

```
.main-container {

}

.left-container {
    display: flex;
    background-color:lightgray;
    justify-content: center;
    width: 150px;
    position: fixed;
    border: 1px solid grey;
    border-radius: 2%;
    margin-left: 25px;

}



.topics-btn {
    display: inline-block;
    padding: 0.35em 1.2em;
    background-color: rgba(65, 172, 131, .45);
    border: 0.1em solid #FFFFFF;
    margin: 0.3em 0.3em 0;
    border-radius: 0.12em;
    box-sizing: border-box;
    text-decoration: none;
    font-weight: 300;
    color: #FFFFFF;
    text-align: center;
    transform: all 0.2s;
}

.topics-div {
    display: flex;
    /* justify-content: space-between; */
    flex-direction: column;
    /* text-align: center; */
}

.topics-btn:hover {
    color: #000000;
    background-color: #FFFFFF;
}

.topics-name-div {
    margin: 7px;
}

.topics-div-titles {
    text-align: center;
}

.center-container {
    /* align-items: center; */
    /* justify-content: center; */
    /* /* display: flex; */
    /* flex-wrap: wrap;
    align-self: center; */
    /* flex-direction: row; */
    /* background-color: grey; */
    /* width: 800px; */
}

.babble-div {
    margin: auto;
    margin-top: 100px;
    justify-content: center;
    display: flex;
    /* align-items: left; */
    flex-direction: column;
    align-content: flex-start;
    /* border: 1px solid black; */
    background-color: white;
    /* border: 2px solid lightgray; */
    border-radius: 2%;
    height: auto;
    width: 700px;
    /* position: posit; */
}

.babble-img {
    width: 700px;
    height: 375px;
}

.babble-title-div {
    display: flex;
    justify-content: center;
    font-size: 32pt;
}

.babble-sub-header-div {
    display: flex;
    justify-content: center;
    font-size: 22pt;
}

.babble-read-time {
    display: flex;
    justify-content: flex-end;
    margin-right: 25px;
}

.babble-topic-div {
    justify-self: center;
    position: relative;
    /* background-color: rgba(65, 172, 131, .75); */
    border-radius: 50px;
    height: 50px;
    width: 100px;
    font-size: 14pt;
    font-weight: bolder;
    margin: 10px;
    margin-bottom: 20px;
    outline: none;
}

.babble-topic-div:hover {
    background-color: lightgray;
}

.babble-timestamp-div {
    display: flex;
    justify-content: center;
}

.feed-header-div {
    display: flex;
    justify-content: center;
    margin-top: 5rem;

}
```

```
doctype html
html
    head
        link(rel="stylesheet", href="/styles/babble-feed-page.css")
        title
    body
    include navbar-grey-logged.pug
    div(class="feed-header-div")
        h1(class='h1-topics') Top Trending Babbles
    div(class="main-container")
        div(class="left-container")
        div(class="center-container")
        div(class="right-container")
script(src="js/babble-feed.js")
```
