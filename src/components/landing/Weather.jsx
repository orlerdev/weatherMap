'use client'
import useStores from '@stores/stores'
import { useEffect } from 'react'
import { storage } from '@firebase/config'
import { ref, listAll, getDownloadURL } from 'firebase/storage'
import {
	randomNumRange,
	getPhotoTitle,
	detailFormats,
	mapNameToProp,
	formatDetail,
	formatTemp
} from '@utils/utils'
import { weatherTypes } from '@data/staticWeather'
import Detail from '@landing/Detail'

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
			style={{ '--image-url': `url(${weatherPhoto})` }}
			className={`relative flex flex-col justify-center flex-1 gap-y-4 w-full h-5/6 p-12`}>
			<div
				className='grid grid-cols-2 grid-rows-1 gap-12 justify-between text-4xl z-[3]'
				style={{ textShadow: '3px 3px 2px rgba(0,0,0,.9)' }}>
				<h3 className='col-span-1'>High</h3>
				<h3 className='col-span-1'>{formatTemp(weather.daily[0].temp.max)}</h3>
			</div>
			<div
				className='grid grid-cols-2 grid-rows-1 gap-12 justify-between text-4xl z-[3]'
				style={{ textShadow: '3px 3px 2px rgba(0,0,0,.9)' }}>
				<h3 className='col-span-1'>Low</h3>
				<h3 className='col-span-1'>{formatTemp(weather.daily[0].temp.min)}</h3>
			</div>
			{Object.keys(detailFormats).map((name) => (
				<Detail
					key={name}
					name={name}
					value={formatDetail(name, weather.daily[0][mapNameToProp(name)])}
				/>
			))}
			<img
				src={weatherPhoto}
				alt='Weather Photo'
				className='absolute inset-0 w-full h-full object-cover blur-sm'
			/>
			<div className='absolute inset-0 bg-gradient-to-br from-black/30 to-transparent opacity-30'></div>
		</div>
	)
}
export default Weather
