import React, {useState, useEffect, Suspense, lazy} from 'react';
import './App.scss';

// Lazy load the main map visualizer
const MapVisualizer = lazy(() => import('./components/MapVisualizer'));

// Minimal data structure for India map
const initialData = {
  TT: {
    total: {},
    meta: {},
    districts: {},
  },
};

const App = () => {
  // State for map data (can be extended for real data)
  const [data, setData] = useState(initialData);
  // State for region highlight (for interactivity)
  const [regionHighlighted, setRegionHighlighted] = useState({stateCode: 'TT', districtName: null});

  // Default map statistic (can be changed to any valid key from STATISTIC_CONFIGS)
  const [mapStatistic] = useState('confirmed');

  // Fetch India GeoJSON (handled by MapVisualizer via SWR, so no need to fetch here)

  return (
    <div className="App">
      <h2>India Map</h2>
      <Suspense fallback={<div>Loading map...</div>}>
        <MapVisualizer
          mapCode="TT"
          isDistrictView={false}
          mapViz={0} // 0 = CHOROPLETH
          data={data}
          regionHighlighted={regionHighlighted}
          setRegionHighlighted={setRegionHighlighted}
          statistic={mapStatistic}
          getMapStatistic={() => 0}
          transformStatistic={(v) => v}
          noDistrictData={false}
        />
      </Suspense>
    </div>
  );
};

export default App;
