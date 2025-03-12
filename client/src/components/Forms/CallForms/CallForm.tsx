import { useState } from 'react'
import './CallForm.component.css'

function CallForm ({serverUrl}) {

	const [name, setName] = useState('')
	const [phone, setPhone] = useState('')

	const validatePhone = (phone) => {
		// Пример простой валидации номера телефона (можно расширить)
		const phoneRegex = /^\+?[1-9]\d{1,14}$/; // международный формат
		return phoneRegex.test(phone);
	};

	const handleSubmit = async (e) => {
    e.preventDefault(); // Прекращаем перегрузку страницы

    // Проверка serverUrl
    if (!serverUrl) {
        console.error('serverUrl не задан');
        alert('Ошибка: адрес сервера не задан.');
        return;
    }

    // Валидация данных
    if (!name || !validatePhone(phone)) {
        alert('Пожалуйста, введите корректные имя и номер телефона.');
        return;
    }

    // Создание объекта с данными, измените имена полей
    const data = { callName: name, callPhone: phone }; // Изменено

    try {
        const fullUrl = `${serverUrl}/clients-calls`;
        console.log(`Отправка запроса на: ${fullUrl}`);

        const response = await fetch(fullUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const result = await response.json();
            console.log('Успешно: ', result);
            // Очистка полей формы после успешной отправки
            setName('');
            setPhone('');
            alert('Ваше предложение отправлено!'); // Сообщение об успешной отправке
        } else if (response.status === 409) {
            const errorMessage = await response.text();
            console.error('Ошибка:', errorMessage);
            alert('Конфликт данных. Пожалуйста, проверьте введенные данные и попробуйте снова.');
        } else {
            console.error('Ошибка:', response.statusText);
            alert('Произошла ошибка при отправке данных. Пожалуйста, попробуйте еще раз.'); // Сообщение об ошибке
        }
    } catch (error) {
        console.log('Ошибка при отправке данных: ', error);
        alert('Произошла ошибка при отправке данных. Пожалуйста, проверьте соединение и попробуйте еще раз.');
    }
};


	return(
		<>
			<div className="call-credit-form">
				<div className="credit-form-body">
					<div className="get-spec-price">
						<div className="get-spec-price_title">
							<p>Получите 
							специальную цену</p>
						</div>
						<div className="get-spec-price_for-data">
							<p>Только до <span>10.10.21</span></p>
						</div>
					</div>
					<div className="call-form-special-price">
						<form onSubmit={handleSubmit}>
							<div className="call-form-spec-price-body">
								<div className="call-spec-price-name">
								<input 
								placeholder='Имя' 
								type='text' 
								value={name} 
								onChange={(e) => setName(e.target.value)}
								/>
								</div>
								<div className="call-spec-price-phone">
									<input 
									type="text" 
									placeholder='Номер телефона'
									value={phone}
									onChange={(e) => setPhone(e.target.value)}
									/>
								</div>
								<div className="call-spec-price-submit">
								<button type="submit">получить предложение</button>
								</div>
							</div>
							<div className="text-offer-for-client">
								<p>Нажимая кнопку “Получить скидку” Вы даете 
									согласие на обработку своих
									персональных данных
								</p>
							</div>
						</form>
						
					</div>
				</div>
			</div>
		
		</>
	)
}
export default CallForm