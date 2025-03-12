import { useEffect, useState } from "react";
import { useConfig } from "../../ConfigContext";


interface SliderTopContentResponse {
	title: string | null;
	text: string | null;
	filePath: string | null;
	sliderId: number
}


export const UseTopSliderContext = (endpoint: string, fetchImage: boolean) => {
	const {serverUrl} = useConfig()
	const [data, setData] = useState<SliderTopContentResponse | null>(null)
	const [error, setError] = useState<Error | null>(null)
	const [loading, setLoading] = useState<boolean>(true)

	useEffect(() => {
		const fetchData = async () => {
			if(!serverUrl) {
				setError(new Error('Server URL не установлен'))
				return
			}
			setLoading(true)
			try{
				const response = await fetch(`${serverUrl}/slides/${endpoint}`)
				if(!response.ok) {
					throw new Error('Сетевая ошибка')
				}
				const result: SliderTopContentResponse = await response.json()
				console.log('Полученный результат:', result);

				// Обновляем состояние в зависимости от fetchImage
				if (fetchImage) {
					setData({ 
						title: result.title || null,
						text: result.text || null,
						filePath: result.filePath || null,
						sliderId: result.sliderId });
			} else {
					setData({ 
						title: result.title || null,
						text: null,
						filePath: null,
						sliderId: result.sliderId
					});
			}
			} catch(err) {
				setError(err as Error);
				console.log('Ошибка при получении данных', err);
			}
		}
		fetchData()
	},[fetchImage, serverUrl, endpoint])
	return {data, error, loading}
}