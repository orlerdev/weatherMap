'use client'
import useStore from '@stores/store'
import axios from 'axios'
import mapboxgl from 'mapbox-gl'
import { debounce } from '@utils/utils'

const Map = () => {
	const mapContainer = useRef(null)
	const map = useRef(null)

	return (
		<div className='flex flex-col flex-1 w-full h-5/6 bg-gray-500'>
			<div
				className='w-full h-full'
				ref={mapContainer}></div>
		</div>
	)
}
export default Map
