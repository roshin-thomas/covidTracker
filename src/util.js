import { Circle, Popup, Marker, CircleMarker } from 'react-leaflet';
import numeral from 'numeral';

const casesTypeColors = {
  cases: {
    hex: '#CC1034',
    multiplier: 80
  },
  recovered: {
    hex: '#7dd71d',
    multiplier: 120
  },
  deaths: {
    hex: '#fb4443',
    multiplier: 200
  }
};

export const sortData = (data) => {
  const sortedData = [...data];
  return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
};

export const showDataOnMap = (data, casesType = 'cases') =>
  data.map((country, i) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      color={casesTypeColors[casesType].hex}
      fillColor={casesTypeColors[casesType].hex}
      fillOpacity={0.4}
      radius={Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier}
    >
      <Popup>
        {' '}
        <div className="info-container">
          <div className="info-flag" style={{ backgroundImage: `url(${country.countryInfo.flag})` }}></div>
          <div className="info-name">{country.country}</div>
          <div className="info-confirmed">Cases: {numeral(country.cases).format('0,0')}</div>
          <div className="info-recovered">Recovered: {numeral(country.recovered).format('0,0')}</div>
          <div className="info-deaths">Deaths: {numeral(country.deaths).format('0,0')}</div>
        </div>
      </Popup>
      ;
    </Circle>
  ));
