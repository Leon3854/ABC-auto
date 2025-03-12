import React, { createContext, useContext } from 'react';
import { appUrl, serverUrl } from './config';


// Определяем типы для значений контекста
interface ConfigContextType {
  serverUrl: string;
  appUrl: string;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export const useConfig = () => {
	const context = useContext(ConfigContext);
	if (!context) {
		throw new Error('useConfig must be used within a ConfigProvider');
	}
	return context;
};

export const ConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	
	return (
		<ConfigContext.Provider value={{ serverUrl, appUrl }}>
			{children}
		</ConfigContext.Provider>
	);
};

// Экспортируем контекст
export default ConfigContext;