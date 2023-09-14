import React, { useContext, useEffect, useState } from 'react'
import { DayPicker } from 'react-day-picker'
import { format } from 'date-fns'
import { AuthContext } from '../../contexts'
import { ExerChart } from './ExerChart'

export const Statistics: React.FC = () => {
	const { globalDate, setGlobalDate, stats, getStats } = useContext(AuthContext)
	const [selectedDate, setSelectedDate] = useState(globalDate)
	const [update, setUpdate] = useState(0)

	function _buildGraphs() {
		let graphs = []
		for (let index = 0; index < stats.length; index++) {
			const element = stats[index]
			graphs.push(<ExerChart key={stats.indexOf(element) + 1} index={stats.indexOf(element)} />)
		}
		return graphs
	}

	useEffect(() => {
		setGlobalDate(format(new Date(), 'yyyy-MM-dd'))
		getStats()
		setSelectedDate(globalDate)
	}, [])

	useEffect(() => {
		getStats()
	}, [update])

	useEffect(() => {
		const timer = setInterval(() => {
			setUpdate(update + 1)
		}, 60000)
		return () => clearInterval(timer)
	}, [update])

	return (
		<div>
			{/* {signedIn === false ? (
        <div style={textBasic}>
          Please, sign in to see statistics and check your rehabilitation
          progress...
        </div>
      ) : (
        <> */}
			<div style={textBasic}>
				Here, you can check your progress. Pick a date to see your exercises statistics for that specific day.
			</div>

			<div id="date-graphs-wrapper" /*style={divDateGraphWrapper}*/>
				<DayPicker
					modifiersStyles={dayPicker}
					mode="single"
					required
					selected={selectedDate}
					onSelect={date => {
						if (date) {
							setSelectedDate(date)
							setGlobalDate(format(date, 'yyyy-MM-dd'))
						}
					}}
				/>
				<div style={{ display: 'flex', flexDirection: 'row', paddingLeft: 30 }}>{_buildGraphs()}</div>
			</div>
			{/* </>
      )} */}
		</div>
	)
}

// style objects here:

const divDateGraphWrapper = {
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'flex-start',
}

const dayPicker = {
	caption: { color: '#845ec2' },
	today: { color: '#c0272c' },
	selected: {
		color: '#845ec2',
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
