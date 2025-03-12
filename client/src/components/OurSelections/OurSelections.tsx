import { useEffect, useState } from "react";
import "./OurSelections.component.css";
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

function OurSelections({ serverUrl }: { serverUrl: string }) {
	const [slides, setSlides] = useState<Slide[]>([]);
	const [currentSlide, setCurrentSlide] = useState(0);
	const slidesPerPage = 3; // Количество слайдов на одной странице

	useEffect(() => {
		const fetchSlides = async () => {
			try {
				const response = await fetch(`${serverUrl}/slides/sliderId/2`);
				const data: Slide[] = await response.json();
				setSlides(data);
			} catch (error) {
				console.log('Error fetching slides:', error);
			}
		};
		fetchSlides();
	}, [serverUrl]);

	const nextSlide = () => {
		setCurrentSlide((prev) => (prev + 1) % Math.ceil(slides.length / slidesPerPage));
	};

	const prevSlide = () => {
		setCurrentSlide((prev) => (prev - 1 + Math.ceil(slides.length / slidesPerPage)) % Math.ceil(slides.length / slidesPerPage));
	};

	// Определяем текущую группу слайдов
	const currentSlides = slides.slice(currentSlide * slidesPerPage, (currentSlide + 1) * slidesPerPage);

	return (
		<>
			<div className="slider-wrapper">
				<div className="slider-box">
					<div className="slider-title-control">
						<div className="slider-title-control_title">
							<h4>Наши подборки</h4>
							<div className="slider-title-control_btn">
								<button className="all-controls" onClick={() => {}}>Все подборки</button>
							</div>
						</div>
						<div className="slider-title-control_control">
							<div className="slider-title-controls_btns">
								<button className="slider-title-controls_btn prev" onClick={prevSlide}><GrFormPrevious /></button>
								<button className="slider-title-controls_btn next" onClick={nextSlide}><GrFormNext /></button>
							</div>
						</div>
					</div>
					<div className="slider-selections_box-items">
						{currentSlides.length > 0 ? (
							currentSlides.map((slide) => (
								<div className="slider-selection_item" key={slide.id}>
									<div className="slider-selection_item-box">
										<div className="slider-item_fon">
											<img 
												src={slide.filePath ? slide.filePath : './default-image.png'} 
												alt={slide.text || slide.title} 
											/>
											<div className="slide-item_select-box">
												<div className="slide-item_item-title">
													<p>{slide.title}</p>
												</div>
												<div className="slide-item_item-btn">
													<button className="select-item_look-select" onClick={() => {}}>Посмотреть</button>
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
	);
}

export default OurSelections;
