import React from 'react'
import Header from '../../components/Header/Header';
import FeaturedProducts from '../../components/Products/Products'
import './Products.css'
// this should the category pages

function Products({title, clientRootUrl}) {

    document.title = `Products - ${title}`;

    return (
        <React.Fragment>
            <Header title = {title} clientRootUrl = {clientRootUrl} />

                {/* <FeaturedProducts checker = {true}>
                    <div className = "row row-2">
                        <h2>All Products</h2>
                        <select>
                            <option>Default Sorting</option>
                            <option>Sort by price</option>
                            <option>Sort by popularity</option>
                            <option>Sort by rating</option>
                            <option>Sort by sale</option>
                        </select>
                    </div>
                </FeaturedProducts> */}
                
        </React.Fragment>
    )
}

export default Products
