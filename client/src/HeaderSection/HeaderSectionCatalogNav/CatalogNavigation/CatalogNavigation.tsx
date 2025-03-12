import './CatalogNavigation.component.css'
import { IoIosArrowDown } from "react-icons/io";
import { Link } from 'react-router-dom';

function CatalogNavigation () {
	return (
		<>
			<div className="header-main-catalog_navigation">
				<ul className="catalog-navigation_list">
					<li className="catalog-navigation_item">
						<Link to={"/"} className='catalog-navigation_link'>каталог авто
						<span><IoIosArrowDown /></span>
						</Link>
						
					</li>
					<li className="catalog-navigation_item">
						<Link to={"/"} className='catalog-navigation_link'>авто с пробегом
						<span><IoIosArrowDown /></span>
						</Link>
						
					</li>
					<li className="catalog-navigation_item">
						<Link to={"/"} className='catalog-navigation_link'>кредит и рассрочка
						<span><IoIosArrowDown /></span>
						</Link>
						
					</li>
					<li className="catalog-navigation_item">
						<Link to={"/"} className='catalog-navigation_link'>спецпредложения
						<span><IoIosArrowDown /></span>
						</Link>
						
					</li>
					<li className="catalog-navigation_item">
						<Link to={"/"} className='catalog-navigation_link'>такси в кредит
						<span><IoIosArrowDown /></span>
						</Link>
						
					</li>
				</ul>
			</div>
		</>
	)
}

export default CatalogNavigation