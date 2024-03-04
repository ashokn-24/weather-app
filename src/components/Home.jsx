import axios from "axios";
import { useState } from "react";
import { Icon } from "react-icons-kit";
import { search } from "react-icons-kit/feather/search";
import FetchApi from "./FetchApi";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  const [citySearch, setCitySearch] = useState("");
  const [cityData, setCityData] = useState(null);

  const fetchCity = (e) => {
    e.preventDefault();
    axios
      .get(
        `https://dataservice.accuweather.com/locations/v1/cities/search?apikey=ICfOrVGI3ofdnGODMlLrRMwyPbISOCdO&q=${citySearch}`
      )
      .then((res) => {
        setCityData(res.data[0]);
        setCitySearch("");
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div className="container-fluid py-5" id="weather">
      <div className="container text-light">
        <div className="row justify-content-center ">
          <div className="col-md-8">
            <h1 className="text-center mb-4">Check Weather</h1>
            <form onSubmit={fetchCity}>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter city name..."
                  value={citySearch}
                  onChange={(e) => setCitySearch(e.target.value)}
                />
                <button className="btn btn-primary" type="submit">
                  <Icon icon={search} size={24} />
                </button>
              </div>
            </form>
            {cityData && (
              <div className="card bg-transparent ">
                <div className="card-body">
                  <FetchApi cityData={cityData} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
