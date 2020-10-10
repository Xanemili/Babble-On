const genericErrorHandler = () => {

  if (err.status >= 400 && err.status < 600) {
    const errorJSON = await err.json();
    const errorsContainer = document.querySelector('.errors-container');

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
  }
}



module.exports = {
  genericErrorHandler
}
