'use client'
import { formatLocation } from '@utils/utils'
import { states } from '@data/states'
import useStores from '@stores/stores'

const Location = () => {
	const { mapLocation } = useStores()
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
