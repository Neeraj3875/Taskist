
const dayele = document.getElementsByClassName("daypara")[0];
const timeele = document.getElementsByClassName("timepara")[0];

const now = new Date();
const options = { weekday: 'long' };
const day = new Intl.DateTimeFormat('en-US', options).format(now);
dayele.innerText = day;
timeele.innerText = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) ;
