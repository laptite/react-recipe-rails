import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Input from '../components/Input';
import TextArea from '../components/TextArea';
import Button from '../components/Button';

class FormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: {
        name: '', 
        ingredients: '',
        directions: ''
      }
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
    this.stripHtmlEntities = this.stripHtmlEntities.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      match: {
        params: { id }
      }
    } = this.props;

    const url = `/api/v1/show/${id}`;

    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network not responding');
      })
      .then(response => this.props.history.push(`/recipe/${response.id}`))
      .catch(error => console.log(error.messages));
  }

  stripHtmlEntities(str) {
    return String(str)
      .replace(/</g, "&lt;")
      .replace(/</g, "&gt;");
  }

  handleInput(e) {
    let value = e.target.value;
    let name = e.target.name;
    this.setState(prevState => ({
      recipe: { ...prevState.recipe, [name]: value }
    }), () => console.log(this.state.recipe))
  }

  // handleUrl(e) {
  //   let value = e.target.value;
  //   let url = e.target.url;
  //   this.setState( prevState => ({
  //     recipe: { ...prevState.recipe, [url]: value }
  //   }), () => console.log(this.state.recipe))
  // }

  handleFormSubmit(e) {
    e.preventDefault();
    const url = '/api/v1/recipes/create';
    const recipeParams = this.state.recipe;
    const token = document.querySelector('meta[name="csrf-token"').content;

    fetch(url, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(recipeParams)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network not responding');
      })
      .then(response => {
        console.log('this.props: ', this.props);
        console.log('this.props.history', this.props.history);
        return this.props.history.push(`/recipe/${response.id}`)
      })
      .catch(error => console.log(error.message));
  }

  handleClearForm(e) {
    e.preventDefault();
    this.setState({ 
      recipe: {
        name: '',
        ingredients: '',
        directions: ''
      }
    })
  }

  render() {
    return(
      <form className="container-fluid" onSubmit={this.handleFormSubmit}>
        <Input 
          inputType={'text'}
          title={'Recipe'} 
          id={'recipeName'}
          name={'name'}
          value={this.state.recipe.name} 
          placeholder={'Enter recipe name'}
          handleChange={this.handleInput}
        />
        <Input 
          inputType={'text'} 
          title={'Ingredients'} 
          id={'recipeIngredients'}
          name={'ingredients'}
          value={this.state.recipe.ingredients} 
          placeholder={'Enter ingredients separated by a comma'}
          handleChange={this.handleInput}
        />
        <TextArea
          title={'Directions'}
          id={'recipeDirections'}
          name={'directions'}
          value={this.state.recipe.directions}
          rows={10}
          handleChange={this.handleInput}
          placeholder={'Enter recipe preparation details'} 
        />
        <Button
          action={this.handleFormSubmit}
          type={'primary'}
          title={'Submit'}
          style={buttonStyle}
        />
        <Button
          action={this.handleClearForm}
          type={'secondary'}
          title={'Clear'}
          style={buttonStyle}
        />
        <Link to="/recipes" className="btn btn-link mt-3">
          Back to Recipes
        </Link>
      </form>
    )
  }
}

const buttonStyle = { margin : '10px 10px 10px 10px' }

export default FormContainer;
