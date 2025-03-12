import { useEffect, useState } from "react";
import "./SpecialOffer.component.css"
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";



interface Slide {
	id: number;
	createdAt: string;
	updateAt: string;
	title: string;
	text: string;
	filePath: string | null;
	sliderId: number;
}


function SpecialOffer ({serverUrl}: {serverUrl: Slide}) {

	const [slides, setSlides] = useState<Slide[]>([])
	const [currentSlide, setCurrentSlide] = useState(0)
	const slidesPerPage = 3

	useEffect(() => {
		const fetchSlides = async() => {
			try{

				const response = await fetch(`${serverUrl}/slides/sliderId/3`)
				const data: Slide[] = await response.json()
				setSlides(data)

			} catch(error) {
				console.log('Error fetching slides:', error)
			}
		}
		fetchSlides()
	}, [serverUrl])

	const nextSlide = () => {
		setCurrentSlide((prev) => (prev + 1) % Math.ceil(slides.length / slidesPerPage));
	};

	const prevSlide = () => {
		setCurrentSlide((prev) => (prev - 1 + Math.ceil(slides.length / slidesPerPage)) % Math.ceil(slides.length / slidesPerPage));
	};

	const currentSlides = slides.slice(currentSlide * slidesPerPage, (currentSlide + 1) * slidesPerPage)

	return(
		<>
			<div className="special-offer-slider-wrapper">
				<div className="slider-box">
					<div className="slider-title-control">
						<div className="slider-title-control_title">
							<h4>Спецпредложения</h4>
						</div>
						<div className="slider-title-control_control">
							<div className="slider-title-controls_btns">
								<button className="slider-title-controls_btn prev" onClick={prevSlide}><GrFormPrevious /></button>
								<button className="slider-title-controls_btn next" onClick={nextSlide}><GrFormNext /></button>
							</div>
						</div>
					</div>
					<div className="special-offer-slider-selections_box-items">
						{currentSlides.length > 0 ? (
							currentSlides.map((slide) => (
								<div className="special-offer-slider-selection_item" key={slide.id}>
									<div className="special-offer-slider-selection_item-box">
										<div className="special-offer-slider-item_fon">
											<img
												src={slide.filePath ? slide.filePath : './default-image.png'}
												alt={slide.text || slide.title}
											/>
											<div className="special-offer-slide-item_select-box">
												<div className="special-offer-slide-item_item-title">
													<p className="special-offer-title">{slide.title}</p>
													<p className="special-offer-text">{slide.text}</p>
												</div>
												<div className="special-offer-slide-item_item-btn">
													<button className="special-offer-slide_look-select" onClick={() => {}}>Узнать больше</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							))
						) : (
							<p>Загрузка слайдов...</p>
						)}
					</div>
				</div>
			</div>
		</>
	)
}
export default SpecialOffer