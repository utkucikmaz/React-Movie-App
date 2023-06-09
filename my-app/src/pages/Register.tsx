import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../auth/firebase-config";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        let displayName = firstName + " " + lastName;
        try {
            let user = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            await updateProfile(user.user, { displayName: displayName });
            navigate("/");
        } catch (err) {
            toast.warn("Couldn't register. Please try it again!", {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    };

    return (
        <div className="register">
            <div className="register-form">
                <h1 className="form-title display-3">Register</h1>
                <form id="register" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label
                            htmlFor="first-name"
                            className="form-label display-4"
                        >
                            First Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="first-name"
                            placeholder="Enter your first name..."
                            onChange={(e) => setFirstName(e.target.value)}
                            value={firstName}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label
                            htmlFor="last-name"
                            className="form-label display-4"
                        >
                            Last Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="last-name"
                            placeholder="Enter your last name..."
                            onChange={(e) => setLastName(e.target.value)}
                            value={lastName}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label display-4">
                            Email
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Enter your email..."
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label
                            htmlFor="password"
                            className="form-label display-4"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Enter your password..."
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                        />
                    </div>
                    <input
                        type="submit"
                        className="btn btn-outline-dark form-control"
                        value="Register"
                    />
                </form>
            </div>
            <div className="form-image register-img-container">
                <img
                    className="register-image"
                    src="https://picsum.photos/800/850?grayscale"
                    alt="random photos"
                />
                <ToastContainer
                    position="top-left"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                />
            </div>
        </div>
    );
}
