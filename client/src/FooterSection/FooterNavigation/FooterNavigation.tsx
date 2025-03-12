import "./FooterNavigation.component.css"
import { Link } from "react-router-dom"

function FooterNavigation() {
	return(
		<>
			<div className="footer-navigation">
				<ul className="footer-navigation_list">
					<li className="footer-navigation_item">
						<Link className="footer-navigation_link" to={"/"}>каталог авто</Link>
					</li>
					<li className="footer-navigation_item">
						<Link className="footer-navigation_link" to={"/"}>авто с пробегом</Link>
					</li>
					<li className="footer-navigation_item">
						<Link className="footer-navigation_link" to={"/"}>крдеит и рассрочка</Link>
					</li>
					<li className="footer-navigation_item">
						<Link className="footer-navigation_link" to={"/"}>спецпредложение</Link>
					</li>
					<li className="footer-navigation_item">
						<Link className="footer-navigation_link" to={"/"}>такси в кредит</Link>
					</li>
				</ul>
			</div>
		</>
	)
}
export default FooterNavigation