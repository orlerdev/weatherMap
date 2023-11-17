const Detail = ({name, value}) => {
	return (
		<div
			className='grid grid-cols-2 grid-rows-1 gap-12 justify-between text-3xl z-[3]'
			style={{textShadow: '3px 3px 2px rgba(0,0,0,.9)'}}>
			<h3 className='col-span-1'>{name}</h3>
			<h3 className='col-span-1'>{value}</h3>
		</div>
	)
}
export default Detail
