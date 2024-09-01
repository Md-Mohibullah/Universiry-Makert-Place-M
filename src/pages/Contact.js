import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import { useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/contact.css";

const Contact = () => {
    const [message, setMessage] = useState("");
    const [owner, setOwner] = useState("");
    const [searchParams, setSearchParams] = useSearchParams(); //eslint-disable-line
    const params = useParams();

    useEffect(() => {
        const getPerson = async () => {
            const docRef = doc(db, "users", params.ownerId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setOwner(docSnap.data());
            } else {
                toast.error("Unble to fetch data");
            }
        };
        getPerson();
    }, [params.ownerId]);
    return (
        <Layout title="contact details - house marketplace">
            <div className="row contact-container">
                <div className="col-md-6 contact-container-col-2">
                    <h1>Contact Details</h1>
                    <div>
                        {owner !== "" && (
                            <main>
                                <h3 className="mb-4">
                                    Person Name :{" "}
                                    <span style={{ color: "#470d21" }}>
                                        {" "}
                                        " {owner?.name} "{" "}
                                    </span>
                                </h3>

                                <div className="form-floating">
                                    <textarea
                                        className="form-control"
                                        placeholder="Leave a comment here"
                                        value={message}
                                        id="message"
                                        onChange={(e) => {
                                            setMessage(e.target.value);
                                        }}
                                    />
                                    <label
                                        htmlFor="floatingTextarea"
                                        style={{ color: "lightgray" }}
                                    >
                                        Type your message here
                                    </label>
                                </div>
                                <a
                                    href={`mailto:${owner.email}?Subject=${searchParams.get(
                                        "name"
                                    )}&body=${message}`}
                                >
                                    <button className="btn mt-2">Send Message</button>
                                </a>
                            </main>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Contact;