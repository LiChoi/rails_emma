import React from "react";

export class DrugDetails extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            drug: {
                chemicalName: "",
                drug_class: "",
                trade_names: []
            } 
        };
        this.getDrugDetails = this.getDrugDetails.bind(this)
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount() {
        this.getDrugDetails()
    }

    getDrugDetails(){
        const url = "/api/v1/show/" + this.props.drug;
        console.log(url)
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
                    this.setState({ drug: drug })
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
            drug_id: this.props.drug
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

    render(){
        return(
            <div>
                <h1>Drug Details</h1>
                <h2>{this.state.drug.chemicalName}</h2>
                <h3>{this.state.drug.drug_class}</h3>
                <form id="newTradeName" onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="tradeNames">Trade Names: </label>
                        {
                            this.state.drug.trade_names.map((tradeName, i)=>{
                                return (
                                    <div key={i}>
                                        <p>{tradeName}</p>
                                    </div>
                                )
                            })
                        }
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
            </div>
        )
    }
}
