import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate,useParams } from "react-router-dom";
import Layout from "./../components/Layout/Layout";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Spinner from "../components/Spinner";
import { AiOutlineFileAdd } from "react-icons/ai";
import { toast } from "react-toastify";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { db } from "../firebase.config";
import { addDoc, collection, serverTimestamp, doc, updateDoc, getDoc } from "firebase/firestore";

const EditFeaturedListing = () => {
  const [loading, setLoading] = useState(false);
  const [listing, setListing] = useState(null)
  const params = useParams()
  const [formData, setFormData] = useState({
    type: "featuredListing",
    name: "",
    bargain: false,
    askingPrice: 0,
    number: 0,
    old: 0,
    category: "",
    address: "",
    images: {},
    details: "",
  });

  const {
    category,
    name,
    bargain,
    number,
    old,
    askingPrice,
    address,
    images,
    details,
  } = formData;

  const auth = getAuth();
  const navigate = useNavigate();
  const isMounted = useRef(true);

  useEffect(() => {
    if (isMounted) {
      onAuthStateChanged(auth, (user) => {
        setFormData({
          ...formData,
          useRef: user.uid,
        });
      });
    } else {
      navigate("/signin");
    }

    // eslint-disable-next-line
  }, []);
  //useeffect to check login user
  useEffect(() => {
    if (listing && listing.useRef !== auth.currentUser.uid) {
      toast.error("You Can Not Edit This Lisitng");
      navigate("/");
    }
  }, [listing, auth.currentUser.uid, navigate]);

  useEffect(() => {
    setLoading(true);
    const fetchListing = async () => {
      const docRef = doc(db, "listings", params.listingId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setListing(docSnap.data());
        setFormData({ ...docSnap.data() });
        setLoading(false);
      } else {
        navigate("/");
        toast.error("Lisitng NOt Exists");
      }
    };
    fetchListing();
  }, [navigate, params.listingId]);

  if (loading) {
    return <Spinner />;
  }

  //mutate func
  const onChangeHandler = (e) => {
    let boolean = null;
    if (e.target.value === "true") {
      boolean = true;
    }
    if (e.target.value === "false") {
      boolean = false;
    }
    //files
    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        images: e.target.files,
      }));
    }
    //text/booleans/number
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value,
      }));
    }
  };

  //form submit
  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    // console.log(formData);
    if (images > 6) {
      setLoading(false);
      toast.error("Max 6 Images can be selected");
      return;
    }

    //store images to firebase storage
    const storeImage = async (image) => {
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;
        const storageRef = ref(storage, "images/" + fileName);
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            // console.log("uplloas is" + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                // console.log("upload is paused");
                break;
              case "running":
                // console.log("upload is runnning");
                
            }
          },
          (error) => {
            reject(error);
          },
          //success
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    };
    const imgUrls = await Promise.all(
      [...images].map((image) => storeImage(image))
    ).catch(() => {
      setLoading(false);
      toast.error("Images not uploaded");
      return;
    });
    // console.log(imgUrls);

    //save form data
    const formDataCopy = {
      ...formData,
      imgUrls,
      timestamp: serverTimestamp(),
    };
    formData.location = address;
    delete formDataCopy.images;
    const docRef = doc(db,'listings',params.listingId)
    await updateDoc(docRef,formDataCopy)
    toast.success("Listing Updated!");
    setLoading(false);
    navigate(`/category/${formDataCopy.type}/${docRef.id}`);
  };
  return (
    <Layout>
      <div className="container d-flex flex-column align-items-center justify-content-center mb-4">
        <h3 className="mt-3 w-50 bg-dark text-light p-2 text-center">
          Update Featured Listing &nbsp;
          <AiOutlineFileAdd />
        </h3>
        <form className="w-50 bg-light p-4" onSubmit={onSubmit}>
          {/* name */}
          <div className="mb-3 mt-4">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={onChangeHandler}
              required
            />
          </div>
          {/* Details */}
          <div className="mb-3 mt-4">
            <label htmlFor="details" className="form-label">
              Details
            </label>
            <input
              type="text"
              className="form-control"
              id="details"
              value={details}
              onChange={onChangeHandler}
              required
            />
          </div>
          {/* Category */}
          <div className="mb-3 mt-4">
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <input
              type="text"
              className="form-control"
              id="category"
              value={category}
              onChange={onChangeHandler}
              required
            />
          </div>
          {/* Asking Price */}
          <div className="mb-3 mt-4">
            <label htmlFor="Asking Price" className="form-label">
              Asking Price
            </label>
            <input
              type="number"
              className="form-control"
              id="askingPrice"
              value={askingPrice}
              onChange={onChangeHandler}
              required
            />
          </div>
          {/* old */}
          <div className="mb-3 mt-4">
            <label htmlFor="Old" className="form-label">
              How old(in months):
            </label>
            <input
              type="number"
              className="form-control"
              id="old"
              value={old}
              onChange={onChangeHandler}
              required
            />
          </div>
          {/* address */}
          <div className="mb-3">
            <label htmlFor="address">Address :</label>
            <textarea
              className="form-control"
              placeholder="Enter Your Address"
              id="address"
              value={address}
              onChange={onChangeHandler}
              required
            />
          </div>
          {/* Contact number */}
          <div className="mb-3">
            <label htmlFor="number">Contact Number :</label>
            <input
              className="form-control"
              type="digit"
              id="number"
              maxlength="10"
              minLength="10"
              value={number}
              onChange={onChangeHandler}
              required
            >
            </input>
          </div>
          {/* bargain  */}
          <div className="mb-3 ">
            <label htmlFor="bargain" className="form-label">
              Bargain :
            </label>
            <div className="d-flex flex-row ">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  value={true}
                  onChange={onChangeHandler}
                  name="bargain"
                  id="bargain"
                />
                <label className="form-check-label" htmlFor="yes">
                  Yes
                </label>
              </div>
              <div className="form-check ms-3">
                <input
                  className="form-check-input"
                  type="radio"
                  name="bargain"
                  value={false}
                  defaultChecked
                  onChange={onChangeHandler}
                  id="bargain"
                />
                <label className="form-check-label" htmlFor="no">
                  No
                </label>
              </div>
            </div>
          </div>
          {/* regular price */}

          {/* files images etc */}
          <div className="mb-3">
            <label htmlFor="formFile" className="form-label">
              Select images :
            </label>
            <input
              className="form-control"
              type="file"
              id="images"
              name="images"
              onChange={onChangeHandler}
              max="6"
              accept=".jpg,.png,.jpeg"
              multiple
              required
            />
          </div>
          {/* submit button */}
          <div className="mb-3">
            <input
              className="btn btn-primary w-100"
              type="submit"
              value="Update Listing"
            />
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default EditFeaturedListing;