window.addEventListener("load", function () {
  clipboard = new ClipboardJS("#copy-button");
  copyButton = document.getElementById("copy-button");
  clipboard.on("success", function (e) {
    e.clearSelection();
  });
  // Listen for if sensitive information should be hidden or not
  const secret_checkbox = document.querySelector("#secret-check");
  secret_checkbox.addEventListener("change", (event) => {
    const password = document.querySelector("#hash");
    const secret_phrase = this.document.querySelector("#secret-phrase");
    if (event.target.checked) {
      // Hide sensitive information
      password.classList.add("offscreen");
      secret_phrase.type = "password";
    } else {
      // Show sensitive information
      password.classList.remove("offscreen");
      secret_phrase.classList.remove("secret");
      secret_phrase.type = "text";
    }
  });

  // Listen for if the password length should be reduced or not
  const length_checkbox = this.document.querySelector("#length-check");
  length_checkbox.addEventListener("change", (event) => {
    const length = this.document.querySelector("#length-div");
    if (event.target.checked) {
      // Reduce length of password
      length.hidden = false;
    } else {
      // Length of password remains as default
      length.hidden = true;
      comply_with_site();
    }
  });
});
