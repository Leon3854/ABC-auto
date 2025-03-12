import { useEffect, useState } from "react";
import {useConfig} from "../ConfigContext";

interface ContentResponse {
	value: string;
	icons: string | null;
	url: string | null;
}

export const useFetchContent = (endpoint: string, fetchImage: boolean) => {
	const { serverUrl } = useConfig();
	const [data, setData] = useState<ContentResponse | null>(null);
	const [error, setError] = useState<Error | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
			const fetchData = async () => {
					if (!serverUrl) {
							setError(new Error('Server URL не установлен'));
							setLoading(false);
							return;
					}
					setLoading(true);
					try {
							const response = await fetch(`${serverUrl}/contents/${endpoint}`);
							if (!response.ok) {
									throw new Error('Сетевая ошибка');
							}
							const result: ContentResponse = await response.json();
							// console.log('Полученный результат:', result);

							// Обновляем состояние в зависимости от fetchImage
							if (fetchImage) {
									setData({ value: result.value || '', icons: result.icons || null, url: result.url || null });
							} else {
									setData({ value: result.value || '', icons: null, url: null });
							}
					} catch (err) {
							setError(err as Error);
							console.log('Ошибка при получении данных', err);
					} finally {
							setLoading(false);
					}
			};
			fetchData();
	}, [endpoint, serverUrl, fetchImage]);

	return { data, error, loading };
};


// export const useFetchContent = (endpoint: string, fetchImage: string) => {
// 	const { serverUrl } = useConfig();
// 	const [data, setData] = useState<ContentResponse | null>(null);
// 	const [error, setError] = useState<Error | null>(null);
// 	const [loading, setLoading] = useState<boolean>(true);
// 	const [stringData, setStringData] = useState<string | null>(null);
// 	useEffect(() => {
// 			const fetchData = async () => {
// 					if (!serverUrl) {
// 							setError(new Error('Server URL не установлен'));
// 							setLoading(false);
// 							return;
// 					}
// 					setLoading(true);
// 					try {
// 							const response = await fetch(`${serverUrl}/contents/${endpoint}`);
// 							if (!response.ok) {
// 									throw new Error('Сетевая ошибка');
// 							}
// 							const result: ContentResponse = await response.json();
// 							console.log('Полученный результат:', result);

// 							// if (fetchImage && result.icons) {
// 							// 		setStringData(result.icons);
// 							// } else {
// 							// 		setStringData(result.value);
// 							// }

// 							if (fetchImage) {
// 								setData({ value: '', icons: result.icons, url: result.url }); // Устанавливаем только icons
// 						} else {
// 								setData({ value: result.value, icons: null, url: null }); // Устанавливаем только value
// 						}
// 					} catch (err) {
// 							setError(err as Error);
// 							console.log('Ошибка при получении данных', err);
// 					} finally {
// 							setLoading(false);
// 					}
// 			};
// 			fetchData();
// 	}, [endpoint, serverUrl, fetchImage]);

// 	return { data, error, loading };
// };



// export const useFetchContent = (endpoint: string, fetchImage: string) => {
// 	const {serverUrl} = useConfig()
// 	const [data, setData] = useState<any>(null);
// 	const [error, setError] = useState<Error | null>(null);

// 	useEffect(() => {
// 		const fetchData = async() => {
// 			if (!serverUrl) {
// 				setError(new Error('Server URL не установлен'));
// 				return;
// 		}
// 			try {
// 				const response = await fetch(`${serverUrl}/contents/${endpoint}`)
// 				if (!response.ok) {
// 					throw new Error('Сетевая ошибка')
// 				}
// 				const result = await response.json();

// 				// Логируем полученный результат
// 				console.log('Полученный результат:', result);
				
// 				// Если запрашиваем изображение, возвращаем поле icons
//         if (fetchImage) {
//           setData(result.icons); // или result.value, в зависимости от структуры данных
//         } else {
//           setData(result.value);
//         }
// 			} catch(err) {
// 				setError(err as Error)
// 				console.log('Ошибка при получении данных', err)
// 			}
// 		}
// 		fetchData()
// 	}, [endpoint, serverUrl, fetchImage])
// 	return {data, error}
// }
