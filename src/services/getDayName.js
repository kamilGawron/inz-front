const getDayName = ({ date, short = false }) => {
  let dayName;
  let shortName;
  switch (date.getDay()) {
    case 0:
      shortName = "nd";
      dayName = "niedziela";
      break;
    case 1:
      shortName = "pn";
      dayName = "poniedziałek";
      break;
    case 2:
      shortName = "wt";
      dayName = "wtorek";
      break;
    case 3:
      shortName = "śr";
      dayName = "środa";
      break;
    case 4:
      shortName = "czw";
      dayName = "czwartek";
      break;
    case 5:
      shortName = "pt";
      dayName = "piątek";
      break;
    case 6:
      shortName = "sb";
      dayName = "sobota";
      break;
    default:
      break;
  }
  if (short) {
    return shortName;
  }
  return dayName;
};

export default getDayName;
