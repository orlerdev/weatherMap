'use client'
import {useEffect, useRef} from 'react'
import useStore from '@stores/store'
import axios from 'axios'
import mapboxgl from 'mapbox-gl'
import {debounce} from '@utils/utils'

const Map = () => {
	const {lon, setLon, lat, zoom, setZoom} = useStore((state) => ({
		lon: state.lon,
		setLon: state.setLon,
		lat: state.lat,
		zoom: state.zoom,
		setZoom: state.setZoom
	}))

	const mapContainer = useRef(null)
	const map = useRef(null)

	useEffect(() => {
		if (map.current) return
		map.current = new mapboxgl.Map({
			container: mapContainer.current,
			style: 'mapbox://styles/mapbox/streets-v12',
			center: [lon, lat],
			zoom: zoom
		})

		const mapCanvas = mapContainer.current.querySelector(
			'.mapboxgl-canvas-container'
		)
		if (mapCanvas) {
			mapCanvas.style.position = 'relative'
		}

		map.current.on('move', () => {
			setLon(map.current.getCenter().lng.toFixed(4))
			setLat(map.current.getCenter().lat.toFixed(4))
			setZoom(parseFloat(map.current.getZoom().toFixed(2)))
		})
	}, [lat, lon, setLon, setZoom, zoom])
	return (
		<div className='flex flex-col flex-1 w-full h-5/6 bg-gray-500'>
			<div
				className='w-full h-full'
				ref={mapContainer}></div>
		</div>
	)
}
export default Map
