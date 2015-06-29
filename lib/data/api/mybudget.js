import debug from 'debug'
import MyBudget from '../models/mybudget'
import MyBudgetRow from '../models/myBudgetRow'
import Category from '../models/category'
import * as CategoryApi from './category'

let log = debug('presupuesto:data:api:mybudget')
let budgetRows = []


/*
*  Main entry point for creating a MyBudget object to
*  save to mongo.
*/
export function create (data, cb) {
	//console.log('Creating new MyBudget: ', data)
	log(`Creating new MyBudget: %j`, data)

  	extractBudgets(data, function () {
	  	saveMyBudget(function () {
	  		cb()
		})	  
	})
  
}


/*
*  Creates a user budget with budget category rows and a createdAt date time
*  and saves it to mongo.
*/
export function saveMyBudget (cb) {
	//console.log('Saving budget with rows: ', budgetRows)
	log(`Saving budget with rows: %j`, budgetRows)
	
	let userBudget = new MyBudget({rows: budgetRows})
	//console.log('UserBudget created: ', userBudget.rows, userBudget.createdAt)
	log(`UserBudget created: %j %j`, userBudget.rows, userBudget.createdAt)

	// save the user's budget in mongo
	userBudget.save(function (err, data) {
		if (err) return console.error(err);
		//console.log('UserBudget saved: ', data)
		log(`UserBudget saved: %j`, data)
		cb(data)
	})
}


/*
*  Takes the array of categories and amounts sent by the client
*  gets a Category object for each and saves MyBudgetRows in an
*  array of budgets.
*/
export function extractBudgets (budgets, cb) {
	//console.log('Extracting category budgets from: ', budgets)
	log(`Extracting category budgets from: %j`, budgets)
	
	for(var i = 0; i < budgets.length; i++) {
    	let categoryBudget = budgets[i];
    	let categoryId = categoryBudget.id
    	let categoryAmount = new Number(parseFloat(categoryBudget.amount))

    	// get a category by id
    	CategoryApi.getCategoryById(categoryId, 
    		function err() {
	    		//console.log('Error getting category: ', categoryId, err)
	    		log(`Error getting category %j: %j`, categoryId, err)
			    return handleError(res)
    		},
    		function success(data) {
			    //console.log('Category read: ', data)
			    log(`Category read: %j`, data)
			    
			    // instantiate a MyBudgetRow with category and amount
			    let myBudgetRow = new MyBudgetRow({category: data, amount: categoryAmount})
			    //console.log('MyBudgetRow created: ', myBudgetRow.category, myBudgetRow.amount)
			    log(`MyBudgetRow created: %j %j`, myBudgetRow.category, myBudgetRow.amount)
	    		budgetRows.push(myBudgetRow)
	    		
	    		// if all budgets where added, return
	    		if (budgetRows.length == budgets.length) cb()
    		}
    	)
    }
}
	