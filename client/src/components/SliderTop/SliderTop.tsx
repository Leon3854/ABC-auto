import { useEffect, useState } from "react";
import "./SliderTop.component.css"
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";

// Определяем интерфейс для слайдов
interface Slide {
	id: number;
	createdAt: string;
	updateAt: string;
	title: string;
	text: string;
	filePath: string | null;
	sliderId: number;
}


function SliderTop({serverUrl}: { serverUrl: string }) {

	const [slides, setSlides] = useState<Slide[]>([])
	const [currentSlide, setCurrentSlide] = useState(0)

	useEffect(() => {
		const fetchSlides = async() => {
			try{
				const response = await fetch(`${serverUrl}/slides/sliderId/1`)
				const data: Slide[] = await response.json()
				setSlides(data)
			}catch(error) {
				console.log('Error fetching slides:', error)
			}
		}
		fetchSlides()
	},[serverUrl])

	const nextSlide = () => {
		setCurrentSlide((prev) => (prev + 1) % slides.length)
	}

	const prevSlide = () => {
		setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
	}

	return(
		<>
			<div className="slider-top_wrapper">
				<div className="slider-top_box">
						<div className="slider-top_box-slides">
							{slides.map((slide, index) => (
							<div className={`slider-top_slide ${index === currentSlide ? 'active' : ''}`} key={slide.id}>
							<div className="slider-top_slide-content">
									<div className="slide-content-block">
											<div className="slide-text-btn">
													<div className="red-title-offer">
															<div className="red-offer-text">
																	{slide.text}
															</div>
													</div>
													<div className="main-title-slide">
															<h3>{slide.title}</h3>
													</div>
													<div className="offer-for-you">
															<button className="price-for-you">Узнай свою цену!</button>
													</div>
											</div>
									</div>
							</div>
					</div>	
							))}
								{/* <div className="slider-top_slide active">
										<div className="slider-top_slide-content">
												<div className="slide-content-block">
														<div className="slide-text-btn">
																<div className="red-title-offer">
																		<div className="red-offer-text">
																				Осталось всего 10 машин!
																		</div>
																</div>
																<div className="main-title-slide">
																		<h3>Грандиозная распродажа тестового парка!</h3>
																</div>
																<div className="offer-for-you">
																		<button className="price-for-you">Узнай свою цену!</button>
																</div>
														</div>
												</div>
										</div>
								</div>
								<div className="slider-top_slide">
										<div className="slider-top_slide-content">
												<div className="slide-content-block">
														<div className="slide-text-btn">
																<div className="red-title-offer">
																		<div className="red-offer-text">
																				Осталось всего 5 машин!
																		</div>
																</div>
																<div className="main-title-slide">
																		<h3>Специальное предложение на автомобили!</h3>
																</div>
																<div className="offer-for-you">
																		<button className="price-for-you">Скидка на цену!</button>
																</div>
														</div>
												</div>
										</div>
								</div>
								<div className="slider-top_slide">
										<div className="slider-top_slide-content">
												<div className="slide-content-block">
														<div className="slide-text-btn">
																<div className="red-title-offer">
																		<div className="red-offer-text">
																				Дополнительно опции 3 на выбор!
																		</div>
																</div>
																<div className="main-title-slide">
																		<h3>Купите сейча и Мы Вам добавив дополнительно!</h3>
																</div>
																<div className="offer-for-you">
																		<button className="price-for-you">Узнай свою цену!</button>
																</div>
														</div>
												</div>
										</div>
								</div>
								<div className="slider-top_slide">
										<div className="slider-top_slide-content">
												<div className="slide-content-block">
														<div className="slide-text-btn">
																<div className="red-title-offer">
																		<div className="red-offer-text">
																				 1 Комплетк тех поддержки!
																		</div>
																</div>
																<div className="main-title-slide">
																		<h3>Поддержка на дарогах! В любом регионе страны!</h3>
																</div>
																<div className="offer-for-you">
																		<button className="price-for-you">Узнай предложение!</button>
																</div>
														</div>
												</div>
										</div>
								</div> */}
								{/* <!-- Добавьте дополнительные слайды аналогично --> */}
						</div>
						<div className="slider-controls">
								<button className="slider-control prev" onClick={prevSlide}><GrFormPrevious /></button>
								<button className="slider-control next" onClick={nextSlide}><GrFormNext /></button>
						</div>
						<div className="slider-top_dots-box">
								<ul className="slider-top_nav">
									{slides.map((_, index) => (
											<li className={`slider-top_item ${index === currentSlide ? 'active' : ''}`} key={index}></li>
									))}
										{/* <li className="slider-top_item active"></li>
										<li className="slider-top_item"></li>
										<li className="slider-top_item"></li>
										<li className="slider-top_item"></li>	 */}
								</ul>
						</div>
				</div>
			</div>
		</>
	)
}
export default SliderTop