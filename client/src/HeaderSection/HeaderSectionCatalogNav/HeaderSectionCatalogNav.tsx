import CatalogButtonNav from './CatalogButtonNav/CatalogButtonNav';
import CatalogNavigation from './CatalogNavigation/CatalogNavigation';
import './HeaderSectionCatalogNav.component.css'
function HeaderSectionCatalogNav() {
  return (
    <>
      <div className="wrapper-block">
				<div className="header-main-catalog">
					<CatalogNavigation />
					<CatalogButtonNav />
				</div>
			</div>
    </>
  );
}
export default HeaderSectionCatalogNav;
