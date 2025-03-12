import "./routes.js"
import "./BreadCrumbs.component.css"
import { RiArrowRightSLine } from "react-icons/ri"
import { Link, useLocation } from "react-router-dom"

const BreadCrumbs = () => {
	const routes = [
		{ path: '/', name: 'Главная' },
		{ path: '/choice-car', name: 'Выбор автомобиля' },
		{ path: '/about-company', name: 'О компании' },
		{ path: '/service-center', name: 'Сервисный центр' },
		{ path: '/reviews', name: 'Отзывы' },
		{ path: '/contacts', name: 'Контакты' },
	];

	const location = useLocation();
	const pathnames = location.pathname.split('/').filter(x => x);

	return (
		<div className="bread-crumbs">
			<div className="wrapper-block">
				<div className="bread-crumbs-nuv">
					<ul>
						<li className="bread-crumbs-item">
							<Link to="/" className="bread-crumbs-link">Главная</Link>
						</li>
						{pathnames.map((pathname, index) => {
							const routePath = `/${pathnames.slice(0, index + 1).join('/')}`;
							const route = routes.find(r => r.path === routePath);
							return (
								route && (
									<li className="bread-crumbs-item" key={routePath}>
										<Link to={routePath} className="bread-crumbs-link">
											{route.name}
										</Link>
										{/* Добавляем стрелку только если это не последний элемент */}
										{index < pathnames.length - 1 && (
											<span className="arrow-icon"><RiArrowRightSLine /></span>
										)}
									</li>
								)
							);
						})}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default BreadCrumbs;