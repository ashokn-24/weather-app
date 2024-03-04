import { useEffect, useState } from "react";
import axios from "axios";
import sun from "../images/sun.png";
import moon from "../images/moon.png";
import { PushSpinner } from "react-spinners-kit";
import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";

const WeatherDisplay = ({ cityData }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setData(null);
    setLoading(true);
    axios
      .get(
        `https://dataservice.accuweather.com/currentconditions/v1/${cityData.Key}?apikey=ICfOrVGI3ofdnGODMlLrRMwyPbISOCdO`
      )
      .then((res) => {
        setData(res.data[0]);
        setLoading(false);
      });
  }, [cityData.Key]);

  return (
    <div className="weather-display-container">
      {data && (
        <div className="weather-details">
          <h3>
            {cityData.EnglishName}, {cityData.Country.EnglishName}
          </h3>
          <div>
            <h2>
              {Math.ceil(data.Temperature.Metric.Value)}
              <sup>&deg;{data.Temperature.Metric.Unit}</sup>
            </h2>
            <img
              className="weather-img"
              src={data.IsDayTime ? sun : moon}
              alt={data.IsDayTime ? "sun" : "moon"}
              style={{ width: "300px", height: "auto" }}
            />
            <p>{data.WeatherText}</p>
          </div>
        </div>
      )}
      {!data && (
        <div className="text-center">
          <PushSpinner size={30} color="#fff" loading={loading} />
        </div>
      )}
    </div>
  );
};

WeatherDisplay.propTypes = {
  cityData: PropTypes.shape({
    Key: PropTypes.string.isRequired,
    EnglishName: PropTypes.string.isRequired,
    Country: PropTypes.shape({
      EnglishName: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default WeatherDisplay;
