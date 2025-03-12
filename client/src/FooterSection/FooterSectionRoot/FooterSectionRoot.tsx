import "./FooterSectionRoot.component.css"
import { Link } from "react-router-dom"

function FooterSectionRoot() {
	return(
		<>
			<div className="wrapper-block">
				<div className="footer-section-root">
					<div className="footer-section-root_sam-block">
					<div className="footer-section-root_path-one">
						<div className="copyrite-wrapper">
							<div className="copyrite-text">
								<p>© 2021 Автосалон "ABC AUTO". Официальный дилер</p>
							</div>
							<div className="police-wrapper">
								<div className="police-config">
									<Link to={"/"}>Политика конфиденциальности</Link>
								</div>
								<div className="argument-police">
									<Link to={"/"}>Пользовательское соглашение</Link>
								</div>
							</div>
						</div>
					</div>
					<div className="footer-section-root_path-two">
						<div className="footer-root_path-two-wrapper">
							<div className="footer-root-content">
								<p>
									Обращаем Ваше внимание на то, что данный
									интернет-сайт носит исключительно
									информационный характер и ни при каких
									условиях не является публичной офертой, 
									определяемой положениями Статьи 437 Гражданского 
									кодекса Российской Федерации.
									</p>
							</div>
						</div>
					</div>
					<div className="footer-section-root_pathe-three">
						<div className="page-wrapper">
							<div className="footer-yandex-page">
								<img src="./yandex-footer.png" alt="yandex-page" />
							</div>
						</div>
					</div>
					</div>
				</div>
			</div>
			
		</>
	)
}

export default FooterSectionRoot