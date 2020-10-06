const logInForm = document.querySelector(".log-in-form");
const logo = document.querySelector(".log-in-logo");
const instructions= document.querySelector('.instructions');
const demo = document.querySelector('.demo-btn')


logInForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(logInForm);
    const email = formData.get('email');
    const password = formData.get('password');
    const body = { email, password};

    try {
        const res = await fetch('/api/users/token', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!res.ok) {
            throw res;
        }
        const {
            token,
            user: { id },
        } = await res.json();

        localStorage.setItem('babble_access_token', token);
        localStorage.setItem('babble_user_id', id)

        window.location.href = '/';
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

            const { errors } = errorJSON;
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
});
