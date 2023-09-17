import React, { useContext, useEffect, useState } from 'react'
import { DayPicker } from 'react-day-picker'
import format from 'date-fns/format'
import { AuthContext } from '../../contexts'
import { ExerChart } from './ExerChart'

const AUTO_REFRESH_TIME = 60_000

export const Statistics: React.FC = () => {
	const { globalDate, setGlobalDate, stats, getStats } = useContext(AuthContext)
	const [update, setUpdate] = useState(0)

	function _buildGraphs() {
		const graphs = []
		for (let index = 0; index < stats.length; index++) {
			const element = stats[index]
			graphs.push(<ExerChart key={stats.indexOf(element) + 1} index={stats.indexOf(element)} />)
		}
		return graphs
	}

	useEffect(() => {
		getStats()
	}, [])

	useEffect(() => {
		getStats()

		const timer = setInterval(() => {
			setUpdate(update + 1)
		}, AUTO_REFRESH_TIME)
		return () => clearInterval(timer)
	}, [update])

	return (
		<div>
			<div style={textBasic}>
				<p>Here, you can check your progress.</p>
				<p>Pick a date to see your statistics for that specific day.</p>
			</div>

			<div className="flex gap-4">
				<DayPicker
					footer={<p className="p-2 font-bold">{format(globalDate, 'yyyy-MM-dd')}</p>}
					modifiersStyles={dayPicker}
					mode="single"
					required
					selected={globalDate}
					onSelect={date => {
						if (date) {
							setGlobalDate(date)
						}
					}}
				/>
				<div className="flex">{_buildGraphs()}</div>
			</div>
		</div>
	)
}

// style objects here:

const dayPicker = {
	caption: { color: '#845ec2' },
	today: { color: '#c0272c' },
	selected: {
		color: '#white',
	},
	alignItems: 'center',
	flex: 1,
	justifyContent: 'center',
}

const textBasic = {
	fontSize: 'Sora',
	fontWeight: 'normal',
	color: '#333',
	padding: 20,
	paddingTop: 30,
}
