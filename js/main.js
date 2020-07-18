var data = null;

d3.csv('data.csv', function (d) {
  return {
    title: d['Study'],
    //TODO parse only 2 decimal cases
    reward: +parseMoney(d['Reward']),
    bonus: +parseMoney(d['Bonus']),
    startTime: parseDate(d['Started At']),
    endTime: parseDate(d['Completed At']),
    status: d['Status'],
  };
}).then(function (d) {
  data = d;
  renderBarChart();
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

//TODO call only once, since static data
function rewardTotal() {
  var total = 0;
  data.forEach(d => {
    total += +d.reward;
  });
  return total;
}
//TODO call only once, since static data
function bonusTotal() {
  var total = 0;
  data.forEach(d => {
    total += +d.bonus;
  });
  return total;
}
//TODO call only once, since static data
function totalEarned() {
  return bonusTotal() + rewardTotal()
}

function maxReward() {
  return d3.max(data, d => {
    return +d.reward;
  });
}

function maxBonus() {
  return d3.max(data, d => {
    return +d.bonus;
  })
}

function minReward() {
  return d3.min(data, d => {
    return +d.reward;
  });
}

function getMinBonus() {
  return d3.min(data.filter(d => {
    return +d.bonus !== 0;
  }), function (d) {
    return +d.bonus;
  });
}

