export function useGenerateCalendar(currentDate) {
  const MONTHS = [
    'Янв',
    'Фев',
    'Мар',
    'Апр',
    'Май',
    'Июн',
    'Июл',
    'Авг',
    'Сен',
    'Окт',
    'Ноя',
    'Дек',
  ]

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  // Первый день месяца и последний день месяца
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)

  // Первый день календаря (понедельник недели, содержащей 1 число)
  const firstCalendarDay = new Date(firstDay)
  const dayOfWeek = firstDay.getDay() || 7 // Convert Sunday (0) to 7
  firstCalendarDay.setDate(firstCalendarDay.getDate() - (dayOfWeek - 1))

  // Последний день календаря
  const lastCalendarDay = new Date(lastDay)
  const lastDayOfWeek = lastDay.getDay() || 7
  lastCalendarDay.setDate(lastCalendarDay.getDate() + 7 + (7 - lastDayOfWeek))

  const days = []
  const currentDay = new Date(firstCalendarDay)

  while (currentDay <= lastCalendarDay) {
    const day = new Date(currentDay)

    days.push({
      date: new Date(day),
      day: day.getDate(),
      month: day.getMonth(),
      monthName: MONTHS[day.getMonth()],
      year: day.getFullYear(),
      isCurrentMonth: day.getMonth() === month,
      isToday: isToday(day),
      isWeekend: isWeekend(day),
      isFirstDay: isFirstDay(day),
    })

    currentDay.setDate(currentDay.getDate() + 1)
  }

  return days
}

function isToday(date) {
  const today = new Date()
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  )
}

function isFirstDay(date) {
  return date.getDate() === 1
}

function isWeekend(date) {
  const day = date.getDay()
  return day === 0 || day === 6
}
