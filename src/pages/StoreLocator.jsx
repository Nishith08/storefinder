import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import './StoreLocator.css'; // CSS from your existing style

const StoreLocator = () => {
  const [state, setState] = useState('');
  const [city, setCity] = useState('');

  const handleDetectLocation = (e) => {
    e.preventDefault();
    // You can integrate geolocation API here
    alert("Detecting your location...");
  };

  return (
    <div className="container">
      <div className="form-container">
        <div className="form-header">
          <h1>Store Locator</h1>
          {/* <p>Sub Title</p> */}
        </div>

        <form id="feedbackForm">
          <div className="form-group-grouped" style={{ alignItems: 'baseline' }}>
            <div className="form-group">
              <div className="input-group">
                <i className="fa fa-globe"></i>
                <select
                  id="state"
                  name="state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  required
                >
                  <option value="" disabled>Select State</option>
                  <option value="o1">Option 1</option>
                  <option value="o2">Option 2</option>
                  <option value="o3">Option 3</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <div className="input-group">
                <i className="fa fa-globe"></i>
                <select
                  id="city"
                  name="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                >
                  <option value="" disabled>Select City</option>
                  <option value="o1">Option 1</option>
                  <option value="o2">Option 2</option>
                  <option value="o3">Option 3</option>
                </select>
              </div>
            </div>

            <span>OR</span>

            <div className="form-group cntr">
              <button onClick={handleDetectLocation} className="custom-btn btn1 custom-btn-primary">
                <FontAwesomeIcon icon={faLocationDot} /> &nbsp;&nbsp;Detect Your Location
              </button>
            </div>
            
          </div>
            <hr/>
        </form>
        {/* <div className="container">
          <div className="row">
            <div className="col-3">1</div>
            <div className="col-3">1</div>
            <div className="col-3">1</div>
            <div className="col-3">1</div>
          </div>
        </div> */}
      </div>

    </div>
  );
};

export default StoreLocator;
