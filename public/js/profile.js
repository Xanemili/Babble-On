window.addEventListener('DOMContentLoaded', async (e) => {
    try {
    const userId = localStorage.getItem('babble_user_id');

    const res = await fetch(`/api/users/${userId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('babble_access_token')}`,
        },
    });

    const { user } = await res.json();
    const userInfoDiv = document.querySelector('.user-info-div')

    const userHtml =
    `<div>
        <p> ${user.userName} ${user.firstName} ${user.lastName} ${user.email} ${user.biography}</p>
    </div`

    userInfoDiv.innerHTML = userHtml
} catch(err) {
    console.error(err)
}
});