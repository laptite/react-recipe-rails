import React, { Component, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const EditRecipe = (props) => {
  const initialFormState = {
    id: null,
    name: '',
    ingredients: '',
    directions: ''
  }
  const [recipe, setRecipe] = useState(initialFormState)
  const id = props.match.params.id

  const getRecipe = () => {
    fetch(`/api/v1/edit/${id}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network not responding');
      })
      .then(response => setRecipe(response))
      .catch(error => props.history.push('/recipes'));
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!recipe.name) return;
    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(`/api/v1/update/${id}`, {
      method: "PUT",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(recipe)
    })
      .then(response => {
        console.log('response: ', response)
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network not responding');
      })
      .then(response => props.history.push(`/recipe/${response.id}`)
      )
      .catch(error => console.log(error.message));
  }

  useEffect(() => {
    getRecipe();
  }, []);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-12 col-lg-6 offset-lg-3">
          <h1 className="font-weight-normal mb-5">
            Edit Recipe
          </h1>
          <form onSubmit={handleSubmit} >
            <div className="form-group">
              <label htmlFor="recipeName">Name</label>
              <input
                className="form-control"
                type="text"
                id="recipeName"
                name="name"
                value={recipe.name}
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
                value={recipe.ingredients}
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
                value={recipe.directions}
                rows="10"
                onChange={handleInputChange}
                placeholder="Enter recipe preparation details"
              />
            </div>
            <button
              type="submit"
              className="btn custom-button mt-3">Update Recipe
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

export default EditRecipe;
