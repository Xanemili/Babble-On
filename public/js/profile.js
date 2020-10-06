window.addEventListener('DOMContentLoaded', async (e) => {
    const userId = localStorage.getItem('babble_user_id');

    const res = await fetch(`/api/users/${userId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('babble_access_token')}`,
        },
    });

    const { users } = await res.json();
    const userInfoDiv = document.querySelector('.user-info-div')

    const userHtml = users.map(
        ({ userName, firstName }) => `
        <div>
            <p> ${userName} ${firstName}
        </div`
    );

    userInfoDiv.innerHTML = userHtml.join('');
});