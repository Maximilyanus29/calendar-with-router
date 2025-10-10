<script setup>
import { useGenerateCalendar } from '@/composables/Calendar/calendar.js'
import { useGetAttaks } from '@/composables/Calendar/attacks.js'

// const WEEKDAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
const calendarDays = useGenerateCalendar(new Date())
const attacks = useGetAttaks()

calendarDays.forEach((element) => {
  element.attaсks = attacks
})

console.log(calendarDays)
</script>

<template>
  <div class="calendar">
    <!-- Навигация -->
    <!-- <div v-if="showNavigation" class="calendar-header">
      <button
        class="nav-button"
        @click="navigateMonth(-1)"
        aria-label="Предыдущий месяц"
      >
        ←
      </button>

      <h2 class="calendar-title">
        {{ calendarTitle }}
      </h2>

      <button
        class="nav-button"
        @click="navigateMonth(1)"
        aria-label="Следующий месяц"
      >
        →
      </button>
    </div> -->

    <!-- Кнопка "Сегодня" -->
    <!-- <div v-if="showNavigation" class="calendar-today">
      <button @click="goToToday" class="today-button">
        Сегодня
      </button>
    </div> -->

    <!-- Дни недели -->
    <!-- <div class="weekdays">
      <div
        v-for="weekday in WEEKDAYS"
        :key="weekday"
        class="weekday"
        :class="{ weekend: ['Сб', 'Вс'].includes(weekday) }"
      >
        {{ weekday }}
      </div>
    </div> -->

    <!-- Дни календаря -->
    <div class="calendar-grid">
      <div
        v-for="(day, index) in calendarDays"
        :key="index"
        class="calendar-day"
        :class="{
          'other-month': !day.isCurrentMonth,
          // 'other-month': !day.isCurrentMonth && showOtherMonths,
          today: day.isToday && highlightToday,
          weekend: day.isWeekend,
        }"
        @click="false"
        :aria-current="day.isToday ? 'date' : null"
      >
        <span class="day-number">{{ day.day }}</span>
        <!-- <span class="month-name" v-if="isFirstDay(day.date)">{{ day.monthName }}</span> -->

        <div v-for="(attack, index) in day.attacks" :key="index">{{ attack.start }}</div>

        <!-- <div class="attack" :class="attackClassList">attack</div> -->

        <!-- Индикатор событий (можно заменить реальными данными) -->
        <!-- <div v-if="day.isCurrentMonth" class="day-events">
          <span
            v-if="day.day % 3 === 0"
            class="event-dot"
            :class="day.day % 6 === 0 ? 'event-important' : 'event-normal'"
          ></span>
        </div> -->
      </div>
    </div>
  </div>
</template>

<style scoped>
.weekdays {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  /* gap: 4px; */
}
.weekdays .weekday {
  text-align: right;
  font-size: 12px;
  padding: 0 2px;
}
.calendar-grid {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  /* gap: 4px; */
}
.calendar-grid .calendar-day {
  border: 1px solid silver;
  position: relative;
  background-color: rgb(240, 240, 240);
}
.calendar-grid .calendar-day.weekend {
  color: red;
}
.calendar-grid .calendar-day.today {
  color: blue;
}
.calendar-grid .calendar-day.other-month {
  background-color: rgb(225, 225, 225);
}

.calendar-grid .calendar-day .attack {
  position: absolute;
  background-color: #ff7070;
  height: 100%;
  top: 0;
  width: 100%;
}

.calendar-grid .calendar-day .attack-start {
  border-top-left-radius: 7%;
  border-bottom-left-radius: 7%;
}
.calendar-grid .calendar-day .attack-end {
  border-top-right-radius: 7%;
  border-bottom-right-radius: 7%;
}

/*

.calendar {
  max-width: 400px;
  margin: 0 auto;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.calendar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  padding: 0 8px;
}

.calendar-title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
}

.nav-button {
  padding: 8px 12px;
  border: none;
  background: #f8fafc;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s;
}

.nav-button:hover {
  background: #e2e8f0;
}

.calendar-today {
  margin-bottom: 16px;
  text-align: center;
}

.today-button {
  padding: 8px 16px;
  border: 1px solid #d1d5db;
  background: white;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.2s;
}

.today-button:hover {
  background: #f9fafb;
  border-color: #9ca3af;
}

.weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  margin-bottom: 8px;
}

.weekday {
  text-align: center;
  font-size: 0.875rem;
  font-weight: 500;
  color: #6b7280;
  padding: 8px;
}

.weekday.weekend {
  color: #ef4444;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
}

.calendar-day {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 48px;
  padding: 4px;
  border: 2px solid transparent;
  background: white;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.875rem;
}

.calendar-day:hover {
  background: #f8fafc;
  border-color: #e2e8f0;
}

.calendar-day.current-month {
  color: #1f2937;
}

.calendar-day.other-month {
  color: #9ca3af;
  opacity: 0.5;
}

.calendar-day.today {
  border-color: #3b82f6;
  background: #dbeafe;
}

.calendar-day.selected {
  background: #3b82f6;
  color: white;
  border-color: #2563eb;
}

.calendar-day.weekend:not(.selected) {
  color: #ef4444;
}

.calendar-day:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.calendar-day.selected .event-dot {
  background: white;
}

.day-number {
  font-weight: 500;
  margin-bottom: 2px;
}

.day-events {
  display: flex;
  justify-content: center;
  height: 4px;
}

.event-dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #3b82f6;
}

.event-dot.event-important {
  background: #ef4444;
}

@media (max-width: 480px) {
  .calendar {
    max-width: 100%;
    padding: 8px;
  }

  .calendar-day {
    height: 40px;
    font-size: 0.75rem;
  }

  .calendar-title {
    font-size: 1.125rem;
  }
}
  */
</style>
