import "./Registration.css";
import { Formik, Form, Field, type FormikHelpers } from 'formik';
import { ErrorMessage } from "formik";
import * as Yup from 'yup';
import { API_URL } from "../../../config";
import { useAppDispatch, useAppSelector } from "../../state/hooks.ts";
import {logIn,logOut} from "../../state/StateSlices/isAuthSlice.ts"

interface FormDataType{
    firstname:string;
    lastname:string;
    mail:string;
    phone:string;
    password:string;
    confirmPassword:string;
}
function Registration(){
    const regExp = {
        alphaBet: /^[a-zA-Zა-ჰ]+$/,
        phone: /^\+?\d{9,15}$/,
        uppercase: /[A-Z]/,
        lowercase: /[a-z]/,
        number: /\d/,
        specialChar: /[@$!%*?&]/,
    };
    const validate = Yup.object().shape({
        firstname: Yup.string()
            .matches(regExp.alphaBet, "ანბანის გარდა სხვა სიმბოლოებს ვერ გამოიყენებ")
            .min(2, "შეიყვანე ორზე მეტი სიმბოლო")
            .max(30, "30-ზე მეტ სიმბოლოს ვერ შეიყვან")
            .required("სახელის ველი სავალდებულოა"),
        lastname: Yup.string()
            .matches(regExp.alphaBet, "ანბანის გარდა სხვა სიმბოლოებს ვერ გამოიყენებ")
            .min(2, "შეიყვანე ორზე მეტი სიმბოლო")
            .max(30, "30-ზე მეტ სიმბოლოს ვერ შეიყვან")
            .required("გვარის ველი სავალდებულოა"),
        mail: Yup.string()
            .email("შეიყვანე სწორი ელ.ფოსტა")
            .required("ელ.ფოსტის ველი სავალდებულოა"),
        phone: Yup.string()
            .matches(regExp.phone, "შეიყვანე სწორი ტელეფონის ნომერი")
            .required("ტელეფონის ველი სავალდებულოა"),
        password: Yup.string()
            .min(8, "პაროლი უნდა იყოს მინიმუმ 8 სიმბოლო")
            .matches(regExp.uppercase, "პაროლი უნდა შეიცავდეს მინიმუმ ერთ დიდ ასოს")
            .matches(regExp.lowercase, "პაროლი უნდა შეიცავდეს მინიმუმ ერთ პატარა ასოს")
            .matches(regExp.number, "პაროლი უნდა შეიცავდეს მინიმუმ ერთ ციფრს")
            .matches(regExp.specialChar, "პაროლი უნდა შეიცავდეს მინიმუმ ერთ სპეციალურ სიმბოლოს")
            .required("პაროლის ველი სავალდებულოა"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password")], "პაროლები არ ემთხვევა")
            .required("გაიმეორე პაროლი"),
    });
    const dispatch=useAppDispatch()
   async function handleSubmmit(values:FormDataType,{ resetForm }: FormikHelpers<FormDataType>){
        const currentData = values;
        const res=await fetch(`${API_URL}/users?email=${currentData.mail}`)
        const isUser=await res.json();
        // console.log(isUser)
        if(isUser.length==0){
             const rec=await fetch(`${API_URL}/users/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(currentData)
            })
            const data=await rec.json()
            console.log(data)
            dispatch(logIn())

        }else{
            console.log("user is registered and this is registered user:", isUser)
        }
       
        resetForm();// იგივეა რაც e.target.reset();
        
    }
    return(
        <Formik<FormDataType> initialValues={{
            firstname: "",
            lastname: "", 
            mail: "", 
            phone: "", 
            password: "", 
            confirmPassword: "", 
        }}
        validationSchema={validate}
        onSubmit={handleSubmmit}>
            <Form >
                <legend className="text-3xl font-mtavruli text-btnLight dark:text-light2 text-center mb-5">რეგისტრაცია</legend>
                <div>
                    <label htmlFor="">სახელი</label>
                    <Field className="input" name="firstname"/>
                    <ErrorMessage name="firstname" component="span" className="error" />
                </div>
                <div>
                    <label htmlFor="">გვარი</label>
                    <Field className="input" name="lastname"/>
                    <ErrorMessage name="lastname" component="span"  className="error" />
                </div>
                <div>
                    <label htmlFor="">მეილი</label>
                    <Field className="input" name="mail"/>
                    <ErrorMessage name="mail" component="span" className="error"  />
                </div>
                <div>
                    <label htmlFor="">ტელეფონი</label>
                    <Field className="input" name="phone"/>
                    <ErrorMessage name="phone" component="span" className="error"  />
                </div>
                <div>
                    <label htmlFor="">პაროლი</label>
                    <Field className="input" name="password"/>
                    <ErrorMessage name="password" component="span" className="error" />
                </div>
                <div>
                    <label htmlFor="">გაიმეორე პაროლი</label>
                    <Field className="input" name="confirmPassword"/>
                    <ErrorMessage name="confirmPassword" component="span" className="error" />
                </div>
                <button className="w-full bg-[#3454b4] hover:bg-[#2e4a9e] hover:text-[#d9e1f9] text-[#ecf0fc] font-semibold tracking-[2px] py-2 rounded-lg my-5" type="submit">რეგისტრაცია</button>
            </Form>
        </Formik>
    )
}

export default Registration;