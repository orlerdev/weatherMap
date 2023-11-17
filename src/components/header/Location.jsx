'use client'
import useStore from '@stores/store'

const Location = () => {
	const { mapLocation } = useStore((state) => ({
		mapLocation: state.mapLocation
	}))

	if (!mapLocation) {
		return (
			<div className='flex flex-row items-center justify-start h-full text-5xl pr-8 border-r'>
				Loading...
			</div>
		)
	}

	return (
		<div className='flex flex-row items-center justify-start h-full text-5xl pr-8 border-r'>
			{mapLocation}
		</div>
	)
}
export default Location
