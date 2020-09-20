import React from "react";
import { Link } from "react-router-dom";

class Library extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            drugs: []
        };
    }

    componentDidMount() {
        const url = "/api/v1/drugs/index";
        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then(response => this.setState({ drugs: response }))
            .catch(() => this.props.history.push("/"));
    }

    render(){
        return(
            <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
                <div className="jumbotron jumbotron-fluid bg-transparent">
                    <h1 className="display-4">Drug Library</h1>
                    {
                        this.state.drugs.map((drug)=>{
                            return(
                                <div>
                                    {`${drug.chemicalName}. Class: ${drug.drug_class}`}
                                </div>
                            )
                        })
                    }
                    <Link
                        to="/"
                        className="btn btn-lg custom-button"
                        role="button"
                    >
                        Home Page
                    </Link>
                </div>
            </div>
        )
    }
  
}

export default Library;