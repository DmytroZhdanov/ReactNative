export const transformDate = ms => {
  const time = new Date(ms);

  const year = time.getFullYear();
  const month = transformMonth(time.getMonth());
  const day = time.getDate().toString().padStart(2, 0);
  const hours = time.getHours().toString().padStart(2, 0);
  const minutes = time.getMinutes().toString().padStart(2, 0);

  return `${day} ${month}, ${year} | ${hours}:${minutes}`;
};

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
