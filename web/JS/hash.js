/**
 * Hashes a given string using the SHA-256 algorithm
 * @param {string} string
 * @returns {Promise<ArrayBuffer>}
 */
async function sha256(string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(string);
  const hashBuffer = await window.crypto.subtle.digest("SHA-256", data);
  return hashBuffer;
}

/**
 * Converts an ArrayBuffer to a hex string
 * @param {ArrayBuffer} buffer
 * @returns {string}
 */
async function bufferToHex(buffer) {
  return Array.prototype.map
    .call(new Uint8Array(buffer), (x) => ("00" + x.toString(16)).slice(-2))
    .join("");
}

/**
 * Hashes a password using a given secret phrase and site name
 * @param {string} secretPhrase
 * @param {string} siteName
 * @returns {Promise<string>}
 */
async function hashPassword(secretPhrase, siteName) {
  const hashBuffer = await sha256(secretPhrase + siteName);
  const hashedPassword = await bufferToHex(hashBuffer);
  return hashedPassword;
}

/**
 * Complies the password with the specified site's requirements
 * @param {string} ending
 * @param {HTMLInputElement} passLength
 * @param {HTMLInputElement} lengthCheck
 * @param {string} hash
 * @returns {string}
 */
function complyWithSite(ending, passLength, lengthCheck, hash) {
  const password = hash + ending;
  passLength.max = password.length;
  passLength.min = ending.length;
  if (Number(passLength.value) > Number(passLength.max)) {
    passLength.value = passLength.max;
  }
  let newPassword;
  if (lengthCheck.checked) {
    newPassword = password.slice(-passLength.value);
  } else {
    passLength.value = password.length;
    newPassword = password;
  }
  return newPassword;
}
