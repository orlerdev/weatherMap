'use client'
import useStores from '../../stores/oldStores'

const Summary = () => {
	const { weather } = useStores()
	return <h2 className='text-[1.8rem]'>{weather.daily[0].summary}</h2>
}
export default Summary
