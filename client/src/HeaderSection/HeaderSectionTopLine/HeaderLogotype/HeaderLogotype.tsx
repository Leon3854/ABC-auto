import "./HeaderLogotype.component.css";
import { useFetchContent } from "../../../TopInfoLine/useFetchContent";
import { Link } from "react-router-dom";


function HeaderLogotype({serverUrl}) {
	const { data: logo, error: logotypeError } = useFetchContent('header_log', true); // запрашиваем иконку
	const { data: yearsData, error: yearsError } = useFetchContent('header_years', false); // запрашиваем годы
	const { data: logoTextData, error: logoTextError } = useFetchContent('header_years_text', false); // запрашиваем текст

	if(logotypeError || yearsError || logoTextError) {
		throw new Error('Ошибка загрузки данных')
	}

	 // Проверка на загрузку данных
	 if (!logo || !yearsData || !logoTextData) {
		return <div>Loading...</div>; // Индикатор загрузки

		
}
 // Формируем полный URL для логотипа
 const iconPath = logo.icons; // Получаем относительный путь к иконке

const iconUrl = iconPath ? iconPath : './default_image.png'


  return (
    <>
      <div className="header-block-top_logotype">
        <div className="header-block-top_logotype-left-path">
           <Link to='/'>
					 <img
						src={iconUrl ? iconUrl : './default_image.png'} // Используем iconUrl, если он есть, иначе используем iconPath
              alt="logotype"
              className="head-logotype"
            />
					 </Link>
        </div>
        <div className="header-block-top_logotype-right-path">
          <p>
            <span>{yearsData?.value}</span>{logoTextData?.value}
          </p>
        </div>
      </div>
    </>
  );
}
export default HeaderLogotype;
