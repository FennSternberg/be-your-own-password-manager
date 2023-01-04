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
  const secret_phrase = document.getElementById("secret-phrase").value;
  const site_name = document.getElementById("site-name").value;
  const hashBuffer = await sha256(secret_phrase + site_name);
  const hash = await bufferToHex(hashBuffer);
  document.getElementById("hash").value = hash;
}
