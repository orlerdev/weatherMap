import Weather from './Weather'
import Map from '@map/Map'
const Landing = () => {
	return (
		<div className='flex flex-row w-full h-full p-4 gap-y-1'>
			<Weather />
			<Map />
		</div>
	)
}
export default Landing
