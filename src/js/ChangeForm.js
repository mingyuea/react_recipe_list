import React from 'react';
import Styles from '../css/ChangeForm.css';

class ChangeForm extends React.Component{
	constructor(props){
		super(props);

		this.handleNameChange = this.handleNameChange.bind(this);
		this.handleIngChange = this.handleIngChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}

	handleNameChange(e){
		const nameVal = e.target.value;
		this.props.nameChange(nameVal);
	}

	handleIngChange(e){
		const ingVal = e.target.value;
		this.props.dataChange(ingVal);
	}

	handleSubmit(e){
		e.preventDefault();
		const delin = /\,\s|\,/g;
		let rIng = this.props.ingredients.split(delin);
		let recipeObj = {"recipeName": this.props.recipeName, "ingredients": rIng};
		new Promise((resolve, reject) => {
			if(this.props.currTab >= 0){
				this.props.onFormSubmit(recipeObj, this.props.currTab);
			}
			else{
				this.props.onFormSubmit(recipeObj);
			}
			return resolve(true);
		})
		.then((res1)=>{
			this.props.closeForm();
			return true;
		})
		.then((res2)=>{
			this.props.onClear()});
	}

	handleClose(e){
		e.preventDefault();
		this.props.onClear();
		this.props.closeForm();
	}

	render(){

		return(
			<div className={Styles.myFormContainer} style={this.props.style}>
				<div className={Styles.myForm}>
					<form onSubmit={this.handleSubmit} >
						<div className="form-group">
							<label>
								Recipe Name: 
							</label>
							<input type="text" className="form-control" value={this.props.recipeName} onChange={this.handleNameChange} />
						</div>
						<div className="form-group">
							<label>
								Ingredients (seperated by commas): 
							</label>
							<input type="text" className="form-control" value={this.props.ingredients} onChange={this.handleIngChange} />
						</div>
						<input type="submit" value="Submit" className="btn btn-primary" />
						<button className="btn btn-default" onClick={this.handleClose}>Close</button>
					</form>
				</div>
			</div>
		);
	}
}

export default ChangeForm;
