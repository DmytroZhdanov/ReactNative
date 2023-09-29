/**
 * Transform ms to appropriate date format
 * @param {Number} ms number of ms to be converted into appropriate date format
 * @returns String with appropriate date format
 */
export const transformDate = ms => {
  const time = new Date(ms);

  const year = time.getFullYear();
  const month = transformMonth(time.getMonth());
  const day = time.getDate().toString().padStart(2, 0);
  const hours = time.getHours().toString().padStart(2, 0);
  const minutes = time.getMinutes().toString().padStart(2, 0);

  return `${day} ${month}, ${year} | ${hours}:${minutes}`;
};

/**
 * Transform number of month to it's name
 * @param {Number} number number of month from 0 to 11
 * @returns String with name of month according to it's number
 */
const transformMonth = number => {
  switch (number) {
    case 0:
      return "January";
    case 1:
      return "February";
    case 2:
      return "March";
    case 3:
      return "April";
    case 4:
      return "May";
    case 5:
      return "June";
    case 6:
      return "July";
    case 7:
      return "August";
    case 8:
      return "September";
    case 9:
      return "October";
    case 10:
      return "November";
    case 11:
      return "December";
  }
};
