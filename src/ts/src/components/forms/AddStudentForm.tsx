import React from 'react'
import {Formik} from 'formik'
import {Input, Button, Tag} from 'antd'
import axios, { AxiosError } from 'axios';


type ValuesType = {
    firstName : string,
    lastName : string, 
    email : string,
    gender: string,
}

interface AddStudentFormProps {
  onSuccess? : () => void;
  onFailure? : (err: AxiosError) => void;
}

const InputButtonMargin = {marginBottom:'15px'}
const TagStyle = {backgroundColor: '#f50', color:'white', ...InputButtonMargin}


const AddStudentForm = ({onSuccess, onFailure} : AddStudentFormProps) => {

  return (
    <Formik
      initialValues={{
        firstName : '',
        lastName : '', 
        email : '',
        gender: ''}}
      validate={values => {
        type errorType = {
            firstName?:string,
            lastName?:string,
            gender?:string,
            email?:string,
        }
        let errors: errorType = {}
        // Validate first name
        if (!values.firstName) {
            errors.firstName = 'First name required'
        }

        // Validate last name
        if (!values.lastName) {
            errors.lastName = 'Last name required'
        }

        // Validate gender
        if (!values.gender) {
            errors.gender = 'Gender required'
        } else if (!['MALE', 'FEMALE'].includes(values.gender.toUpperCase())) {
            errors.gender = 'Gender must be MALE or FEMALE'
        }

        // Validate email
        if (!values.email) {
          errors.email = 'Email Required';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address';
        }
        console.log(errors);
        return errors;
      }}
      onSubmit={async (student, { setSubmitting }) => {
        try {
            await axios.post('/students', {
                firstName: student.firstName,
                lastName: student.lastName,
                email: student.email,
                gender: student.gender.toUpperCase()
            })
            alert("Submisson success");
            onSuccess!();
            setSubmitting(false);
        } catch (err) {
            if (err instanceof AxiosError) {
              onFailure!(err);
            } else {
              alert('Submission Failed')
            }
            setSubmitting(false);
        }
        
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        submitForm,
        isValid
        /* and other goodies */
      }) => (
        <form onSubmit={handleSubmit}>
          <Input
            style={InputButtonMargin}
            name="firstName"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.firstName}
            placeholder='first name'
          />
          {errors.firstName && touched.firstName && <Tag style={TagStyle}>{errors.firstName}</Tag>}
          <Input
            style={InputButtonMargin}
            name="lastName"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.lastName}
            placeholder='last name'
          />
          {errors.lastName && touched.lastName && <Tag style={TagStyle}>{errors.lastName}</Tag>}
          <Input
            style={InputButtonMargin}
            name="email"
            type='email'
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            placeholder='email'
          />
          {errors.email && touched.email && <Tag style={TagStyle}>{errors.email}</Tag>}
          <Input
            style={InputButtonMargin} 
            name="gender"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.gender}
            placeholder='gender'
          />
          {errors.gender && touched.gender && <Tag style={TagStyle}>{errors.gender}</Tag>}

          <Button onClick={()=>submitForm()}  disabled={isSubmitting || (touched && !isValid)}>
            Submit
          </Button>
        </form>
      )}
    </Formik>
  )
}

export default AddStudentForm;


