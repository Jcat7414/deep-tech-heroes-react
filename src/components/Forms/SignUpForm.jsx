import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function SignUpForm() {
    const [user, setNewUser] = useState({
        username: "",
        password: "",
        email: "",
        first_name: "Eli",
        last_name: "Eli2",
    });

        const handleChange = (e) => {
        e.preventDefault();
        const { id, value } = e.target;
        setNewUser((prevUser) => ({
            ...prevUser,
            [id]: value,
        }));
    }

    const history = useHistory();

    const postData = async() => {
        const response = await fetch(
        `${process.env.REACT_APP_API_URL}users/`,
        {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        }
        );
        return response.json();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        postData().then((response) => {
        window.localStorage.setItem("username", response.username);
        history.push("/signin");
        });
    };

    return (
        <form className="form-wrapper">
            <div className="form-header">
                <h1>Welcome to Deep Tech Heroes!</h1>
                <p>Sign up, then become a Hero or a Host, or both!</p>
            </div>
            
            <div className="form-inputs">
                <div className="form-input">
                    <label htmlFor="username">Create a Username</label>
                    <input
                        type="text"
                        id="username"
                        placeholder="Create a Username"
                        required
                        onChange={handleChange}
                    />
                </div>

                <div className="form-input">
                    <label htmlFor="password">Create a password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Minimum 8 characters"
                        required
                        onChange={handleChange}
                    />
                </div>

                <div className="form-input">
                    <label htmlFor="email">Add Your Email</label>
                    <input
                        type="text"
                    id="email"
                    placeholder=""
                    required
                    onChange={handleChange}
                    />
                </div>
            </div>
            <div className="form-confirm">
                <h2>Please confirm your details and click "Submit" to create an account</h2>
                <div className="form-confirm-details">
                    <p>Username: { user.username }</p>
                    <p>Password: { user.password }</p>
                    <p>Email: { user.email }</p>
                </div>
                <div className="button-area">
                    <button type="submit" onClick={ handleSubmit }>SIGN UP</button>
                </div>
            </div>    
        </form>
    );
}

export default SignUpForm;