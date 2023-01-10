hash = "";
async function sha256(string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(string);
  const hashBuffer = await window.crypto.subtle.digest("SHA-256", data);
  return hashBuffer;
}
async function bufferToHex(buffer) {
  return Array.prototype.map
    .call(new Uint8Array(buffer), (x) => ("00" + x.toString(16)).slice(-2))
    .join("");
}
async function hashPassword() {
  const secret_phrase = document.querySelector("#secret-phrase").value;
  const site_name = document.querySelector("#site-name").value.toUpperCase();
  const hashBuffer = await sha256(secret_phrase + site_name);
  hash = await bufferToHex(hashBuffer);
  comply_with_site();
}
function comply_with_site() {
  const ending = document.querySelector("#ending").value;
  password = hash + ending;
  const length_check = document.querySelector("#length-check");
  const pass_length = document.querySelector("#length");
  pass_length.max = password.length;
  pass_length.min = ending.length;
  if (Number(pass_length.value) > Number(pass_length.max)) {
    pass_length.value = pass_length.max;
  }
  if (length_check.checked) {
    document.querySelector("#hash").innerHTML = password.slice(
      -pass_length.value
    );
  } else {
    pass_length.value = password.length;
    document.querySelector("#hash").innerHTML = password;
  }
}
function appendEnding() {
  hash.innerHTML = hash + document.querySelector("#ending").value;
}
