export const formatDate = (date: string) => {
  const inputDate = date.slice(0,10)
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const [year, month, day] = inputDate.split('-');
  const monthIndex = parseInt(month, 10) - 1;
  const shortMonth = months[monthIndex];
  const shortDay = parseInt(day);

  return `${shortDay} ${shortMonth} ${year}`;
}