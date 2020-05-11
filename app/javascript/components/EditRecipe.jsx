import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class EditRecipe extends Component {
  constructor() {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value});
  }

  onSubmit(event) {
    event.preventDefault();
    const url = "/api/v1/recipes/update/:id";
    const { name, ingredients, directions } = this.state;

    if (name.length === 0 || ingredients.length === 0 || directions.length === 0)
      return;
    
    const body = {
      name,
      ingredients,
      directions: directions.replace(/\n/g, "<br> <br>")
    };
    const token = document.querySelector('meta[name="csrf-token').content;
    fetch(url, {
      method: "PUT",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network not responding');
      })
      .then(response => this.props.history.push(`/recipe/${response.id}`))
      .catch(error => console.log(error.message));
  }

}

export default EditRecipe;