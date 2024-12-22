export const formatDate = (date) => {
  const d = new Date(date)
  let month = '' + (d.getMonth() + 1)
  let day = '' + d.getDate()
  const year = d.getFullYear()

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day

  return [month, day, year].join('-')
}

export const formatDateYMD = (date) => {
  const d = new Date(date)
  let month = '' + (d.getMonth() + 1)
  let day = '' + d.getDate()
  const year = d.getFullYear()

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day

  return [year, month, day].join('-')
}
export const formatDateMDY = (date) => {
  const d = new Date(date)
  let month = '' + (d.getMonth() + 1)
  let day = '' + d.getDate()
  const year = d.getFullYear()

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day

  return [month, day, year].join('/')
}

export const getDateDaysAgo = (days) => {
  const now = new Date()
  now.setDate(now.getDate() - days)
  return now
}

export const getDateTime = (dateTime, fromActivity) => {
  if (!dateTime && fromActivity) return null;
  if (!dateTime) return 'NA';
  const d = new Date(dateTime)
  let month = '' + (d.getMonth() + 1)
  let day = '' + d.getDate()
  const year = d.getFullYear()
  let hours = d.getHours()
  let minutes = d.getMinutes()
  const ampm = hours >= 12 ? 'PM' : 'AM'
  hours = hours % 12
  hours = hours || 12 // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes
  const time = hours + ':' + minutes + ' ' + ampm

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day

  const formatedDateTime = `${month}-${day}-${year} ${time}`

  return formatedDateTime
}

export const getDateTimeByYMD = (dateTime) => {
  if (!dateTime) return 'NA';
  const d = new Date(dateTime)
  let month = '' + (d.getMonth() + 1)
  let day = '' + d.getDate()
  const year = d.getFullYear()
  let hours = d.getHours()
  let minutes = d.getMinutes()
  let seconds = d.getSeconds()
  const ampm = hours >= 12 ? 'PM' : 'AM'
  hours = hours % 12
  hours = hours || 12 // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes
  seconds = seconds < 10 ? '0' + seconds : seconds
  const time = hours + ':' + minutes + ' ' + ampm

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day

  const formatedDateTime = `${year}-${month}-${day} ${time}`

  return formatedDateTime
}

export const getDateThreeMonthsBefore = () => {
  let d = new Date();
  d.setMonth(d.getMonth() - 3);
  return d;
}

export const convertUtcToCet = (utcDate) => {
  // Create a Date object from the UTC date string
  const utcTime = new Date(utcDate);

  // CET is UTC+1, or UTC+2 during Central European Summer Time (CEST)
  const isCetDST = (() => {
    const year = utcTime.getUTCFullYear();
    const dstStart = new Date(Date.UTC(year, 2, 31, 1, 0, 0)); // Last Sunday in March
    const dstEnd = new Date(Date.UTC(year, 9, 31, 1, 0, 0));   // Last Sunday in October

    return utcTime >= dstStart && utcTime < dstEnd;
  })();

  const cetOffset = isCetDST ? 2 : 1; // CET offset

  // Calculate the CET time
  utcTime.setUTCHours(utcTime.getUTCHours() + cetOffset);

  // Convert to AM/PM format
  let hours = utcTime.getUTCHours();
  const minutes = utcTime.getUTCMinutes();
  const amPm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12; // Convert to 12-hour format

  // Get the CET date in YYYY-MM-DD format
  const cetDate = utcTime.toISOString().split('T')[0].split('-');
  const formattedCetDate = `${cetDate[1]}-${cetDate[2]}-${cetDate[0]}`;

  // Format the time as a string with date
  const cetTimeWithDateAmPm = `${formattedCetDate} ${hours}:${minutes < 10 ? '0' : ''}${minutes} ${amPm}`;

  return cetTimeWithDateAmPm;
}

export const addHours = (date, hours) => {
  const hoursToAdd = hours * 60 * 60 * 1000;
  date.setTime(date.getTime() + hoursToAdd);
  return date;
}

export const formatSecondsToHHMMSS = (totalSeconds) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return formattedTime;
}
