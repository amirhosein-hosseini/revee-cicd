import React from 'react';

const Map = () => {
  return (
    <div>
      <iframe
        title="Google Map"
        width="600"
        height="450"
        frameBorder="0" style={{ border: 0 }}
        src="https://maps.app.goo.gl/AXJ8CLJguT3WMFiF8?output=embed"
        allowFullScreen
      />
    </div>
  );
};

export default Map;