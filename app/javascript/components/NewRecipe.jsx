import React, { useState } from 'react';
import FormContainer from '../containers/FormContainer';
import { Link } from 'react-router-dom';

const NewRecipe = (props) => {

  const [recipe, setRecipe] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!recipe.name) return;
    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch('/api/v1/recipes/create', {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(recipe)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network not responding');
      })
      .then(response => props.history.push(`/recipe/${response.id}`)
      )
      .catch(error => console.log(error.message));
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-12 col-lg-6 offset-lg-3">
          <h1 className="font-weight-normal mb-5">
            Add a new recipe to our awesome recipe collection.
          </h1>
          <form onSubmit={handleSubmit} >
            <div className="form-group">
              <label htmlFor="recipeName">Name</label>
              <input 
                className="form-control"
                type="text" 
                id="recipeName"
                name="name"
                required
                onChange={handleInputChange} 
              />
            </div>
            <div className="form-group">
              <label htmlFor="recipeIngredients">Ingredients</label>
              <input 
                className="form-control"
                type="text" 
                id="recipeIngredients"
                name="ingredients"
                onChange={handleInputChange}
                placeholder="Separate each ingredient with a comma" 
              />
            </div>
            <div className="form-group">
              <label htmlFor="recipeDirections">Directions</label>
              <textarea
                className="form-control"
                id="recipeDirections"
                name="directions"
                rows="10"
                onChange={handleInputChange}
                placeholder="Enter recipe preparation details"
              />
            </div>
            <button
              type="submit"
              className="btn custom-button mt-3">Create Recipe
            </button>
            <Link 
              to="/recipes" 
              className="btn btn-link mt-3">Back to recipes
            </Link>
          </form>
        </div>
      </div>
    </div>
  )
}

export default NewRecipe;
