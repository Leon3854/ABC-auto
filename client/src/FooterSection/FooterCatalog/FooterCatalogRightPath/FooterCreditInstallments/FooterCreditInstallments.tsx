import { Link } from "react-router-dom"
import "./FooterCreditInstallments.component.css"

function FooterCreditInstallments() {

	return (

		<div className="credit-installments">
			<div className="credit-installments_main-title">
				<h3 className="list-title">Кредит и рассрочка</h3>
			</div>
			<div className="footer-credit-installments_nav">
				<ul className="footer-credit_list">
					<li className="footer-credit_item">
						<Link className="footer-credit_link" to={"/"}>Экспресс-кредит</Link>
					</li>
					<li className="footer-credit_item">
						<Link className="footer-credit_link" to={"/"}>Семейный автомобиль</Link>
					</li>
					<li className="footer-credit_item">
						<Link className="footer-credit_link" to={"/"}>Первый автомобиль</Link>
					</li>
					<li className="footer-credit_item">
						<Link className="footer-credit_link" to={"/"}>Работникам медицины</Link>
					</li>
					<li className="footer-credit_item">
						<Link className="footer-credit_link" to={"/"}>Рассрочка</Link>
					</li>
					<li className="footer-credit_item">
						<Link className="footer-credit_link" to={"/"}>Trade-in</Link>
					</li>
				</ul>
			</div>
		</div>
	)

}
export default FooterCreditInstallments