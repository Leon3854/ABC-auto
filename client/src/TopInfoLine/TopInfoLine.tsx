import "./TopInfoLine.component.css";
import { GiPositionMarker } from "react-icons/gi";
import { CiClock2 } from "react-icons/ci";
import { RiWhatsappFill } from "react-icons/ri";
import { useFetchContent } from "./useFetchContent";

function TopInfoLine({serverUrl}) {
	const {data: address, error: addressError} = useFetchContent('top_line_address', false)
	const {data: startTime, error: startTimeError} = useFetchContent('top_line_time_start', false)
	const {data: finishWork, error: finishWorkError} = useFetchContent('top_line_finish_work', false)
	
	if(addressError || startTimeError || finishWorkError) {
		throw new Error('Ошибка загрузки данных')
	}
	if(!address || !startTime || !finishWork) {
		return <div>Loading...</div>; // Индикатор загрузки
	}
  return (
    <div className="top-info-line_section">
      <div className="wrapper-block top-info-line">
        <div className="top-info-line_address ">
          <p className="all-center">
            <span className="ico-span">
              <GiPositionMarker />
            </span>
						{address.value || "Загрузка адреса..."} {/* Отображаем адрес или сообщение о загрузке */}
          </p>
        </div>
        <div className="top-info-line_time-work">
          <p className="all-center">
            <span className="ico-span">
              <CiClock2 />
            </span>
            Время работы: c {startTime.value || "Загрузка начала работы..."} до 
						{finishWork.value || "Загрузка конец работы..."}
          </p>
        </div>
        <div className="top-info-line_whatsapp">
          <p className="all-center">
            <span className="ico-span">
              <RiWhatsappFill />
            </span>
            Whatsapp
          </p>
        </div>
      </div>
    </div>
  );
}
export default TopInfoLine;


//// const [address, setAddress] = useState(null)
	// const [error, setError] = useState(null)

	// useEffect(() => {
  //   const fetchData = async (endpoint) => {
  //     try {
  //       const response = await fetch(`${serverUrl}/contents/${endpoint}`);

  //       if (!response.ok) {
  //         throw new Error("Сетевая ошибка");
  //       }

  //       const result = await response.json();
	// 			return result.value // Предполагаем, что значение адреса находится в поле value
  //     } catch (error) {
	// 			setError(error)
  //       console.error("Ошибка при получении адреса:", error);
  //     }
  //   };

	// 	const fetchAddress = async () => {
  //     const fetchedAddress = await fetchData('top_line_address');
  //     if (fetchedAddress) {
  //       setAddress(fetchedAddress);
  //     }
  //   };

  //   fetchAddress(); // Вызов функции получения адреса
  // }, [serverUrl]); // Зависимость от serverUrl