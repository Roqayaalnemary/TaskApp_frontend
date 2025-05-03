import { useState } from "react";
import { useNavigate } from "react-router-dom";

// IMAGES
import nerdFinch from "../../assets/images/In sync-pana.png";

// APIs
import * as usersAPI from "../../components/utilities/user-api.js";

export default function SignupPage({ setUser }) {
    const navigate = useNavigate();
    const initialState = { username: "", email: "", password: "", confirmPassword: "" };
    const [formData, setFormData] = useState(initialState);
    const [errors, setErrors] = useState({ username: '', email: '', password: '', confirmPassword: '' });

    // منطق تعطيل الزر
    let disabledSubmitBtn = Object.values(errors).some(val => val !== "") || Object.values(formData).some(val => val === "") ? true : false;

    function handleChange(evt) {
        setFormData({ ...formData, [evt.target.name]: evt.target.value });
        checkErrors(evt);
    }

    function checkErrors({ target }) {
        const updateErrors = { ...errors };

        if (target.name === 'username') {
            updateErrors.username = target.value.length < 3 ? 'Your username must be at least three characters long.' : "";
        }
        if (target.name === 'email') {
            updateErrors.email = !/\S+@\S+\.\S+/.test(target.value) ? "Please enter a valid email address." : "";
        }
        if (target.name === 'password') {
            updateErrors.password = target.value.length < 3 ? "Your password must be at least three characters long." : "";
        }
        if (target.name === 'confirmPassword') {
            updateErrors.confirmPassword = target.value !== formData.password ? "Your passwords must match." : "";
        }

        setErrors(updateErrors);
    };

    async function handleSubmit(evt) {
        try {
            evt.preventDefault();
            const newUser = await usersAPI.signup(formData);
            setUser(newUser);
            setFormData(initialState);
            navigate("/finchs");
        } catch (err) {
            console.log(err);
            setUser(null);
        }
    }

    return (
        <>
            <div className="page-header" style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
                <img 
                    src={nerdFinch} 
                    alt="A finch using a computer" 
                    style={{ width: "150px", height: "auto", marginRight: "20px" }}  
                />
                <h1>Sign Up</h1>
            </div>

            <div className="form-container signup" style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                <form onSubmit={handleSubmit} style={{ width: "300px", textAlign: "left" }}>
                    <div style={{ marginBottom: "15px" }}>
                        <label htmlFor="id_username" style={{ display: "block" }}>Username:</label>
                        <input 
                            type="text" 
                            value={formData.username} 
                            name="username" 
                            minLength="3" 
                            maxLength="150" 
                            onChange={handleChange} 
                            style={{ width: "100%", padding: "10px", marginTop: "5px" }} 
                        />
                        {errors.username && <p>{errors.username}</p>}
                    </div>

                    <div style={{ marginBottom: "15px" }}>
                        <label htmlFor="id_email" style={{ display: "block" }}>Email:</label>
                        <input 
                            type="email" 
                            value={formData.email} 
                            name="email" 
                            onChange={handleChange} 
                            style={{ width: "100%", padding: "10px", marginTop: "5px" }} 
                        />
                        {errors.email && <p>{errors.email}</p>}
                    </div>

                    <div style={{ marginBottom: "15px" }}>
                        <label htmlFor="id_password1" style={{ display: "block" }}>Password:</label>
                        <input 
                            type="password" 
                            value={formData.password} 
                            name="password" 
                            minLength="3" 
                            onChange={handleChange} 
                            style={{ width: "100%", padding: "10px", marginTop: "5px" }} 
                        />
                        {errors.password && <p>{errors.password}</p>}
                    </div>

                    <div style={{ marginBottom: "15px" }}>
                        <label htmlFor="id_password2" style={{ display: "block" }}>Password confirmation:</label>
                        <input 
                            type="password" 
                            value={formData.confirmPassword} 
                            name="confirmPassword" 
                            onChange={handleChange} 
                            style={{ width: "100%", padding: "10px", marginTop: "5px" }} 
                        />
                        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
                    </div>

                    <button type="submit" disabled={disabledSubmitBtn} className="btn submit" style={{ padding: "10px 20px", width: "100%" }}>Submit!</button>
                </form>
            </div>
        </>
    );
}
