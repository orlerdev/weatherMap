'use client'
import useStores from '@stores/stores'
import { useEffect } from 'react'
import { storage } from '@firebase/config'
import { ref, listAll, getDownloadURL } from 'firebase/storage'
import { randomNumRange, getPhotoTitle } from '@utils/utils'
import { weatherTypes } from '@data/staticWeather'

const Weather = () => {
	const { weather, weatherPhoto, setWeatherPhoto } = useStores()

	useEffect(() => {
		;(async () => {
			const title = getPhotoTitle(
				weatherTypes,
				weather.daily[0].weather[0].main
			)
			try {
				const folderRef = ref(storage, title)
				const { items } = await listAll(folderRef)
				const photoNum = randomNumRange(0, items.length - 1)
				const url = await getDownloadURL(items.at(photoNum))
				setWeatherPhoto(url)
			} catch (err) {
				console.error('Error retrieving weather photo', err.message)
			}
		})()
	}, [weather, setWeatherPhoto])
	return (
		<div
			className='flex flex-col min-w-full min-h-full p-4'
			style={{
				backgroundImage: `url(${weatherPhoto})`,
				backgroundSize: 'cover',
				backgroundRepeat: 'no-repeat',
				backgroundPosition: 'center',
				backgroundAttachment: 'fixed'
			}}></div>
	)
}
export default Weather
