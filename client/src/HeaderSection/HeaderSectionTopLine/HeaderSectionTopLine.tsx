import "./HeaderSectionTopLine.component.css";
import HeaderSectionNavigate from "./HeaderSectionNavigate/HeaderSectionNavigate";
import HeaderSectionCallButton from "./HeaderSectionCallButton/HeaderSectionCallButton";
import HeaderBurgerButton from "./HeaderBurgerButton/HeaderBurgerButton";
import HeaderLogotype from "./HeaderLogotype/HeaderLogotype";

function HeaderSectionTopLine() {
  return (
    <div className="wrapper-block">
      <div className="header-nav-block">
        <HeaderBurgerButton />
        <HeaderLogotype />
        <HeaderSectionNavigate />
        <HeaderSectionCallButton />
      </div>
    </div>
  );
}
export default HeaderSectionTopLine;
