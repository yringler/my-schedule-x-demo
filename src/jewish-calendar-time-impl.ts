import { signal } from "@preact/signals";
import { ConfigBase, Month, TimeUnitsImpl, WeekDay } from "@schedule-x/shared";
import { addDays } from "date-fns";
import { BasicJewishDate, calcDaysInMonth, getJewishMonthByIndex, getJewishMonthsInOrder, JewishDate, toGregorianDate, toJewishDate } from "jewish-date";

export class JewishTimeImpl extends TimeUnitsImpl {
	constructor() {
		super({ firstDayOfWeek: signal(WeekDay.SUNDAY) } as unknown as ConfigBase);
	}
	
	getMonthWithTrailingAndLeadingDays(year: number, month: Month) {
		const jewishDate:JewishDate = {
			...toJewishDate(new Date(year, month)),
			day: 1
		};
		
		const firstDateOfMonth = toGregorianDate(jewishDate);
		const daysInMonth = calcDaysInMonth(jewishDate.year, jewishDate.monthName);
		const firstDateOfNextMonth = addDays(firstDateOfMonth, daysInMonth);

		const monthWithDates = [this.getWeekFor(firstDateOfMonth)]
	
		let isInMonth = true
		let first = monthWithDates[0][0] // first day of first week of month
	
		while (isInMonth) {
		  const newFirstDayOfWeek = new Date(
			first.getFullYear(),
			first.getMonth(),
			first.getDate() + 7
		  )
	
		  if (newFirstDayOfWeek < firstDateOfNextMonth) {
			monthWithDates.push(this.getWeekFor(newFirstDayOfWeek))
			first = newFirstDayOfWeek
		  } else {
			isInMonth = false
		  }
		}
	
		return monthWithDates
	  }

	getMonthsFor(year: number): Date[] {
		const jewishYear = toJewishDate(new Date(year)).year;
		
		return getJewishMonthsInOrder(jewishYear)
			.map(monthName => (<BasicJewishDate>{
				day: 1,
				monthName: monthName,
				year: jewishYear
			})).slice(1).map(toGregorianDate);
	}
}