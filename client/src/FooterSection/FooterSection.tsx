import FooterCatalog from "./FooterCatalog/FooterCatalog"
import FooterDescription from "./FooterDescription/FooterDescription"
import FooterNavigation from "./FooterNavigation/FooterNavigation"
import FooterSectionRoot from "./FooterSectionRoot/FooterSectionRoot"


function FooterSection() {
	return(
		<div className="wrapper-block">
			<FooterNavigation />
			<FooterCatalog />
			<FooterSectionRoot />
			<FooterDescription />
		</div>
	)
}

export default FooterSection