'use client'
import useStores from '@stores/store'

const Summary = () => {
	const { weather } = useStores((state) => ({
		weather: state.weather
	}))

	if (!weather) {
		return <h2 className='text-[1.8rem]'>Loading...</h2>
	}

	return <h2 className='text-[1.8rem]'>{weather.daily[0].summary}</h2>
}
export default Summary
