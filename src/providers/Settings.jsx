import { createContext, useContext, useState, useEffect, useMemo } from "react";
import useMachineStatus from "../hooks/useMachineStatus";

const SettingsContext = createContext(null);

const SETTINGS_KEY = "app_settings";

const defaultSettings = {
  showPath: false,
  considerZ: false,
  useCustomDimensions: false, // Чекбокс "Мои размеры"
  intervalReport: { mode: "disabled", value: 1000 },
  dimensions: { x: 100, y: 100, z: 100 }, // Размеры по умолчанию
};

export const SettingsProvider = ({ children }) => {
  // const { machineParams } = useMachineStatus();
  const [settings, setSettings] = useState(() => {
    const savedSettings = localStorage.getItem(SETTINGS_KEY);
    return savedSettings ? JSON.parse(savedSettings) : defaultSettings;
  });

  // useEffect(() => {
  //   if (!settings.useCustomDimensions && machineParams) {
  //     setSettings((prevSettings) => ({
  //       ...prevSettings,
  //       dimensions: machineParams,
  //     }));
  //   }
  // }, [machineParams, settings.useCustomDimensions]); // Обновляется при изменении параметров машины или чекбокса

  useEffect(() => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  }, [settings]);

  const updateSetting = (key, value) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      [key]: value,
    }));
  };

  const contextValue = useMemo(() => ({ settings, updateSetting }), [settings]);

  return (
    <SettingsContext.Provider value={contextValue}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};
