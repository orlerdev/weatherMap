'use client'
import useStore from '@stores/store'
import {
	detailFormats,
	mapNameToProp,
	formatDetail,
	formatTemp
} from '@utils/utils'
import Detail from '@landing/Detail'

const Weather = () => {
	const { weather, weatherPhoto } = useStore((state) => ({
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
			style={{ '--image-url': `url(${weatherPhoto})` }}
			className={`relative flex flex-col justify-center flex-1 gap-y-4 w-full h-5/6 p-12`}>
			<div
				className='grid grid-cols-2 grid-rows-1 gap-12 justify-between text-4xl z-[3]'
				style={{ textShadow: '3px 3px 2px rgba(0,0,0,.9)' }}>
				<h3 className='col-span-1'>High</h3>
				<h3 className='col-span-1'>{formatTemp(weather.daily[0].temp.max)}</h3>
			</div>
			<div
				className='grid grid-cols-2 grid-rows-1 gap-12 justify-between text-4xl z-[3]'
				style={{ textShadow: '3px 3px 2px rgba(0,0,0,.9)' }}>
				<h3 className='col-span-1'>Low</h3>
				<h3 className='col-span-1'>{formatTemp(weather.daily[0].temp.min)}</h3>
			</div>
			{weather && weather.daily && weather.daily[0] ? (
				Object.keys(detailFormats).map((name) => (
					<Detail
						key={name}
						name={name}
						value={formatDetail(name, weather.daily[0][mapNameToProp(name)])}
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
			<div className='absolute inset-0 bg-gradient-to-br from-black/30 to-transparent opacity-30'></div>
		</div>
	)
}
export default Weather
