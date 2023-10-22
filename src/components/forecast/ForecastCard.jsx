import { formatForecastDate } from '@utils/utils'
const ForecastCard = ({ unix }) => {
	return (
		<div
			style={{ textShadow: '3px 3px 2px rgba(0,0,0,.9)' }}
			className='col-span-1 text-center bg-gray-50/30 backdrop-blur-sm p-6 w-full rounded-sm'>
			{formatForecastDate(unix)}
		</div>
	)
}
export default ForecastCard
