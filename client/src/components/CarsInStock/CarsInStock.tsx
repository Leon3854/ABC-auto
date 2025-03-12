import "./CarsInStock.component.css"
import { HiOutlineChartBar } from "react-icons/hi2";
import { FaRegHeart } from "react-icons/fa";
import { BsBoxSeam } from "react-icons/bs";
import { useEffect, useState } from "react";



interface CartData {
	id: number;
	createdAt: string;
	updateAt: string;
	nameModel: string;
	offer: string;
	benefit: string;
	benefitPrice: string;
	present: string;
	startPrice: string;
	startCredit: string;
	motorPower: string;
	gasoline: string;
	speed: string;
	acceleration: string;
	image: string | null;
	reserve: string;
	buy: string;
	details: string;
}

function CarsInStock ({serverUrl}: {serverUrl: string}) {

	const [cartsData, setCartsData ] = useState<CartData[]>([])
	const [currentCart, setCurrentCart] = useState(6)
	const cartsPerPage = 6 // Колличество карточек выведенных за одни клик

	useEffect(() => {
		const fetchCarts = async() => {
			try {
				const response = await fetch(`${serverUrl}/carts`);
				const data: CartData[] = await response.json();
				setCartsData(data);
			} catch(error) {
				console.log('Error fetching cartsData:', error);
			}
		}
		fetchCarts()
	}, [serverUrl])

	// Кнопка добавки следующих 6 карт с автомобилями
	const nextCarts = () => {
		setCurrentCart((prev) => Math.min(prev + cartsPerPage, cartsData.length)); // Увеличиваем на 6, но не больше общего количества
};

// Определяем текущую группу карт
const currentCarts = cartsData.slice(0, currentCart); // Берем карточки от 0 до currentCart

	return(
		<>
			<div className="wrapper-block">
				<div className="cars-in-stock_wrapper">
					<div className="cars-in-stock_box">
						<div className="cars-in-stock_title">
							<h3>Автомобили в наличии с ПТС</h3>
						</div>
						<div className="cars-in-stock_body">
							<div className="cars-in-stock_item">
								{(currentCarts.length > 0 ? (
									currentCarts.map((cart) => (
										<div className="cars-in-stock_link" key={cart.id}>
										<div className="cars-in-stock_cart-header">
											<div className="cart-header_title">
												<p>{cart.nameModel}</p>
											</div>
											<div className="cart-header_icons">
												<HiOutlineChartBar />
												<FaRegHeart />
											</div>
										</div>
										<div className="cars-in-stock_cart-body">
											<div className="cart-body_wrapper">
													<img className="cart-body_fon-img" src="./fon-cart.png" alt="fon-cart" />
												<div className="cart-body_fon">
													<div className="cart-body_offer-on-day">
														<div className="cart_offer-on-day">
															<p className="offer-day-text">{cart.offer}</p>
														</div>
														<div className="cart_benefit-on-day">
															<p>{cart.benefit}
															до {cart.benefitPrice} ₽</p>
														</div>
													</div>
													<div className="cart-body_car-in-stock">
														<img className="cart-car" src={cart.image ? cart.image : './skoda.png'} alt={cart.nameModel} />
														<ul className="cart-list_car-in-stock">
																<li className="cart-list_car-in-stock-list">
																	<div className="list-icon">
																		<BsBoxSeam className="list-icon_icon"/>
																	</div>
																	<div className="list-content">
																		<p>Оборудование в <br />
																		<span> {cart.present}</span></p>
																	</div>
																</li>
																<li className="cart-list_car-in-stock-list">
																<div className="list-icon">
																		<BsBoxSeam className="list-icon_icon"/>
																	</div>
																	<div className="list-content">
																		<p>КАСКО <br/>
																		<span>{cart.present}</span></p>
																	</div>
																</li>
																<li className="cart-list_car-in-stock-list">
																<div className="list-icon">
																		<BsBoxSeam className="list-icon_icon"/>
																	</div>
																	<div className="list-content">
																		<p>Комплект <br /> резины <br />
																		<span>{cart.present}</span></p>
																	</div>
																</li>
														</ul>
													</div>
													<div className="cart-body_price-credit">
														<div className="cart_price">
															<p>от {cart.startPrice} </p>
														</div>
														<div className="cart_credit">
															<p>Кредит <span>от {cart.startCredit}</span>
															</p>
														</div>
													</div>
													<div className="cart-body_teh-car-list">
															<ul className="teh-car_list">
																<li className="teh-car_item">
																	<img src="./motor.svg" alt="motor" />
																	<span>{cart.motorPower}</span>
																</li>
																<li className="teh-car_item">
																<img src="./colon.svg" alt="motor" />
																<span>{cart.gasoline}</span>
																</li>
																<li className="teh-car_item">
																<img src="./speed.svg" alt="motor" />
																<span>{cart.speed}</span>
																</li>
																<li className="teh-car_item">
																<img src="./secunds.svg" alt="motor" />
																<span>{cart.acceleration}</span>
																</li>
															</ul>
													</div>
												</div>
											</div>
										</div>
										<div className="cars-in-stock_cart-footer">
											<ul className="cart-footer_list">
												<li className="cart-footer_item one">
													<p>{cart.reserve}</p>
												</li>
												<li className="cart-footer_item two">
												<p>{cart.buy}</p>
												</li>
												<li className="cart-footer_item three">
												<p>{cart.details}</p>
												</li>
											</ul>
										</div>
								</div>
									))
								): (<p>Загрузка карточек автомобилей...</p>))}
							</div>
						</div>
						<div className="cars-in-stock_footer">
							<div className="cars-in-stock_footer-btn-look-more">
								<button className="stock-look-more" onClick={nextCarts}>
									Показать еще
									</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
export default CarsInStock


/*

	<div className="cars-in-stock_link">
										<div className="cars-in-stock_cart-header">
											<div className="cart-header_title">
												<p>Skoda Octavia 1.6 MPI MT Active </p>
											</div>
											<div className="cart-header_icons">
												<HiOutlineChartBar />
												<FaRegHeart />
											</div>
										</div>
										<div className="cars-in-stock_cart-body">
											<div className="cart-body_wrapper">
													<img className="cart-body_fon-img" src="./fon-cart.png" alt="fon-cart" />
												<div className="cart-body_fon">
													<div className="cart-body_offer-on-day">
														<div className="cart_offer-on-day">
															<p className="offer-day-text">Предложение дня</p>
														</div>
														<div className="cart_benefit-on-day">
															<p>Выгода
															до 300 000 ₽</p>
														</div>
													</div>
													<div className="cart-body_car-in-stock">
														<img className="cart-car" src="./cart-car.png" alt="car-cart" />
														<ul className="cart-list_car-in-stock">
																<li className="cart-list_car-in-stock-list">
																	<div className="list-icon">
																		<BsBoxSeam className="list-icon_icon"/>
																	</div>
																	<div className="list-content">
																		<p>Оборудование в <br />
																		<span> подарок</span></p>
																	</div>
																</li>
																<li className="cart-list_car-in-stock-list">
																<div className="list-icon">
																		<BsBoxSeam className="list-icon_icon"/>
																	</div>
																	<div className="list-content">
																		<p>КАСКО <br/>
																		<span>в подарок</span></p>
																	</div>
																</li>
																<li className="cart-list_car-in-stock-list">
																<div className="list-icon">
																		<BsBoxSeam className="list-icon_icon"/>
																	</div>
																	<div className="list-content">
																		<p>Комплект <br /> резины <br />
																		<span>в подарок</span></p>
																	</div>
																</li>
														</ul>
													</div>
													<div className="cart-body_price-credit">
														<div className="cart_price">
															<p>от 1 615 000 ₽ </p>
														</div>
														<div className="cart_credit">
															<p>Кредит <span>от 115 000 
																₽/мес.</span>
															</p>
														</div>
													</div>
													<div className="cart-body_teh-car-list">
															<ul className="teh-car_list">
																<li className="teh-car_item">
																	<img src="./motor.svg" alt="motor" />
																	<span>115л.с</span>
																</li>
																<li className="teh-car_item">
																<img src="./colon.svg" alt="motor" />
																<span>5.3 л/км</span>
																</li>
																<li className="teh-car_item">
																<img src="./speed.svg" alt="motor" />
																<span>189 км/ч</span>
																</li>
																<li className="teh-car_item">
																<img src="./secunds.svg" alt="motor" />
																<span>10,3 c.</span>
																</li>
															</ul>
													</div>
												</div>
											</div>
										</div>
										<div className="cars-in-stock_cart-footer">
											<ul className="cart-footer_list">
												<li className="cart-footer_item one">
													<p>Резерв онлайн</p>
												</li>
												<li className="cart-footer_item two">
												<p>Купить</p>
												</li>
												<li className="cart-footer_item three">
												<p>Подробнее</p>
												</li>
											</ul>
										</div>
								</div>

*/