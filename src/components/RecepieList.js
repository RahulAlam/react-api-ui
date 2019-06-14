import React, { Component } from "react";
import Recipe from "./Recipe";
import RecepieSearch from "./RecepieSearch";

export default class RecepieList extends Component {
  render() {
    const {
      recipes,
      handleDetails,
      value,
      handleChange,
      handleSubmit,
      error
    } = this.props;

    return (
      <React.Fragment>
        <RecepieSearch
          value={value}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
        <div className="container my-5">
          {/* Title  */}
          <div className="row">
            <div className="col-10 mx-auto col-md-6 text-center text-uppercase mb-3">
              <h1 className="text-slanted">recepie list</h1>
            </div>
          </div>
          {/*title end */}
          <div className="row">
            {error ? (
              <h1 className="text-danger text-center">{error}</h1>
            ) : (
              recipes.map(recipe => {
                return (
                  <Recipe
                    key={recipe.recipe_id}
                    recipe={recipe}
                    handleDetails={() => handleDetails(0, recipes.recipe_id)}
                  />
                );
              })
            )}
  
            <div className="container">
              <h1>
                This is a api fetch project using{" "}
                <strong className="text-danger text-slanted">ReactJS</strong>
              </h1>
              <h4>
                The source code of this project is available in github :
                <a
                  href="https://github.com/RahulAlam/react-api-ui"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GITHUB LINK Click Here
                </a>
              </h4>
              <h5>v2.0 Is Coming soon With database and django Backend</h5>
              <h6>contact me : tempfemp@gmail.com </h6>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
