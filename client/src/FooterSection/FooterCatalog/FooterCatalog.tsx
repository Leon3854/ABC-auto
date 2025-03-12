import "./FooterCatalog.component.css"
import FooterCatalogLeftPath from "./FooterCatalogLeftPath/FooterCatalogLeftPath"
import FooterCatalogRightPath from "./FooterCatalogRightPath/FooterCatalogRightPath"

function FooterCatalog() {
	return(
		<>
			<div className="wrapper-block">
				<div className="footer-catalog-wrapper">
					<FooterCatalogLeftPath />
					<FooterCatalogRightPath />
				</div>
				
			</div>
		</>
	)
}
export default FooterCatalog