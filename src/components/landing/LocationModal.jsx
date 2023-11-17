const LocationModal = ({isOpen, onClose, onConfirm}) => {
	if (!isOpen) return null

	return (
		<div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
			<div className='bg-white p-4 rounded-lg shadow-lg'>
				<h2 className='text-lg font-bold'>Location Access Request</h2>
				<p className='text-gray-600'>
					Your location is requested to enhance your experience with accurate
					weather forecasts for your current location. Please click
					&apos;Allow&apos; on the next prompt to enable location services.
				</p>
				<div className='mt-4 flex justify-end'>
					<button
						className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
						onClick={onConfirm}>
						Ok, Got It!
					</button>
				</div>
			</div>
		</div>
	)
}
export default LocationModal
