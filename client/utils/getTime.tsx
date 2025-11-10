export default function getTime () {
  const date = new Date().getDate()
  const mouth = new Date().getMonth()
  const year = new Date().getFullYear()
  const monthNames = [
    "Января", "Февраля", "Марта", "Апреля", "Мая", "Июня",
    "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"
  ];
  return `${date} ${monthNames[mouth]} ${year}`

}