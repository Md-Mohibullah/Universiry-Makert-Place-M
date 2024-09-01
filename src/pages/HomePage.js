import React from "react";
import Layout from "./../components/Layout/Layout";
import featuredListing from '../Images/featuredListing.png'
import requestedListing from '../Images/RequestedListing.png'
import { useNavigate } from "react-router-dom";
import Slider from "../components/Slider";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <Slider/>
      {/* <div className="container">
        <div className="row">
          <h1>Category</h1>
          <div className="col-md-5">
            <div className="Imagecontainer">
              <img src={featuredListing} alt="featuredListing" />
              <button className="btn" 
              onClick={()=>{
                navigate('/category/featuredListing')
              }}
              >Featured Listing</button>
            </div>
          </div>
          <div className="col-md-5">
            <div className="Imagecontainer">
              <img src={requestedListing} alt="requestedListing" />
              <button className="btn"
                onClick={() => {
                  navigate('/category/requestedListing')
                }}
              >Requested Listing</button>
            </div>
          </div>
        </div>
      </div> */}
    </Layout>
  );
};

export default HomePage;
