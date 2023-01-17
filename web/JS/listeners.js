// Listen for DOMContentLoaded event
document.addEventListener("DOMContentLoaded", function () {
  // Initialize clipboard
  const clipboard = new ClipboardJS("#copy-button");

  // Handle clipboard success event
  clipboard.on("success", function (e) {
    e.trigger.title = "Copied!";
    const tooltip = new bootstrap.Tooltip(e.trigger);
    tooltip.show();
    setTimeout(() => {
      tooltip.hide();
      e.trigger.removeAttribute("data-bs-original-title");
      e.trigger.title = "";
      e.clearSelection();
    }, 300);
  });

  // Listen for an input that has to be hashed
  const hashInputs = document.querySelectorAll(".hash-pw");
  for (let i = 0; i < hashInputs.length; i++) {
    hashInputs[i].addEventListener("input", handleHashInput);
  }

  // Listen for if sensitive information should be hidden or not
  const secretCheckbox = document.querySelector("#secret-check");
  secretCheckbox.addEventListener("change", handleSecretCheckbox);

  // Listen for if the password length should be reduced or not
  const lengthCheckbox = document.querySelector("#length-check");
  lengthCheckbox.addEventListener("change", handleLengthCheckbox);

  // Cached DOM elements
  const secretPhrase = document.querySelector("#secret-phrase");
  const siteName = document.querySelector("#site-name");
  const ending = document.querySelector("#ending");
  const lengthCheck = document.querySelector("#length-check");
  const passLength = document.querySelector("#length");
  const hash = document.querySelector("#hash");
  const lengthDiv = document.querySelector("#length-div");

  /**
   * Handles the input event for elements with the "hash-pw" class
   */
  async function handleHashInput() {
    const secretPhraseValue = secretPhrase.value;
    const siteNameValue = siteName.value.toUpperCase();
    const hashValue = await hashPassword(secretPhraseValue, siteNameValue);
    const endingValue = ending.value;
    const newPassword = complyWithSite(
      endingValue,
      passLength,
      lengthCheck,
      hashValue
    );
    hash.innerHTML = newPassword;
  }

  /**
   * Handles the change event for the "secret-check" checkbox
   * @param {Event} event
   */
  function handleSecretCheckbox(event) {
    if (event.target.checked) {
      // Hide sensitive information
      hash.classList.add("offscreen");
      secretPhrase.type = "password";
    } else {
      // Show sensitive information
      hash.classList.remove("offscreen");
      secretPhrase.classList.remove("secret");
      secretPhrase.type = "text";
    }
  }

  /**
   * Handles the change event for the "length-check" checkbox
   * @param {Event} event
   */
  function handleLengthCheckbox(event) {
    if (event.target.checked) {
      // Show the length input
      lengthDiv.hidden = false;
    } else {
      // Hide the length input
      lengthDiv.hidden = true;
    }
  }
});
