import { FaPhoneAlt } from "react-icons/fa";
import "./HeaderSectionCallButton.component.css";
import { useFetchContent } from "../../../TopInfoLine/useFetchContent";
import { AiOutlineLoading } from "react-icons/ai";
import useLoadingAnimation from "../../../hooks/useLoadingAnimation";
import RedButtons from "../../../components/Buttons/RedButtons";


function HeaderSectionCallButton({serverUrl}) {

	const iconRef = useLoadingAnimation();
	

	const {data: mainNumber, error: mainNumberError} = useFetchContent('header_main_number', false)
	const {data: numberLine, error: headerNumberLineError} = useFetchContent('header_number_line', false)
	const {data: callBack, error: callBackError} = useFetchContent('header_button_call', false)

	if (mainNumberError || headerNumberLineError || callBackError) {
		throw new Error('Ошибка загрузки данных')
	}
	const handleClick = () => {
    // Здесь можно добавить логику для обработки клика
    console.log("Кнопка нажата!");
    // Например, можно сделать запрос на сервер
    // fetch(`${serverUrl}/some-endpoint`, { method: 'POST' });
  };

	// Проверка на null и установка значения по умолчанию
  const buttonValue = callBack ? callBack.value : "Загрузка...";

	if (!mainNumber || !numberLine || !callBack) {
		return (
			<div className="header-block-top_call-button">
				<div className="head-call-btn_block">
					<div className="header-call-btn_block-left">
						<div className="head-call-btn_block-left-icon">
							<p>
								<FaPhoneAlt className="head-call-icon" />
							</p>
						</div>
						<div className="head-call-btn_block-left-number">
							<p ref={iconRef} className="head-bold-number_main-phone">
								{<AiOutlineLoading />}
							</p>
							<p ref={iconRef} className="head-norm-number_main-lite">
								{<AiOutlineLoading />}
							</p>
						</div>
					</div>
					<div className="header-call-btn_block-right">
					<RedButtons onClick={handleClick} value={buttonValue}/>
					</div>
				</div>
			</div>
		);
	}

	return (
    <div className="header-block-top_call-button">
      <div className="head-call-btn_block">
        <div className="header-call-btn_block-left">
          <div className="head-call-btn_block-left-icon">
            <p>
              <FaPhoneAlt className="head-call-icon" />
            </p>
          </div>
          <div className="head-call-btn_block-left-number">
            <p className="head-bold-number_main-phone">
              {mainNumber.value}
            </p>
            <p className="head-norm-number_main-lite">
              {numberLine.value}
            </p>
          </div>
        </div>
        <div className="header-call-btn_block-right">
          <RedButtons onClick={handleClick} value={buttonValue}/>
        </div>
      </div>
    </div>
  );
}
export default HeaderSectionCallButton;
