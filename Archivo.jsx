import { useAsync } from '../../hooks/useAsync'
import { useTitle } from '../../hooks/useTitle'
import { getProducts } from '../../Service/Firebase/firestore/products'

const ItemListContainer = ({ greeting }) => {
    useTitle('Todos los productos', [])

    const { categoryId } = useParams()

    const getProductsWithCategory = () => getProducts(categoryId)

    const { data: products, error, loading } = useAsync(getProductsWithCategory, [categoryId])


    if(loading) {
        return <h1>Cargando productos...</h1>
    }

    if(error) {
        return <h1>Hubo un error al cargas los productos</h1>
    }

    return (
        <div className='ItemListContainer'>
            <h1>{greeting}</h1>
            <ItemList products={products} />
        </div>
    )
}

export default ItemListContainer