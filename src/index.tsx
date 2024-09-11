import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/preact'
import {
	CalendarEvent,
	createViewDay,
	createViewMonthAgenda,
	createViewMonthGrid,
	createViewWeek,
	viewDay,
	viewMonthAgenda,
	viewMonthGrid,
	viewWeek,
} from '@schedule-x/calendar'
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop'

const dragAndDrop = createDragAndDropPlugin()

import '@schedule-x/theme-default/dist/index.css'
import { render } from 'preact'

function* getEvents(): Generator<CalendarEvent> {

	for (let start = new Date('2023-12-01'), i = 0; i < 20; start.setMinutes(start.getMinutes() + 10), i++) {
		const end = new Date(start);
		end.setMinutes(end.getMinutes() + 10);

		yield {
			start: `${start.getFullYear()}-${start.getMonth()}-${start.getDate()} ${start.toTimeString().split(' ')[0]}`,
			end: `${end.getFullYear()}-${end.getMonth()}-${end.getDate()} ${end.toTimeString().split(' ')[0]}`,
			id: i.toString(),
			title: `Event ${i}`
		}
	}
};

function CalendarApp() {


	const calendar = useCalendarApp({
		views: [viewMonthGrid, viewMonthAgenda, viewWeek, viewDay],
		selectedDate: '2023-12-01',
		defaultView: viewWeek.name,
		events: Array.from(getEvents()),
		calendars: {
		  leisure: {
			colorName: 'leisure',
			lightColors: {
			  main: '#1c7df9',
			  container: '#d2e7ff',
			  onContainer: '#002859',
			},
			darkColors: {
			  main: '#c0dfff',
			  onContainer: '#dee6ff',
			  container: '#426aa2',
			},
		  },
		},
	})

	return (
		<div>
			<ScheduleXCalendar calendarApp={calendar} />
		</div>
	)
}

render(<CalendarApp />, document.getElementById('app'));


export default CalendarApp;