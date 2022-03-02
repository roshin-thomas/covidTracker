import { Card, CardContent, FormControl, MenuItem, Select } from '@material-ui/core';
import { useEffect, useState } from 'react';
import './App.css';
import InfoBox from './InfoBox';
import Map from './Map';
import Table from './Table';
import { sortData } from './util';
import LineGraph from './LineGraph';
import 'leaflet/dist/leaflet.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [casesType, setCasesType] = useState('cases');
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapData, setMapData] = useState([]);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries')
        .then((response) => response.json())
        .then((data) => {
          const sortedData = sortData(data);

          setTableData(sortedData);
          const countries = data.map((country) => ({ name: country.country, value: country.countryInfo.iso2 }));
          setCountries(countries);
          setMapData(data);
        });
    };
    getCountriesData();
  }, []);

  useEffect(async () => {
    await fetch('https://disease.sh/v3/covid-19/all')
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);
    const url = countryCode === 'wordlwide' ? 'https://disease.sh/v3​/covid-19​/all' : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  };
  return (
    <div className="app">
      <div className="app_left">
        <div className="app_header">
          {' '}
          <h1>Covid Tracker</h1>
          <FormControl className="app_dropDown">
            <Select variant="outlined" value={country} onChange={onCountryChange}>
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app_stats">
          <InfoBox title="Covid cases" recovered={countryInfo.todayCases} total={countryInfo.cases}></InfoBox>
          <InfoBox title="Recovered" recovered={countryInfo.todayRecovered} total={countryInfo.recovered}></InfoBox>
          <InfoBox title="Deaths" recovered={countryInfo.todayDeaths} total={countryInfo.deaths}></InfoBox>
        </div>
        <Map countries={mapData} casesType={casesType} center={mapCenter} zoom={mapZoom}></Map>
      </div>
      <div className="app_right">
        <Card>
          <CardContent>
            <h2>Cases by Country</h2>
            {<Table countries={tableData} />}
            <h2>Wordlwide New Cases</h2>
            <LineGraph casesType={casesType} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;
