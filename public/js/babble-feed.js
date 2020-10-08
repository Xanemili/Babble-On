window.addEventListener('DOMContentLoaded', async (e) => {
    try {
        const res1 = await fetch('/api/babbles')
        const res2 = await fetch('')

        const babbles = await res1.json();

        console.log(babbles);

        const leftContainer = document.querySelector('.left-container')


        for (let i = 0; i < 4; i++) {
            // const date = new Date(Date(babbles[i].updatedAt))
            const topicsDiv = document.createElement('div');
            const babbleDiv = document.createElement('div');
            const followListDiv = document.createElement('div');
            const babbleTitleDiv = document.createElement('div');
            const babbleReadTimeDiv = document.createElement('div');
            const babbleTimestampDiv = document.createElement('div');
            const babbleImg = document.createElement('img');
            const babbleImgDiv = document.createElement('div');

            topicsDiv.classList.add('topics-div');
            babbleDiv.classList.add('babble-div');
            followListDiv.classList.add('follow-list-div');
            babbleTitleDiv.classList.add('babble-title-div');
            babbleReadTimeDiv.classList.add('babble-read-time');
            babbleTimestampDiv.classList.add('babble-timestamp-div');
            babbleImg.classList.add('babble-ing');
            babbleImgDiv.classList.add('babble-img-div');

            const babbleTitle = babbles[i].title;
            const babbleReadTime = babbles[i].readTime;
            // const babbleTimestamp = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
            babbleImg.setAttribute('src', babbles[i].url);

            babbleTitleDiv.innerHTML = babbleTitle;

            babbleDiv.append(babbleTitleDiv);
            leftContainer.append(babbleDiv);
        }

      const test = document.createElement('div')
      test.innerHTML = 'test'

    } catch (err){
        console.error(err);
    }
});