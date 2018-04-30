import React, { Component } from 'react'

class ProductCard extends Component {
	constructor(props) {
		super(props)
		this.state = {
			inventory: {},
      images: this.props.product.images,
      currentImage: this.props.product.images[0]
		}
	}

	handleClick = id => {
		this.editInventory(this.state.inventory.inventory_item_id)
	}

	getInventory(id) {
		fetch(`https://vplusv.herokuapp.com/inventory?item_id=${id}`)
			.then(res => res.json())
			.then(response =>
				this.setState({
					inventory: response.inventory_levels[0]
				})
			)
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
			.then(response =>
				this.setState({
					inventory: response.inventory_level
				})
			)
	}

  handleDropdown = (event) => {
    let id = parseInt(event.target.value, 10)
    const selectedImage = this.state.images.find(image => image.id === id)
    this.setState({
      currentImage: selectedImage
    })
    const selectedItem = this.props.product.variants.find(variant => variant.image_id === id)
    this.getInventory(selectedItem.inventory_item_id)
    // console.log(selectedItem);
  }

	componentDidMount() {
		this.getInventory(this.props.product.variants[0].inventory_item_id)
	}

	render() {
    // console.log(this.state.inventory);
		const colors = this.props.product.variants.map((variant, index) => {
			return <option key={index} value={variant.image_id} >{variant.option2}</option>
		})
		return (
			<div>
				<p>{this.props.product.title}</p>
				<img
					src={this.state.currentImage.src}
					alt={this.state.currentImage.id}
				/><br/>
				<select style={{align: 'center'}} onChange={this.handleDropdown}>{colors}</select>
				<p>Price: ${this.props.product.variants[0].price}</p>
				{this.state.inventory.available > 0 ? (
					<div>
						<p>In Stock: {this.state.inventory.available}</p>
						<button onClick={this.handleClick}>Buy</button>
					</div>
				) : (
					<p>Sold Out</p>
				)}
			</div>
		)
	}
}

export default ProductCard
