import React from "react";
import { Link } from "react-router-dom"
import {setDrugDetails} from "./actions"
import { connect } from "react-redux"


class DrugDetails extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
        this.getDrugDetails = this.getDrugDetails.bind(this)
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.onSubmitCrossAllergy = this.onSubmitCrossAllergy.bind(this)
        this.deleteTradeName = this.deleteTradeName.bind(this)
        this.deleteCrossAllergy = this.deleteCrossAllergy.bind(this)
        this.onSubmitInteraction = this.onSubmitInteraction.bind(this)
        this.deleteInteraction = this.deleteInteraction.bind(this)
    }

    componentDidMount() {
        this.getDrugDetails()
    }

    getDrugDetails(){3
        const drugID = this.props.viewDrugID
        const url = "/api/v1/show/" + drugID 
        console.log(url)
        if(!drugID){
            // Refreshing resets state and redux store! So handle it elegantly by redirecting back to library
            window.location.href = '/library'
            return
        }
        fetch(url)
        .then(response => {
            if (response.ok) {
                response.json().then((data)=>{
                    let drug = data
                    console.log("response was ok")
                    console.log("setting state")
                    console.log(drug)
                    console.log(drug.chemicalName)
                    console.log(drug.drug_class)
                    console.log(drug.trade_names)
                    //this.setState({ drug: drug })
                    this.props.setDrugDetails(drug)
                })
            }
        })
    }

    onChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    onSubmit(event) {
        event.preventDefault();
        const url = "/api/v1/trade_names/create";
        const { trade_name } = this.state; // assigns variables to corresponding properties in the object

        if ( trade_name.length == 0)
            return;

        const body = {
            trade_name: trade_name,
            drug_id: this.props.viewDrugID
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
                this.getDrugDetails()
                document.getElementById("trade_name").value = ""
            }
        })
    }

    onSubmitCrossAllergy(event) {
        event.preventDefault();
        const url = "/api/v1/cross_allergies/create";
        const { cross_allergy } = this.state; // assigns variables to corresponding properties in the object

        if ( cross_allergy.length == 0)
            return;

        const body = {
            cross_allergy: cross_allergy,
            drug_id: this.props.viewDrugID
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
                this.getDrugDetails()
                document.getElementById("cross_allergy").value = ""
            }
        })
    }

    deleteTradeName(event){
        event.preventDefault();
        const url = "/api/v1/trade_names/destroy/" + event.target.id
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
                this.getDrugDetails()
            }
        })
    }

    deleteCrossAllergy(event){
        event.preventDefault();
        const url = "/api/v1/cross_allergies/destroy/" + event.target.id
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
                this.getDrugDetails()
            }
        })
    }

    onSubmitInteraction(event) {
        event.preventDefault();
        const url = "/api/v1/interactions/create";
        const { interaction_tag, interaction_tag_type, interaction_severity, interaction_effect } = this.state; // assigns variables to corresponding properties in the object

        if ( interaction_tag.length == 0 || interaction_tag_type.length == 0 || interaction_severity.length == 0 || interaction_effect == 0)
            return;

        const body = {
            tag: interaction_tag,
            tag_type: interaction_tag_type,
            severity: interaction_severity,
            effect: interaction_effect,
            drug_id: this.props.viewDrugID
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
                this.getDrugDetails()
                document.getElementById("interaction_tag").value = ""
                document.getElementById("interaction_tag_type").value = ""
                document.getElementById("interaction_severity").value = ""
                document.getElementById("interaction_effect").value = ""
            }
        })
    }

    deleteInteraction(event){
        event.preventDefault();
        const url = "/api/v1/interactions/destroy/" + event.target.id
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
                this.getDrugDetails()
            }
        })
    }

    render(){
        return(
            <div>
                <h1>Drug Details</h1>
                <h2>{this.props.drug.chemicalName}</h2>
                <h3>{this.props.drug.drug_class}</h3>
                <label htmlFor="tradeNames">Trade Names: </label>
                {
                    this.props.drug.trade_names.map((tradeName, i)=>{
                        return (
                            <div key={i}>
                                <p>{tradeName.trade_name}</p>
                                <button id={tradeName.id} onClick={this.deleteTradeName}>Delete</button>
                            </div>
                        )
                    })
                }
                <form id="newTradeName" onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            name="trade_name"
                            id="trade_name"
                            className="form-control"
                            required
                            onChange={this.onChange}
                        />
                    </div>
                    <button type="submit" className="btn custom-button mt-3">
                        Add Trade Name
                    </button>
                </form>
                <label htmlFor="crossAllergies">Cross Allergies: </label>
                {
                    this.props.drug.cross_allergies.map((cross_allergy, i)=>{
                        return (
                            <div key={i}>
                                <p>{cross_allergy.cross_allergy}</p>
                                <button id={cross_allergy.id} onClick={this.deleteCrossAllergy}>Delete</button>
                            </div>
                        )
                    })
                }
                <form id="newCrossAllergy" onSubmit={this.onSubmitCrossAllergy}>
                    <div className="form-group">
                        <input
                            type="text"
                            name="cross_allergy"
                            id="cross_allergy"
                            className="form-control"
                            required
                            onChange={this.onChange}
                        />
                    </div>
                    <button type="submit" className="btn custom-button mt-3">
                        Add Cross Allergy
                    </button>
                </form>
                <label htmlFor="interactions">Interactions: </label>
                {
                    this.props.drug.interactions.map((interaction, i)=>{
                        return (
                            <div key={i}>
                                <p>{interaction.tag_type}: {interaction.tag}</p>
                                <p>Effect: {interaction.effect}</p>
                                <p>Severity: {interaction.severity}</p>
                                <button id={interaction.id} onClick={this.deleteInteraction}>Delete</button>
                            </div>
                        )
                    })
                }
                <form id="newInteraction" onSubmit={this.onSubmitInteraction}>
                    <div>Add new interaction here:</div>
                    <div className="form-group">
                        <label>Tag</label>
                        <input
                            type="text"
                            name="interaction_tag"
                            id="interaction_tag"
                            className="form-control"
                            required
                            onChange={this.onChange}
                        />
                        <label>Tag Type</label>
                        <input
                            type="text"
                            name="interaction_tag_type"
                            id="interaction_tag_type"
                            className="form-control"
                            required
                            onChange={this.onChange}
                        />
                        <label>Severity</label>
                        <input
                            type="text"
                            name="interaction_severity"
                            id="interaction_severity"
                            className="form-control"
                            required
                            onChange={this.onChange}
                        />
                        <label>Effect</label>
                        <input
                            type="text"
                            name="interaction_effect"
                            id="interaction_effect"
                            className="form-control"
                            required
                            onChange={this.onChange}
                        />
                    </div>
                    <button type="submit" className="btn custom-button mt-3">
                        Add Interaction
                    </button>
                </form>
                <Link
                    to="/library"
                    className="btn btn-lg custom-button"
                    role="button"
                >
                    Back to Library
                </Link>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        drug: state.drug,
        viewDrugID: state.viewDrugID
    }
}

const mapDispatchToProps = {
    setDrugDetails
}

export default connect(mapStateToProps, mapDispatchToProps)(DrugDetails) 