import "./RedButtons.component.css"

interface RedButtonsProps {
	value?: string,
	onClick: () => void
}

function RedButtons ({value, onClick}: RedButtonsProps) {
	
return(
	<>
		<button
		type="button"
		aria-label="button"
		className="head-call_order-call"
		onClick={onclick}
		>
			{value}
		</button>
	</>
)
}

export default RedButtons