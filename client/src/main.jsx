//import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloProvider, InMemoryCache, ApolloClient } from '@apollo/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './app';  // Your root app component
import SearchBooks from './pages/SearchBooks';  // Your SearchBooks component
import SavedBooks from './pages/SavedBooks';  // Your SavedBooks componentgit 
import './app.css';  // Your global styles if needed
import 'bootstrap/dist/css/bootstrap.min.css'

// Apollo Client setup
const client = new ApolloClient({
  uri: 'mongodb+srv://dbUser:gzK8sfeDXgiqpkFc@cluster1.ptcdc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1',  
  cache: new InMemoryCache(),
});

// Set up your routes using `createBrowserRouter`
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,  // This will be the wrapper for all routes
    errorElement: <h1 className="display-2">Wrong page!</h1>,
    children: [
      {
        index: true,  // Default route (index route)
        element: <SearchBooks />  // Main page of the app (SearchBooks component)
      },
      {
        path: '/saved',  // Route for saved books
        element: <SavedBooks />  // SavedBooks component
      }
    ]
  }
]);

// Create the root element to mount your app
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render your app with ApolloProvider and RouterProvider
root.render(
  <ApolloProvider client={client}>  {/* Apollo Client provider */}
    <RouterProvider router={router} />  {/* React Router provider */}
  </ApolloProvider>
);
