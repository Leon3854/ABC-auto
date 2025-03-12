import "./FooterContactsCity.component.css"
import { FaPhone } from "react-icons/fa6";
import { GoClock } from "react-icons/go";
import { HiLocationMarker } from "react-icons/hi";
import { Link } from "react-router-dom";

function FooterContactsCity () {
	return(
		<>
			<div className="footer-contacts-city">
				<div className="footer-contacts-city_main-title">
					<h3 className="footer-contacts-city_title">
						Контакты
					</h3>
				</div>
				<div className="footer-contacts-city_body">
					<div className="footer-contacts-city_numbers-phones">
						<div className="footer-contacts-city_icons-path">
							<div className="phone-icon">
								<FaPhone />
							</div>
						</div>
						<div className="footer-contacts-city_content">
						<p>+7 (800) 551-94-31</p>
						<p>+7 (495) 292-18-67</p>
						</div>
					</div>
					<div className="footer-contacts-city_works-day">
						<div className="footer-contacts-city_works_icon">
							<div className="work-icon">
								<GoClock />
							</div>
						</div>
						<div className="footer-contacts-city_working-content">
							<p>Ежедневно с 08:00 до 21:00</p>
						</div>
					</div>
					<div className="footer-contacts-city_local-address-maps">
						<div className="footer-contacts-city_local-address-icon">
							<div className="local-icon">
							<HiLocationMarker />
							</div>
						</div>
						<div className="footer-contacts-city_local-address-content">
							<p>
							Россия, Москва, 38КМ МКАД, 6Бс1
							<Link to={"/"} className="shema-go">Схема проезда</Link>
							</p>
						</div>
					</div>
					<div className="footer-contacts-city_select-box">
						<div className="footer-contacts-city_select-wrapper">
							<select className="footer-contacts-city_select" aria-label="Select City">
								<option value="Москва" selected>Москва</option>
								<option value="1">Питербург</option>
								<option value="2">Самара</option>
								<option value="3">Тверь</option>
							</select>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
export default FooterContactsCity