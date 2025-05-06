import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faLocationDot, faCity, faMap } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import './StoreLocatorV1.css'; // CSS from your existing style

const StoreLocatorV1 = () => {
  const [state, setState] = useState('');
  const [city, setCity] = useState('');

  const handleDetectLocation = (e) => {
    e.preventDefault();
    // You can integrate geolocation API here
    alert("Detecting your location...");
  };

  return (
    <div className="container my-lg-5 my-sm-2">
        {/* <div className="row">
            <div className="col">
                <div className="card-header text-center">
                    <h1>Store Locator</h1>
                </div>
            </div>
        </div> */}
      <div className="card">
        <div className="card-header text-center text-uppercase">
          <h1 className='fs-2 my-1'>Store Locator</h1>
        </div>
        {/* User Input and Map Display Starts */}
        <div className="row mx-2 mt-3">
            <div className="col-md-6 d-flex align-items-center">
                <div className="card-body p-0">
                    <form className='p-0'>
                        <div className="row">
                            <div className="col-md-6">
                                {/* <label htmlFor="state" className="form-label">State</label> */}
                                <select
                                id="state"
                                name="state"
                                className="form-select"
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
                            <div className="col-md-6 cust-gap">
                                {/* <label htmlFor="city" className="form-label">City</label> */}
                                <select
                                id="city"
                                name="city"
                                className="form-select"
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
                            {/* <div className="col-md-1 d-flex align-items-end justify-content-center">
                                <span>OR</span>
                            </div>
                            <div className="col-md-3 d-flex align-items-end justify-content-center">
                                <button
                                    onClick={handleDetectLocation}
                                    className="btn btn-primary"
                                >
                                    <FontAwesomeIcon icon={faLocationDot} /> &nbsp; Choose Current Location
                                </button>
                            </div> */}
                        </div>

                        <div className="text-center my-lg-4 cust-gap">
                        <span>OR</span>
                        </div>

                        <div className="text-center cust-gap">
                            <button
                                onClick={handleDetectLocation}
                                className="btn btn-primary custom-btn btn1 custom-btn-primary"
                            >
                                <FontAwesomeIcon icon={faLocationDot} /> &nbsp; Choose Current Location
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="col-md-6 cust-gap">
                <iframe className=''
                    title="Vadodara Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.760058065186!2d73.15663431493268!3d22.30715898531864!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc5b7c2b5b5d5%3A0x2b2b2b2b2b2b2b2b!2sVadodara%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
                    width="100%"
                    height="400"
                    style={{
                        border: 1,
                        borderRadius: '15px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
        </div>
        {/* User Input and Map Display Ends */}
                    <hr/>
        {/* Cards Starts */}
        <div className="row px-4 pb-1">

          <div className="col-md-4 mb-3 mt-1">
            <div className="card custom-card h-100">
              <div className="card-body">
                <h5 className="card-title fw-bold">Akash Electronic Bike Agency</h5>
                <p className="badge text-uppercase fw-light">Associate Dealer</p>
                <p className="card-text">
                    <FontAwesomeIcon icon={faLocationDot} className="icon-gray" />&nbsp;
                    Nr Shivam Gerej, Kamlapur Road, Jileswar Park, Jasdan, Rajkot, Gujarat-360050
                </p>
                <p className="card-text text-black-50"> Jasdan - Gujarat</p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-3 mt-1">
            <div className="card custom-card h-100">
              <div className="card-body">
                <h5 className="card-title fw-bold">Shaineel E Vehicles</h5>
                <p className="badge badge2 text-uppercase fw-light">Showroom Distributor</p>
                <p className="card-text">
                    <FontAwesomeIcon icon={faLocationDot} className="icon-gray" />&nbsp;
                    GF-04, Krisil Tower, Opp. ICICI Bank , Near Iskon Height, Gotri Road, Vadodara, Gujarat-390010
                </p>
                <p className="card-text text-black-50"> Vadodara - Gujarat</p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-3 mt-1">
            <div className="card custom-card h-100">
              <div className="card-body">
                <h5 className="card-title fw-bold">Uma E Bikes</h5>
                <p className="badge text-uppercase fw-light">Associate Dealer</p>
                <p className="card-text">
                    <FontAwesomeIcon icon={faLocationDot} className="icon-gray" />&nbsp;
                    Ground Floor, Mun No-8/11/9/12-G Shop No.G-12, Krishna Arcade Near Essar Petrol Pump, Highway Road Sidhpur, Taluka-Sidhpur, District-Patan, Gujarat-384151
                </p>
                <p className="card-text text-black-50"> Sidhpur - Gujarat</p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-3 mt-1">
            <div className="card custom-card h-100">
              <div className="card-body">
                <h5 className="card-title fw-bold">Shaineel E Vehicles</h5>
                <p className="badge text-uppercase fw-light">Showroom Distributor</p>
                <p className="card-text">
                    <FontAwesomeIcon icon={faLocationDot} className="icon-gray" />&nbsp;
                    GF-04, Krisil Tower, Opp. ICICI Bank , Near Iskon Height, Gotri Road, Vadodara, Gujarat-390010
                </p>
                <p className="card-text text-black-50"> Vadodara - Gujarat</p>
              </div>
            </div>
          </div>

        </div>
        {/* Cards Ends */}

      </div>
    </div>
  );
};

export default StoreLocatorV1;