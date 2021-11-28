function getFullDate() {
  var td = new Date();
  var date = td.getFullYear() + "-" + (td.getMonth() + 1) + "-" + td.getDate();
  var time = td.getHours() + ":" + td.getMinutes() + ":" + td.getSeconds();
  var dateTime = date + " " + time;
  return dateTime;
}

export { getFullDate };
