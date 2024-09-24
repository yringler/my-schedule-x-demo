import { signal } from "@preact/signals";
import { ConfigBase, Month, TimeUnitsImpl, WeekDay } from "@schedule-x/shared";
import { BasicJewishDate, getGregDate, getJewishDate, getJewishMonth, getJewishMonths } from "jewish-dates-core"

export class DatesCoreTimeUnits extends TimeUnitsImpl {
	constructor() {
		super({ firstDayOfWeek: signal(WeekDay.SUNDAY) } as unknown as ConfigBase);
	}

	getMonthWithTrailingAndLeadingDays(year: number, month: Month) {
		const jewishMonth = getJewishMonth(new Date(year, month));

		const dates = jewishMonth.days.map(day => day.date);
		return chunkArray(dates, 7);
	}

	getMonthsFor(year: number): Date[] {
		const jewishYear = getJewishDate(new Date(year)).year;
		return getJewishMonths(jewishYear).map(m => <BasicJewishDate>{
			monthName: m.id,
			day: 1,
			year: jewishYear
		}).map(getGregDate);
	}
}

function chunkArray<T>(array: T[], chunkSize: number) {
	const numberOfChunks = Math.ceil(array.length / chunkSize)

	return [...Array(numberOfChunks)]
		.map((value, index) => {
			return array.slice(index * chunkSize, (index + 1) * chunkSize)
		})
}