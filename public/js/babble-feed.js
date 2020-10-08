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


        //Loop for babbles
        for (let i = 0; i < 4; i++) {
            // const date = new Date(Date(babbles[i].updatedAt))
            const babbleDiv = document.createElement('div');
            const babbleTitleDiv = document.createElement('div');
            const babbleSubHeaderDiv = document.createElement('div');
            const babbleTopicDiv = document.createElement('div');
            const babbleReadTimeDiv = document.createElement('div');
            const babbleTimestampDiv = document.createElement('div');
            const babbleImg = document.createElement('img');
            const babbleImgDiv = document.createElement('div');


            babbleDiv.classList.add('babble-div');
            babbleTitleDiv.classList.add('babble-title-div');
            babbleSubHeaderDiv.classList.add('babble-sub-header-div');
            babbleTopicDiv.classList.add('babble-topic-div');
            babbleReadTimeDiv.classList.add('babble-read-time');
            babbleTimestampDiv.classList.add('babble-timestamp-div');
            babbleImg.classList.add('babble-ing');
            babbleImgDiv.classList.add('babble-img-div');

            const babbleTitle = babbles[i].title;
            const babbleSubHeader = babbles[i].subHeader
            const babbleReadTime = babbles[i].readTime;
            const babbleTimestamp = babbles[i].updatedAt
            const babbleTopic = babbles[i].Topic.name
            babbleImg.setAttribute('src', );

            babbleTitleDiv.innerHTML = babbleTitle;
            babbleSubHeaderDiv.innerHTML = babbleSubHeader
            babbleReadTimeDiv.innerHTML = babbleReadTime;
            babbleTopicDiv.innerHTML = babbleTopic;
            babbleTimestampDiv.innerHTML = babbleTimestamp;
            babbleImgDiv.innerHTML = babbleImg

            babbleDiv.append(babbleTitleDiv);
            babbleDiv.append(babbleSubHeaderDiv)
            babbleDiv.append(babbleReadTimeDiv);
            babbleDiv.append(babbleTopicDiv);
            babbleDiv.append(babbleTimestampDiv);
            babbleDiv.append(babbleImgDiv)

            centerContainer.append(babbleDiv);
        }
        //Loop for topics
        for (let i = 0; i < topics.length; i++) {
            const topicsNameDiv = document.createElement('div');
            const topicsBtn = document.createElement('button');

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