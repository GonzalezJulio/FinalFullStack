
import { memo } from 'react'
import './ItemList.css'
import Item from '../Item/Item'

const ItemList = ({ products }) => {
    return(
        <div className='ListGroup'>
            {products.map(prod => <Item key={prod._id} {...prod} />)}
        </div>    
    )
}

export default memo(ItemList)