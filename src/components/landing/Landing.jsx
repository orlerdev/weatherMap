import {useState} from 'react'
import Weather from './Weather'
import Map from '@map/Map'
import LocationModal from './LocationModal'

const Landing = () => {
	const [isModalOpen, setIsModalOpen] = useState(true)

	const handleModalClose = () => {
		setIsModalOpen(false)
	}

	const handleLocationPermission = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					console.log(position)
					handleModalClose()
				},
				(error) => {
					console.log(error)
					handleModalClose()
				}
			)
		}

		return (
			<div className='flex flex-row w-full h-full p-4 gap-y-1'>
				<LocationModal
					isOpen={isModalOpen}
					onClose={handleModalClose}
					onConfirm={handleLocationPermission}
				/>
				<Weather />
				<Map />
			</div>
		)
	}
}
export default Landing
