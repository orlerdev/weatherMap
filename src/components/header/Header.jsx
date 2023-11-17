import Location from './Location'
import Date from './Date'
import Weather from './Weather'
import Summary from './Summary'

const Header = () => {
	return (
		<div className='flex flex-row items-center justify-between w-full h-fit gap-x-4 py-2 px-10 backdrop-brightness-75 backdrop-blur-sm '>
			<div className='flex flex-col'>
				<div className='flex flex-row items-center'>
					<Location />
					<Weather />
				</div>
			</div>
			<Summary />
			<Date />
		</div>
	)
}
export default Header
