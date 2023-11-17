'use client'
import useStore from '@stores/store'
import {formatForecastDate} from '@utils/utils'
const ForecastCard = ({unix, cardNumber}) => {
	const {activeCard, setActiveCard} = useStore((state) => ({
		activeCard: state.activeCard,
		setActiveCard: state.setActiveCard
	}))

	const handleClick = () => {
		setActiveCard(cardNumber)
	}

	const isActive = activeCard === cardNumber
	const activeBg = isActive ? 'bg-gray-50/70' : 'bg-gray-50/30'
	const activeZ = isActive ? 'z-[5]' : ''
	const activeScale = isActive ? 'scale-110' : ''

	return (
		<div
			onClick={handleClick}
			style={{textShadow: '3px 3px 2px rgba(0,0,0,.9)'}}
			className={`col-span-1 text-center  hover:bg-gray-50/50 ${activeBg} backdrop-blur-sm p-2 w-full rounded-lg cursor-pointer hover:scale-110 ${activeScale} ${activeZ} hover:z-[5]`}>
			{formatForecastDate(unix)}
		</div>
	)
}
export default ForecastCard
