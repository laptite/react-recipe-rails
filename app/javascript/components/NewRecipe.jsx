import React from 'react';
import FormContainer from '../containers/FormContainer';
import { Link } from 'react-router-dom';

const NewRecipe = () => (
  <div className="container mt-5">
    <div className="row">
      <div className="col-sm-12 col-lg-6 offset-lg-3">
        <h1 className="font-weight-normal mb-5">
          Add a new recipe to our awesome recipe collection.
        </h1>
        <FormContainer />
      </div>
    </div>
  </div>
);

export default NewRecipe;
