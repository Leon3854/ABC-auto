import FooterContactsCity from "./FooterContactsCity/FooterContactsCity"
import FooterCreditInstallments from "./FooterCreditInstallments/FooterCreditInstallments"
import './FooterCatalogRightPath.component.css'


function FooterCatalogRightPath() {
	return(
		<>
		<div className="footer-catalog-right-path">
			<FooterCreditInstallments />
			<FooterContactsCity />
		</div>
		</>
	)
}
export default FooterCatalogRightPath

