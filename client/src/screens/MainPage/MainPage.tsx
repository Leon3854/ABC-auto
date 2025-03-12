import CarsInStock from "../../components/CarsInStock/CarsInStock"
import OurSelections from "../../components/OurSelections/OurSelections"
import SpecialOffer from "../../components/SepicialOffer/SpecialOffer"
import SliderTop from "../../components/SliderTop/SliderTop"
import "./MainPage.component.css"


function MainPage({serverUrl}) {
	return(
	<>
	
			<SliderTop serverUrl={serverUrl} />
			<CarsInStock serverUrl={serverUrl}/>
			<OurSelections serverUrl={serverUrl}/>
			<SpecialOffer serverUrl={serverUrl}/>
		</>
	)
}

export default MainPage

