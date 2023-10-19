'use client'
import useStores from '@stores/stores'
import axios from 'axios'
import mapboxgl from 'mapbox-gl'
import { useEffect, useRef, useState } from 'react'
import { debounce } from '@utils/utils'

const Map = () => {
	const { lon, setLon, lat, setLat, zoom, setZoom } = useStores()
	const [initialLoad, setInitialLoad] = useState(true)
	const mapContainer = useRef(null)
	const map = useRef(null)

	const handleMapMove = debounce(() => {
		const newLon = parseFloat(map.current.getCenter().lng.toFixed(4))
		const newLat = parseFloat(map.current.getCenter().lat.toFixed(4))
		const newZoom = parseFloat(map.current.getZoom().toFixed(2))

		if (newLon !== lon || newLat !== lat || newZoom !== zoom) {
			setLon(newLon)
			setLat(newLat)
			setZoom(newZoom)
		}

		console.log('Lon and Lat set:', lon, lat)
	}, 200)

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

				map.current.on('move', handleMapMove)
			} catch (err) {
				console.error('Error fetching Mapbox token:', err)
				return null
			}
		})()

		return () => {
			if (map.current) {
				map.current.off('move', handleMapMove)
			}
		}
	})

	return (
		<div className='flex flex-col flex-1 w-full h-5/6 bg-gray-500'>
			<div
				className='w-full h-full'
				ref={mapContainer}></div>
		</div>
	)
}
export default Map
