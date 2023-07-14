function makeid() {
  var length = 10
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() *
      charactersLength));
  }
  return result;
}
function flatten(array) {
  // only work for array shape (n,1)
  var result = new Array()
  array.forEach(element => {
    result.push(element[0])
  })
  return result
}
function getCurrentTime() {
  var currentdate = new Date();
  return currentdate;
}
