import { GiHamburgerMenu } from "react-icons/gi";
import "./HeaderBurgerButton.component.css";

function HeaderBurgerButton() {
  return (
    <div className="header-block-top_burger-menu">
      <button aria-label="button" className="btn-burger" type="button" onClick={()=> {}}>
				<GiHamburgerMenu />
      </button>
    </div>
  );
}
export default HeaderBurgerButton;
