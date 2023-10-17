import Image from 'next/image'
import useStores from '@stores/stores'
import { formatTemp } from '@utils/utils'

const DayNight = () => {
	const { weatherIcon } = useStores()
	return (
		<div className='grid grid-cols-3 grid-rows-1 gap-x-1 w-full h-1/4 p-1'>
			<Image
				className='object-contain -mr-3'
				src={weatherIcon}
				alt='Weather Icon Image'
				width={100}
				height={100}
			/>
			<h2 className='text-4xl'>{formatTemp(weather.daily[0].temp.max)}</h2>
			<p className='text-3xl'>{weather.daily[0].weather[0].description}</p>
		</div>
	)
}
export default DayNight
