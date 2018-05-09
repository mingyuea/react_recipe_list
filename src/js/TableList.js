import React from 'react';

class TableList extends React.Component{
	constructor(props){
		super(props);

		this.handleChange = this.handleChange.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
	}

	handleChange(e){
		const tableName = e.target.parentNode.parentNode.parentNode.parentNode.id;
		this.props.onEdit(tableName);
	}

	handleDelete(e){
		const tableName = e.target.parentNode.parentNode.parentNode.parentNode.id;
		this.props.onDel(tableName);
	}

	render(){
		let ingList = this.props.recipeData.map((elem, ind) => <li key={"tab"+this.props.id+"ing"+ind}>{elem}</li>);
		return(
			<table id={this.props.id} className="table">
				<tbody>
					<tr>
						<td><h5>{this.props.tableName}</h5></td>
					</tr>
					<tr>
						<td>Ingredients:
							<ul>{ingList}</ul>
						</td>
					</tr>
					<tr>
						<td>
							<button className="btn btn-primary" onClick={this.handleChange}>Edit Recipe</button>
							<button className="btn btn-default" onClick={this.handleDelete}>Delete Recipe</button>
						</td>
					</tr>
				</tbody>
			</table>
		);
	}
}

export default TableList;