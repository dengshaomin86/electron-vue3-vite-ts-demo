<template>
  <div class="calendar">
    <div class="header">
      <el-icon :size="16" @click="prevMonth"><ArrowLeftBold /></el-icon>
      <h2 id="month-title">{{ currentMonth }}</h2>
      <el-icon :size="16" @click="nextMonth"><ArrowRightBold /></el-icon>
    </div>
    <div id="calendar">
      <div id="days">
        <div class="week" v-for="(week, weekIndex) in weeks" :key="weekIndex">
          <div :class="['day', { active: day.date === calendar.cdate }]" v-for="(day, dayIndex) in week" :key="dayIndex">
            <template v-if="day !== null">
              <div>{{ day.day }}</div>
              <div class="lunar">{{ day.lunar }}</div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import Lunar from "chinese-lunar";
import { ArrowLeftBold, ArrowRightBold } from "@element-plus/icons-vue";

interface WeekDate {
  day: number | null;
  lunar: string | null;
  date: string | null;
}

class Calendar {
  private date: Date;
  // 当前日期
  public cdate: string;

  constructor(date: Date) {
    this.date = date;
    this.cdate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }

  private getFirstDayOfMonth(): number {
    return new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay();
  }

  private getDaysInMonth(): number {
    return new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDate();
  }

  public getCalendar(): WeekDate[][] {
    const daysInMonth = this.getDaysInMonth();
    const firstDay = this.getFirstDayOfMonth();
    const weeks: WeekDate[][] = [];

    let currentWeek: WeekDate[] = Array.from({ length: firstDay }, () => ({
      day: null,
      lunar: null,
      date: null,
    }));

    for (let day = 1; day <= daysInMonth; day++) {
      const date = `${this.date.getFullYear()}-${this.date.getMonth() + 1}-${day}`;
      const lunarDate = Lunar.solarToLunar(new Date(date), "D");
      currentWeek.push({ day, lunar: lunarDate.toString(), date });

      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    }

    if (currentWeek.length > 0) {
      currentWeek = [...currentWeek, ...Array.from({ length: 7 - currentWeek.length }, () => ({ day: null, lunar: null, date: null }))];
      weeks.push(currentWeek);
    }

    return weeks;
  }

  public getCurrentMonth(): string {
    return this.date.toLocaleDateString("default", { month: "long", year: "numeric" });
  }

  public changeMonth(offset: number): void {
    this.date.setMonth(this.date.getMonth() + offset);
  }
}

const calendar = new Calendar(new Date());
const weeks = ref(calendar.getCalendar());
const currentMonth = ref(calendar.getCurrentMonth());

const prevMonth = () => {
  calendar.changeMonth(-1);
  weeks.value = calendar.getCalendar();
  currentMonth.value = calendar.getCurrentMonth();
};

const nextMonth = () => {
  calendar.changeMonth(1);
  weeks.value = calendar.getCalendar();
  currentMonth.value = calendar.getCurrentMonth();
};
</script>

<style scoped lang="scss">
.calendar {
  @include app-panel;
  padding: 8px;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 12px;
    margin-bottom: 8px;
    .el-icon {
      &:hover {
        cursor: pointer;
        color: var(--el-color-primary);
      }
    }
  }
}

.week {
  display: flex;
}

.day {
  flex: 1;
  padding: 4px 0;
  box-sizing: border-box;
  text-align: center;
  white-space: nowrap;
  font-size: 10px;
  &.active {
    color: #fff;
    background-color: var(--el-color-primary);
    .lunar {
      color: #fff;
    }
  }
}

.day:nth-child(7n) {
  border-right: none;
}

.lunar {
  font-size: 0.8em;
  color: #888;
}
</style>
