import { keyboards_cases } from '@/data/products'
import { ProductCard } from '@/components/products/product-card'

export default function ProductsPage() {
    return (
        <div className="container py-8">
            <h1 className="mb-8 text-3xl font-bold">Developer Phone Cases</h1>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {keyboards_cases.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    )
} 