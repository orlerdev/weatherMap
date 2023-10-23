'use client'
import useStore from '@stores/store'
import ForecastCard from './ForecastCard'

const Forecast = () => {
	const {weather, forecastDT} = useStore((state) => ({
		weather: state.weather,
		forecastDT: state.forecastDT
	}))

	if (!weather || !forecastDT) {
		return <div>Loading...</div>
	}

	return (
		<div className='grid grid-cols-5 grid-rows-1 w-full h-1/6 z-[3] place-items-center mb-6 rounded-md bg-clip-border divide-x'>
			{forecastDT &&
				forecastDT.length > 0 &&
				forecastDT.map((dt, idx) => (
					<ForecastCard
						key={dt}
						unix={dt}
						cardNumber={idx}
					/>
				))}
		</div>
	)
}
export default Forecast
