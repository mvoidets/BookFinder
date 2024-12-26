import { useState } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import Auth from '../utils/auth';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';




const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  
  // useMutation hook to handle login
  const [loginUser, { data, loading , error}] = useMutation(LOGIN_USER);
  console.log("Mutation error:", error); // <-- Log any errors related to mutation

 
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log("Form submitted"); // <-- Check if this logs
    // Check form validity before submitting
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    try {
      // Execute the mutation
       const { data} = loginUser({
        variables: userFormData,
      });
  
      console.log("Mutation response data:", data); // Log the response
     console.log("userFormData",userFormData);
     console.log("Data",data);
      // If login is successful, extract token and user from data
      if (data && data.login) {
        const { token, user } = data.login;
        console.log("Logged in user:", user);
        Auth.login(token); // Assuming Auth.login is properly handling the token storage
      }
    } catch (err) {
      console.error("Login error:", err);
      setShowAlert(true); // Display alert for failed login
    }
  };
  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your login credentials!
        </Alert>
        <Form.Group className='mb-3'>
          <Form.Label htmlFor='email'>Email</Form.Label>
          <Form.Control
            type='email' // changed to email for better validation
            placeholder='Your email'
            name='email'
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor='password'>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Your password'
            name='password'
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
        </Form.Group>

        <Button
          disabled={!(userFormData.email && userFormData.password) || loading}
          type='submit'
          variant='success'>
          {loading ? (
            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
          ) : (
            'Submit'
          )}
        </Button>
      </Form>

      {loading && (
        <div className="text-center mt-3">
          <Spinner animation="border" />
        </div>
      )}
    </>
  );
};

export default LoginForm;
