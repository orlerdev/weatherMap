'use client'
import { useEffect } from 'react'
import useStores from '@stores/store'
import Image from 'next/image'
import { formatTemp } from '@utils/utils'

const Weather = () => {
	const { weather, weatherIcon } = useStores()

	useEffect(() => {
		useStores.subscribe((state) => state.weather)
	}, [])

	return (
		<div className='flex flex-row justify-center items-center'>
			<Image
				className='object-contain -mr-3'
				src={weatherIcon}
				alt='Weather Condition Icon'
				width={100}
				height={100}
			/>
			<h2 className='text-4xl'>{formatTemp(weather.hourly[0].temp)}</h2>
		</div>
	)
}
export default Weather
