import React from 'react';
import ReactDOM from 'react-dom';
import TableList from './TableList';
import ChangeForm from './ChangeForm';
import Styles from '../css/ListContainer.css'

class ListContainer extends React.Component{
	constructor(props){
		super(props);

		this.state = {"recipes": [
			{
				"recipeName": "Pie",
				"ingredients" : ["bread", "apples"]
			},
			{
				"recipeName": "Fries",
				"ingredients" : ["potatoes", "oil"]
			}],

			"formDisplay": {display: 'none'},
			"formName": "",
			"formData": "",
			"currentTable": -1
		};

		this.showTarget = this.showTarget.bind(this);
		this.deleteTable = this.deleteTable.bind(this);
		this.showForm = this.showForm.bind(this);
		this.hideForm = this.hideForm.bind(this);
		this.addRecipe = this.addRecipe.bind(this);
		this.formNameChange = this.formNameChange.bind(this);
		this.formDataChange = this.formDataChange.bind(this);
		this.clearForm = this.clearForm.bind(this);
		this.startEdit = this.startEdit.bind(this);
	}

	showTarget(newId){
		console.log(newId);
	}

	deleteTable(tableInd){
		let tmpList = this.state.recipes;
		tmpList.splice(tableInd, 1);
		this.setState({
			"recipes": tmpList
		});
	}

	showForm(e){
		e.preventDefault();
		this.setState({"formDisplay": {display: 'inline'}});
	}

	hideForm(){
		this.setState({"formDisplay": {display: 'none'}});
	}

	addRecipe(recipeObj, tableInd){
		if((recipeObj["recipeName"].length > 0) || (recipeObj["ingredients"].length > 1)){
			let tmpList = this.state.recipes;
			if(arguments.length > 1){
				tmpList.splice(tableInd, 1, recipeObj);
			}
			else{
				tmpList.push(recipeObj);
			}
			console.log(tmpList);
			this.setState({"recipes": tmpList});
		}
		else{return}
	}

	startEdit(ind){
		let tmpList = this.state.recipes[ind];
		this.setState({
			"formDisplay": {display: 'inline'},
			"formName": tmpList.recipeName,
			"formData": tmpList.ingredients,
			"currentTable": ind
		});
	}

	formNameChange(nameVal){
		this.setState({
			"formName": nameVal
		});
	}

	formDataChange(dataVal){
		this.setState({
			"formData": dataVal
		});
	}

	clearForm(){
		this.setState({
			"formName": "",
			"formData": "",
			"currentTable": -1
		})
	}


	render(){
		let rendArr = [];
		rendArr = this.state.recipes.map((recipe, ind) =>
			<TableList key={ind} id={ind} tableName={recipe.recipeName} recipeData={recipe.ingredients} onClick={this.showTarget} onDel={this.deleteTable} onEdit={this.startEdit} />);
		

		return(
			<div id="11" className={Styles.listContainer}> 
				<h1>Recipes List</h1>
				<br />
				{rendArr}
				<button onClick={this.showForm} className="btn btn-primary">Add Recipe</button>
				<ChangeForm id="changeForm" onFormSubmit={this.addRecipe} style={this.state.formDisplay} currTab={this.state.currentTable} onClear={this.clearForm} nameChange={this.formNameChange} dataChange={this.formDataChange} recipeName={this.state.formName} ingredients={this.state.formData} closeForm={this.hideForm} />
			</div>
		);
	}
}

export default ListContainer;

const wrapper = document.getElementById('app');

wrapper ? ReactDOM.render(<ListContainer />, wrapper) : false;