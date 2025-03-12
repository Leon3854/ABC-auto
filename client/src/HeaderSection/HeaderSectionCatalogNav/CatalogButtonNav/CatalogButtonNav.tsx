import './CatalogButtonNav.component.css'

import { IoIosHeartEmpty } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { HiOutlineChartBar } from "react-icons/hi2";

function CatalogButtonNav() {
	return(
		<>
			<div className="header-main_buttons-icons">
				<button
				className='header-button hart'
				aria-label='hart'>
					<HiOutlineChartBar className='header-icon-round'/>
					<span className='header-btn-counter hide'>10</span>
				</button>
				<button
				className='header-button heart'
				aria-label='like'>
					<IoIosHeartEmpty />
					<span className='header-btn-counter hide'>11</span>
				</button>
				<button
				className='header-button search'
				aria-label='search-btn'>
					<CiSearch />
				</button>
			</div>
		</>
	)
}

export default CatalogButtonNav