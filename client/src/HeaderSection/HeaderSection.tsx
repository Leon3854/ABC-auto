
import { useConfig } from "../ConfigContext"
import TopInfoLine from "../TopInfoLine/TopInfoLine"
import HeaderSectionCatalogNav from "./HeaderSectionCatalogNav/HeaderSectionCatalogNav"
import HeaderSectionTopLine from "./HeaderSectionTopLine/HeaderSectionTopLine"




function HeaderSection() {
	const {serverUrl} = useConfig()
  return (
    <>
			<TopInfoLine serverUrl={serverUrl} />
      <HeaderSectionTopLine serverUrl={serverUrl} />
      <HeaderSectionCatalogNav />
    </>
  );
}
export default HeaderSection;
