'use client'
import {useEffect, useRef} from 'react'
import useStore from '@stores/store'
import axios from 'axios'
import mapboxgl from 'mapbox-gl'
// DEBOUNCE FUNCTION NEEDED

const Map = () => {
	const {lon, setLon, lat, setLat, zoom, setZoom, setError} = useStore(
		(state) => ({
			lon: state.lon,
			setLon: state.setLon,
			lat: state.lat,
			setLat: state.setLat,
			zoom: state.zoom,
			setZoom: state.setZoom,
			setError: state.setError
		})
	)

	const mapContainer = useRef(null)
	const map = useRef(null)

	useEffect(() => {
		;(async () => {
			try {
				const res = await axios.get(
					'https://us-central1-weathermap-90bca.cloudfunctions.net/api/getMapboxToken'
				)
				if (res.data.token) {
					mapboxgl.accessToken = res.data.token
				}

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

				map.current.on('dragend', () => {
					console.log('Dragging ended.')
					setLon(map.current.getCenter().lng.toFixed(4))
					setLat(map.current.getCenter().lat.toFixed(4))
					setZoom(parseFloat(map.current.getZoom().toFixed(2)))
				})
			} catch (err) {
				console.error(err)
				setError(err)
			}
		})()
	}, [lat, setLat, lon, setLon, setZoom, zoom, setError])

	return (
		<div className='flex flex-col flex-1 w-full h-5/6 bg-gray-500'>
			<div
				className='w-full h-full'
				ref={mapContainer}></div>
		</div>
	)
}
export default Map
