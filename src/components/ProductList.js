import React from 'react'
import ProductCard from './ProductCard'
import withLoading from './Loader'

const ProductList= (props) => {

  const items = props.products.map((product, index) => {
    return (
      <ProductCard
        editInventory={this.editInventory}
        product={product}
        key={index}
      />
    )
  })
  return items
}

export default withLoading(ProductList)
