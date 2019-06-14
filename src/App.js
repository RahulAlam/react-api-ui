import React, { Component } from "react";
import "./App.css";
import { recipes } from "./tempList";
import Recepielist from "./components/RecepieList";
import Recepiedetails from "./components/RecepieDetails";
import RecepieSearch from "./components/RecepieSearch";

class App extends Component {
  state = {
    recipes: recipes,
    url: `https://www.food2fork.com/api/search?key=de56cef5d29030682e612e991b847ee7`,
    base_url: `https://www.food2fork.com/api/search?key=de56cef5d29030682e612e991b847ee7`,
    details_id: 0,
    pageIndex: 1,
    search: "",
    query: "&q=",
    error: ""
  };

  async getRecipes() {
    try {
      const data = await fetch(this.state.url);
      const jsonData = await data.json();
      //console.log(jsonData);
      if (jsonData.recipes.length === 0) {
        this.setState(() => {
          return {
            error: "sorry, your search didnot find any results"
          };
        });
      } else {
        this.setState(() => {
          return { recipes: jsonData.recipes };
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  componentDidMount() {
    this.getRecipes();
  }

  displayPage = index => {
    switch (index) {
      default:
      case 1:
        return (
          <Recepielist
            recipes={this.state.recipes}
            handleDetails={this.handleDetails}
            value={this.state.search}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            error={this.state.error}
          />
        );
      case 0:
        return (
          <Recepiedetails
            id={this.state.details_id}
            handleIndex={this.handleIndex}
          />
        );
    }
  };

  handleIndex = index => {
    this.setState({
      pageIndex: index
    });
  };
  handleDetails = (index, id) => {
    this.setState({
      pageIndex: index,
      details_id: id
    });
  };

  handleChange = e => {
    //console.log("hello from handle change");
    this.setState(
      {
        search: e.target.value
      },
      () => {
        console.log(this.state.search);
      }
    );
  };

  handleSubmit = e => {
    e.preventDefault();
    //console.log("hello from handle submit");
    const { base_url, query, search } = this.state;
    this.setState(
      () => {
        return { url: `${base_url}${query}${search}`, search: "" };
      },
      () => {
        this.getRecipes();
      }
    );
  };

  render() {
    console.log(this.state.recipe);
    return (
      <React.Fragment>{this.displayPage(this.state.pageIndex)}</React.Fragment>
    );
  }
}

export default App;
