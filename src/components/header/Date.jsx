import { formatDate } from '@utils/utils'
const DateTime = () => {
	return (
		<div className='flex flex-col items-center'>
			<div className='text-4xl text-center'>{formatDate(new Date())}</div>
		</div>
	)
}
export default DateTime
