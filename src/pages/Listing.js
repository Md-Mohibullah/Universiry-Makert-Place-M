import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase.config";
import { getAuth } from "firebase/auth";
import { useNavigate, Link, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import SwipeCore, { EffectCoverflow, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import "../styles/listing.css";
import { FaRupeeSign, FaArrowCircleRight } from "react-icons/fa";
import { GrStakeholder } from "react-icons/gr";
import { VscSymbolBoolean } from "react-icons/vsc"
import { BiCategoryAlt } from "react-icons/bi"
import { CgDetailsMore } from "react-icons/cg"
import { FcContacts } from "react-icons/fc"


//config
SwipeCore.use([EffectCoverflow, Pagination]);

const Listing = () => {
    const [listing, setListing] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); //eslint-disable-line
    const params = useParams();
    const auth = getAuth(); //eslint-disable-line

    useEffect(() => {
        const fetchListing = async () => {
            const docRef = doc(db, "listings", params.listingId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                // console.log(docSnap.data());
                setListing(docSnap.data());
                setLoading(false);
            }
        };
        fetchListing();
    }, [params.listingId]);

    if (loading) {
        return <Spinner />;
    }

    return (
        <Layout title={listing.name}>
            <div className="row listing-container">
                <div className="col-md-8 listing-container-col1">
                    {listing.imgUrls === undefined ? (
                        <Spinner />
                    ) : (
                        <Swiper
                            effect={"coverflow"}
                            grabCursor={true}
                            centeredSlides={true}
                            slidesPerView={1}
                            coverflowEffect={{
                                rotate: 50,
                                stretch: 0,
                                depth: 100,
                                modifier: 1,
                                slideShadows: true,
                            }}
                            pagination={true}
                            className="mySwipe"
                        >
                            {listing.imgUrls.map((url, index) => (
                                <SwiperSlide key={index}>
                                    <img src={listing.imgUrls[index]} alt={listing.name} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    )}
                </div>
                <div className="col-md-4 listing-container-col2">
                    <h2>{listing.name}</h2>
                    <br />
                    <h6>
                        <h3>
                            <FaRupeeSign /> &nbsp;
                            {listing.type === 'featuredListing' ?
                                `Asking Price:  ${listing.askingPrice} ` :
                                `Expected Price: ${listing.askingPrice} `
                            }
                        </h3>
                    </h6>
                    <h4>It is {listing.type === "featuredListing" ? "an item listed for sale" : "a requested item"}</h4>
                    <p>
                        <CgDetailsMore /> &nbsp;
                        {`Details:  ${listing.details} `}
                    </p>
                    <p>
                        <BiCategoryAlt /> &nbsp;
                        {`Category:  ${listing.category} `}
                    </p>
                    <p>
                        <VscSymbolBoolean /> &nbsp;
                        {listing.bargain
                            ? `Bargain: Yes`
                            : `Bargain: No`}
                    </p>
                    <p>
                        <GrStakeholder /> &nbsp;
                        {
                            `How old: ${listing.old} months`
                        }
                    </p>
                    <p>
                        <FcContacts /> &nbsp;
                        {
                            `Contact Number: ${listing.number}`
                        }
                    </p>
                    <Link
                        className="btn btn-success"
                        to={`/contact/${listing.useRef}?listingName=${listing.name}`}
                    >
                        {listing.type === 'featuredListing' ?
                            `Contact Owner` :
                            `Contact Requester`
                        } &nbsp; <FaArrowCircleRight size={20} />
                    </Link>
                </div>
            </div>
        </Layout>
    );
};

export default Listing;