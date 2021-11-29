function getFullDate() {
  var td = new Date();
  var date = td.getFullYear() + "-" + (td.getMonth() + 1) + "-" + td.getDate();
  var time = td.getHours() + ":" + td.getMinutes() + ":" + td.getSeconds();
  var dateTime = date + " " + time;
  return dateTime;
}

function sleep(seconds: number) {
  return new Promise(res => setTimeout(res, seconds * 1000))
}

export { getFullDate, sleep };
