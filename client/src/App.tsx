
import {BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HeaderSection from "./HeaderSection/HeaderSection";
import AboutCompany from "./screens/AboutCompany/AboutCompany";
import ChoiceCar from "./screens/ChoiceCar/ChoiceCar";
import Contacts from "./screens/Contacts/Contacts";
import Reviews from "./screens/Reviews/Reviews";
import ServiceCenter from "./screens/ServiceCenter/ServiceCenter";
import MainPage from "./screens/MainPage/MainPage";
import FooterSection from "./FooterSection/FooterSection";
import { useConfig } from "./ConfigContext";
import BreadCrumbs from "./components/BreadCrumbs/BreadCrumbs";


function App() {
	const { serverUrl } = useConfig(); // Получите serverUrl из контекста
  return (
		<Router>
			<div className="main-wrapper">
				<HeaderSection />
				<BreadCrumbs />
				<Routes>
					<Route path="/" element={<MainPage serverUrl={serverUrl} />} />
					<Route path="/choice-car" element={<ChoiceCar serverUrl={serverUrl} />} />
					<Route path="/about-company" element={<AboutCompany serverUrl={serverUrl} />} />
					<Route path="/service-center" element={<ServiceCenter serverUrl={serverUrl} />} />
					<Route path="/reviews" element={<Reviews serverUrl={serverUrl} />} />
					<Route path="/contacts" element={<Contacts serverUrl={serverUrl} />} />
				</Routes>
				 <FooterSection />
			</div>
		</Router>
  );
}

export default App;
