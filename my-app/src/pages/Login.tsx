import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../auth/firebase-config";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/");
        } catch (err) {
            toast.error("The information is not correct!", {
                position: "top-right",
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
        <div className="login">
            <div className="login-img-container">
                <img
                    className="login-image"
                    src="https://picsum.photos/800/850?grayscale"
                    alt="random photos"
                />
            </div>
            <div className="login-form">
                <h1 className="form-title display-3">Login</h1>
                <form id="login" onSubmit={(e) => handleSubmit(e)}>
                    <div className="mb-5">
                        <label htmlFor="email" className="form-label display-4">
                            Email
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            data-cy="loginEmail"
                            placeholder="Enter your Email adress.."
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                    </div>
                    <div className="mb-5">
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
                            data-cy="loginPassword"
                            placeholder="Enter your Password..."
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                    </div>
                    <input
                        type="submit"
                        className="btn btn-outline-dark form-control"
                        value="Login"
                    />
                    <ToastContainer
                        position="top-right"
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
                </form>
            </div>
        </div>
    );
}
