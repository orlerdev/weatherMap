import Image from 'next/image'
import useStore from '@stores/store'
import { formatTemp } from '@utils/utils'

const DayNight = () => {
	const { weatherIcon, weather } = useStore((state) => ({
		weatherIcon: state.weatherIcon,
		weather: state.weather
	}))

	if (!weatherIcon || !weather) {
		return (
			<div className='flex flex-col justify-center flex-1 w-full p-12'>
				<h3>Loading...</h3>
			</div>
		)
	}

	return (
		<>
			<div className='flex flex-row flex-1 justify-between items-center w-full'>
				<div className='flex flex-row items-center'>
					<Image
						className='object-contain -mr-3'
						src={weatherIcon}
						alt='Weather Icon Image'
						width={100}
						height={100}
					/>
					<h2 className='text-4xl'>{formatTemp(weather.daily[0].temp.day)}</h2>
				</div>
				<p className='text-3xl'>{weather.daily[0].weather[0].description}</p>
			</div>
			<div className='flex flex-row flex-1 justify-between items-center w-full'>
				<div className='flex flex-row items-center'>
					<Image
						className='object-contain -mr-3'
						src={weatherIcon}
						alt='Weather Icon Image'
						width={100}
						height={100}
					/>
					<h2 className='text-4xl'>
						{formatTemp(weather.daily[0].temp.night)}
					</h2>
				</div>
				<p className='text-3xl'>{weather.daily[0].weather[0].description}</p>
			</div>
		</>
	)
}
export default DayNight
