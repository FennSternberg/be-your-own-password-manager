function sha256(string){
  const encoder = new TextEncoder();
  const data = encoder.encode(string);
  return window.crypto.subtle.digest('SHA-256',data);
}
function buggerToHex(buffer){
  return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('');
}
