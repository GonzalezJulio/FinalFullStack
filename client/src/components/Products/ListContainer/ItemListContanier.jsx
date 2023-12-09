import './ItemListContainer.css'
import ItemList from '../ItemList/ItemList'
import { connect } from 'react-redux'
import { useTitle } from '../../../Hook/useTitle'
import { useState, useEffect } from 'react'
const ItemListContainer = ({ greeting }) => {
    const [products, setProducts] = useState([])
    useTitle('Todos los productos', [])
    useEffect(() => {
        fetch('http://localhost:8080/api/products/')
            .then(response => response.json())
            .then(data => setProducts(data))
        }, [])
        return (
            <div className='ItemListContainer'>
                <h1>{greeting}</h1>
                <ItemList products={products} />
            </div>
        )

}

export default ItemListContainer()