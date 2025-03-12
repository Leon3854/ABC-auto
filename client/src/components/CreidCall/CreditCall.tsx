import { HiOutlineHandThumbUp } from 'react-icons/hi2'
import './CreditCall.component.css'
import { CiTimer } from 'react-icons/ci'
import { VscPercentage } from "react-icons/vsc"
import CallForm from '../Forms/CallForms/CallForm'

function CreditCall({serverUrl}) {
	return (
		<>
			<div className="wrapper-block">
				<div className="credit-call">
					<div className="credit-call-content">
						<img src='./credit-fon.png' className="credit-call_fon" title='image-fon'/>
						<div className="credit-content-section">
							<div className="credit-content-title">
								<p>Экспресс-кредит</p>
							</div>
							<div className="credit-content-slogan">
								<p>Воплотите мечту о новом автомобиле уже сегодня с выгодным предложением.
								Заполните заявку, чтобы получить уникальное предложение.</p>
							</div>
							<div className="credit-content-offer">
									<div className="red-offer-procent">
										<div className="red-offer-procent_benefit">
											<p>от 1,9%</p>
											</div>
										<div className="red-offer-procent_save">
											<p>По льготной cтавке</p>
											</div>
									</div>
							</div>
							<div className="credit-content-benefit-group">
								<div className="credit-benefit-item">
									<div className="credit-benefit-item_icon">
										<div className="credit-item-icon">
										<HiOutlineHandThumbUp />
										</div>
									</div>
									<div className="credit-benefit-item-content">
										<div className="credit-item-content">
											<p>Компенсируем дорогу 
											до автосалона всем покупателям</p>
										</div>
									</div>
								</div>
								<div className="credit-benefit-item">
									<div className="credit-benefit-item_icon">
										<div className="credit-item-icon">
										<CiTimer />
										</div>
									</div>
									<div className="credit-benefit-item-content">
										<div className="credit-item-content">
											<p>БЫСТРОЕ оформление КАСКО и ОСАГО за 15 минут</p>
										</div>
									</div>
								</div>
								<div className="credit-benefit-item">
									<div className="credit-benefit-item_icon">
										<div className="credit-item-icon">
										<VscPercentage/>
										</div>
									</div>
									<div className="credit-benefit-item-content">
										<div className="credit-item-content">
											<p>Скидка 
											30 000 рублей</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="credit-call-form">
						<CallForm serverUrl={serverUrl}/>
					</div>
				</div>
			</div>
		</>
	)

}
export default CreditCall