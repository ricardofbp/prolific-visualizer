let data = null;

d3.csv('data.csv', function (d) {
  return {
    title: d['Study'],
    reward: +parseMoney(d['Reward']),
    bonus: +parseMoney(d['Bonus']),
    startTime: parseDate(d['Started At']),
    endTime: parseDate(d['Completed At']),
    status: d['Status'],
  };
}).then(function (d) {
  data = d;
  // render();
});

function conversor(d) {
  title = d['Study'];
  reward = +parseMoney(d['Reward']);
  bonus = +parseMoney(d['Bonus']);
  startTime = parseDate(d['Started At']);
  endTime = parseDate(d['Completed At']);
  status = d['Status'];

  return d;
}

function parseMoney(money) {
  return money.replace(/[£\s]/g, '');
}

function parseDate(date) {
  var dateParse = d3.utcParse("%Y-%m-%d %H:%M:%S.%L000");
  return dateParse(date);
}