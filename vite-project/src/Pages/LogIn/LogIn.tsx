import "./LogIn.css";
import { API_URL } from "../../../config";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Formik, Form, Field, type FormikHelpers } from 'formik';
import { ErrorMessage } from "formik";
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from "../../state/hooks.ts";
import { logIn } from "../../state/StateSlices/isAuthSlice.ts";

interface LogInFormDataType {
    mail: string;
    password: string;
}

function LogIn() {
    const dispatch = useAppDispatch();
    const isAuth = useAppSelector((state) => state.isauth.isAuth);
    let navigate = useNavigate();

    const regExp = {
        uppercase: /[A-Z]/,
        lowercase: /[a-z]/,
        number: /\d/,
        specialChar: /[@$!%*?&]/,
    };

    const validate = Yup.object().shape({
        mail: Yup.string()
            .email("შეიყვანე სწორი ელ.ფოსტა")
            .required("ელ.ფოსტის ველი სავალდებულოა"),
        password: Yup.string()
            .min(8, "პაროლი უნდა იყოს მინიმუმ 8 სიმბოლო")
            .matches(regExp.uppercase, "პაროლი უნდა შეიცავდეს მინიმუმ ერთ დიდ ასოს")
            .matches(regExp.lowercase, "პაროლი უნდა შეიცავდეს მინიმუმ ერთ პატარა ასოს")
            .matches(regExp.number, "პაროლი უნდა შეიცავდეს მინიმუმ ერთ ციფრს")
            .matches(regExp.specialChar, "პაროლი უნდა შეიცავდეს მინიმუმ ერთ სპეციალურ სიმბოლოს")
            .required("პაროლის ველი სავალდებულოა")
    });

    async function handleLogin(values: LogInFormDataType, { }: FormikHelpers<LogInFormDataType>) {
        const res = await fetch(`${API_URL}/users?email=${values.mail}&password=${values.password}`);
        const user = await res.json();
        console.log(user);
        user.length > 0 && dispatch(logIn());
    } 

    useEffect(() => {
        isAuth && navigate("/desh");
    }, [isAuth, navigate]);

    return (
        <Formik<LogInFormDataType> 
            initialValues={{
                mail: "", 
                password: "", 
            }} 
            validationSchema={validate}
            onSubmit={handleLogin}
        >
            <Form className="flex flex-col">
                <legend className="text-3xl font-mtavruli text-btnLight dark:text-light2 text-center mb-5">შესვლა</legend>
                <label>მეილი</label>
                <Field className="input" type="text" placeholder="შეიყვანე მეილი" name="mail"/>
                <ErrorMessage name="mail" component="span" className="error"/>
                <label>პაროლი</label>
                <Field className="input" type="password" placeholder="შეიყვანე პაროლი" name="password"/>
                <ErrorMessage name="password" component="span" className="error"/>
                <button className="w-full bg-[#3454b4] hover:bg-[#2e4a9e] hover:text-[#d9e1f9] text-[#ecf0fc] font-semibold tracking-[2px] py-2 rounded-lg my-5">შესვლა</button>
            </Form>
        </Formik>
    );
}

export default LogIn;