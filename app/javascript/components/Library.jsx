import React from "react";
import { Link } from "react-router-dom";
import { NewDrug } from "./NewDrug";
import { DrugDetails } from "./DrugDetails";

class Library extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            drugs: [],
            viewDrugID: false
        };
        this.deleteDrug = this.deleteDrug.bind(this);
        this.updateLibrary = this.updateLibrary.bind(this);
        this.viewDrug = this.viewDrug.bind(this);
    }

    componentDidMount() {
        this.updateLibrary()
    }

    updateLibrary(){
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

    deleteDrug(event) {
        const url = `/api/v1/destroy/${event.target.id}`;
        const token = document.querySelector('meta[name="csrf-token"]').content;
    
        fetch(url, {
            method: "DELETE",
            headers: {
                "X-CSRF-Token": token,
                "Content-Type": "application/json"
            }
        })
        .then((response) => {
            if (response.ok) {
                this.updateLibrary()
            }
            //throw new Error("Network response was not ok.");
        })
    }

    viewDrug(event){
        console.log("See drug details of drug id: " + event.target.id)
        this.setState({viewDrugID: event.target.id})
    }

    render(){
        return(
            <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
                <div className="jumbotron jumbotron-fluid bg-transparent">
                    <h1 className="display-4">Drug Library</h1>
                    <NewDrug updateLibrary={this.updateLibrary} />
                    {
                        this.state.drugs.map((drug, i)=>{
                            return(
                                <div key={`Drug${i}`}>
                                    <p>
                                        {`${drug.chemicalName}. Class: ${drug.drug_class}`}
                                    </p>
                                    <button id={drug.id} onClick={this.viewDrug}>See Details</button>
                                    <button id={drug.id} onClick={this.deleteDrug}>Delete {drug.chemicalName}</button>
                                </div>
                            )
                        })
                    }
                    {
                        (()=>{
                            if(this.state.viewDrugID){
                                return(
                                    <DrugDetails drug={this.state.viewDrugID} />
                                )
                            }
                        })()
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