import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/preact'
import {
	CalendarEvent,
	createViewDay,
	createViewMonthAgenda,
	createViewMonthGrid,
	createViewWeek,
	viewMonthAgenda,
	viewMonthGrid,
} from '@schedule-x/calendar'
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop'

const dragAndDrop = createDragAndDropPlugin()

import '@schedule-x/theme-default/dist/index.css'
import { render } from 'preact'

function* getEvents(): Generator<CalendarEvent> {

	for (let start = new Date(), i = 0; i < 20; start.setMinutes(start.getMinutes() + 10), i++) {
		const end = new Date(start);
		end.setMinutes(end.getMinutes() + 10);

		yield {
			start: start.toDateString(),
			end: end.toDateString(),
			id: i.toString(),
			title: `Event ${i}`
		}
	}
};

function CalendarApp() {


	const calendar = useCalendarApp({
		views: [
			createViewDay(),
			createViewWeek(),
			createViewMonthGrid(),
			createViewMonthAgenda(),
		],
		defaultView: viewMonthAgenda.name,
		events: [...getEvents()],
		plugins: [dragAndDrop],
	})

	return (
		<div>
			<ScheduleXCalendar calendarApp={calendar} />
		</div>
	)
}

render(<CalendarApp />, document.getElementById('app'));


export default CalendarApp;