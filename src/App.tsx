import { Header } from "./components/header/Header";
import { Routes, Route } from "react-router-dom";
import { LocalWeather } from "./features/weather/localWeather/LocalWeather";
import { Weather } from "./components/weather/Weather";
import { SelectedWeather } from "./features/weather/selectedWeather/SelectedWeather";
import { WeatherNow } from "./components/weatherNow/WeatherNow";
import { WeatherFullDay } from "./components/weatherRest/WeatherRest";
import { useAppSelector } from "./hooks/redux";

function App() {
  const day = useAppSelector(state => state.weather.entities.day)
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Weather />}>
          <Route index element={<LocalWeather />} />
          <Route path='/:name' element={<SelectedWeather />} >
            <Route path='now' element={<WeatherNow />} />
            <Route path='today' element={<WeatherFullDay day={day} />} />
            <Route path='tomorrow' element={<WeatherFullDay day={day} />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
