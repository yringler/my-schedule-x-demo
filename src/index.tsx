import { useCalendarApp, ScheduleXCalendar  } from '@schedule-x/preact'
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
		views: [createViewMonthGrid(), viewMonthAgenda, viewWeek, viewDay],
		selectedDate: '2023-12-01',
		defaultView: viewMonthGrid.name,
		events: [
			{
				id: 6,
				title: 'Other appointment',
				people: ['Susan', 'Mike'],
				start: '2023-12-03 03:00',
				end: '2023-12-03 04:00'
			},
			{
				id: 7,
				title: 'Other appointment a',
				people: ['Susan', 'Mike'],
				start: '2023-12-03 03:00',
				end: '2023-12-05 04:00'
			},
			{
				id: 8,
				title: 'Other appointment b',
				people: ['Susan', 'Mike'],
				start: '2023-12-03 05:00',
				end: '2023-12-03 06:00'
			},
			{
				id: 9,
				title: 'Other appointment',
				people: ['Susan', 'Mike'],
				start: '2023-12-03 07:00',
				end: '2023-12-03 08:00'
			},
			{
				id: 10,
				title: 'Other appointment a',
				people: ['Susan', 'Mike'],
				start: '2023-12-03 09:00',
				end: '2023-12-03 010:00'
			},
			{
				id: 11,
				title: 'Other appointment b',
				people: ['Susan', 'Mike'],
				start: '2023-12-03 11:00',
				end: '2023-12-03 12:00'
			}
		],
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