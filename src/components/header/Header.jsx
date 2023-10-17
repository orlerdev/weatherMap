import Location from './Location'
import Date from './Date'
import Weather from './Weather'

const Header = () => {
	return (
		<div className='flex flex-row items-center justify-between w-full h-fit gap-x-4 py-2 px-10'>
			<div className='flex flex-col'>
				<div className='flex flex-row items-center'>
					<Location />
					<Weather />
				</div>
			</div>
			<Date />
		</div>
	)
}
export default Header
