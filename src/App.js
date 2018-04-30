import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import ProductCard from './components/ProductCard'

class App extends Component {
	state = {
		products: []
	}

	productsFetch() {
		fetch('https://vplusv.herokuapp.com/list')
			.then(res => res.json())
			.then(items => this.setState({ products: items.products }))
	}

	editInventory(id) {
		let options = {
			method: 'POST',
			headers: {
				Accepts: 'application/json',
				'Content-type': 'application/json'
			},
			body: JSON.stringify({ item_id: id })
		}
		fetch('https://vplusv.herokuapp.com/buy', options)
			.then(res => res.json())
			.then(response => console.log(response))
	}

	componentDidMount() {
		this.productsFetch()
	}

	render() {
		// console.log(this.state.products)
		const items = this.state.products.map((product, index) => {
			return (
				<ProductCard
					editInventory={this.editInventory}
					product={product}
					key={index}
				/>
			)
		})
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h1 className="App-title">Welcome to My Only T-Shirt Shop</h1>
				</header>
				{items}
			</div>
		)
	}
}

export default App
