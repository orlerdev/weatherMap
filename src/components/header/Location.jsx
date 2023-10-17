import { formatLocation } from '@utils/utils'
import { states } from '@data/states'

const Location = () => {
	const formattedLocation = formatLocation('San Antonio, Texas', states)
	return (
		<div className='flex flex-row items-center justify-start h-full text-5xl pr-8 border-r'>
			{formattedLocation}
		</div>
	)
}
export default Location
