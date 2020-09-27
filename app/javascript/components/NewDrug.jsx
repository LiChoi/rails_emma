import React from "react";

export class NewDrug extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    onSubmit(event) {
        event.preventDefault();
        const url = "/api/v1/drugs/create";
        const { chemicalName, drug_class } = this.state; // assigns variables to corresponding properties in the object

        if (chemicalName.length == 0 || drug_class.length == 0)
            return;

        const body = {
            chemicalName,
            drug_class 
        };

        const token = document.querySelector('meta[name="csrf-token"]').content; // Rails adds a token to the doc, which needs to be present in non-get requests 
        fetch(url, {
            method: "POST",
            headers: {
                "X-CSRF-Token": token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
        .then(response => {
            if (response.ok) {
                this.props.updateLibrary()
                document.getElementById("newDrug").reset()
            }
            //throw new Error("Network response was not ok.");
        })
    }

    render(){
        return(
            <form id="newDrug" onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label htmlFor="chemicalName">Chemical Name</label>
                    <input
                        type="text"
                        name="chemicalName"
                        id="chemicalName"
                        className="form-control"
                        required
                        onChange={this.onChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="drug_class">Drug Class</label>
                    <input
                        type="text"
                        name="drug_class"
                        id="drug_class"
                        className="form-control"
                        required
                        onChange={this.onChange}
                    />
                </div>
                <button type="submit" className="btn custom-button mt-3">
                    Create Drug
                </button>
            </form>
        )
    }
}
