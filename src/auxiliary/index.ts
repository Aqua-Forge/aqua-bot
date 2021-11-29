function getFullDate() {
  var td = new Date();
  var date = td.getFullYear() + "-" + (td.getMonth() + 1) + "-" + td.getDate();
  var time = td.getHours() + ":" + td.getMinutes() + ":" + td.getSeconds();
  var dateTime = date + " " + time;
  return dateTime;
}

function generatePresentationText(cmds: Object) {
  var text = `Oi, eu sou o AquaBot! Meus comandos são:\n`;
  for (var [cmd, desc] of Object.entries(cmds)) {
    text += "$" + `${cmd} - ${desc}\n`;
  }
  return text;
}

export { getFullDate, generatePresentationText };
