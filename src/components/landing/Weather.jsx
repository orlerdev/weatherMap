'use client'
import useStore from '@stores/store'
import {
	detailFormats,
	mapNameToProp,
	formatDetail,
	formatTemp
} from '@utils/utils'
import Forecast from '@forecast/Forecast'
import Detail from './Detail'

const Weather = () => {
	const {activeCard, weather, weatherPhoto} = useStore((state) => ({
		activeCard: state.activeCard,
		weather: state.weather,
		weatherPhoto: state.weatherPhoto
	}))

	if (!weather || !weatherPhoto) {
		return (
			<div className='flex flex-col justify-center flex-1 w-full h-5/6 p-12'>
				<h3 className='col-span-1'>Loading...</h3>
			</div>
		)
	}

	return (
		<div
			className={`relative flex flex-col justify-center flex-1 gap-y-4 w-full h-5/6 p-12 overflow-hidden`}>
			<Forecast />
			<div
				className='grid grid-cols-2 grid-rows-1 gap-12 justify-between text-4xl z-[3]'
				style={{textShadow: '3px 3px 2px rgba(0,0,0,.9)'}}>
				<h3 className='col-span-1'>High</h3>
				<h3 className='col-span-1'>
					{formatTemp(weather.daily[activeCard].temp.max)}
				</h3>
			</div>
			<div
				className='grid grid-cols-2 grid-rows-1 gap-12 justify-between text-4xl z-[3]'
				style={{textShadow: '3px 3px 2px rgba(0,0,0,.9)'}}>
				<h3 className='col-span-1'>Low</h3>
				<h3 className='col-span-1'>
					{formatTemp(weather.daily[activeCard].temp.min)}
				</h3>
			</div>
			{weather && weather.daily && weather.daily[activeCard] ? (
				Object.keys(detailFormats).map((name) => (
					<Detail
						key={name}
						name={name}
						value={formatDetail(
							name,
							weather.daily[activeCard][mapNameToProp(name)]
						)}
					/>
				))
			) : (
				<h3 className='col-span-1'>Loading...</h3>
			)}
			<img
				src={weatherPhoto}
				alt='Weather Photo'
				className='absolute inset-0 w-full h-full object-cover blur-sm'
			/>
			<div className='absolute inset-0 bg-gradient-to-br from-black/30 to-transparent opacity-30 bg-clip-border'></div>
		</div>
	)
}
export default Weather
