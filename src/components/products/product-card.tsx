import Image from 'next/image'
import Link from 'next/link'
import { Star, Users } from 'lucide-react'
import { Product } from '@/types/product'

interface ProductCardProps {
    product: Product
}

export const ProductCard = ({ product }: ProductCardProps) => {
    // Check for images.full instead of images
    if (!product?.images?.full?.[0]) {
        console.warn(`No images found for product: ${product?.name}`)
        return null
    }

    // Generate random review data (in a real app, this would come from the backend)
    const reviewCount = Math.floor(Math.random() * 50) + 10
    const rating = (Math.random() * 1 + 4).toFixed(1) // Random rating between 4.0 and 5.0

    return (
        <Link href={`/products/${product.id}`}>
            <div className="group relative overflow-hidden rounded-lg border border-walnut-200 bg-cream-50 p-4 transition-all hover:border-walnut-400 hover:shadow-lg">
                <div className="aspect-square overflow-hidden rounded-md bg-cream-100">
                    <Image
                        src={product.images.full[0]}
                        alt={product.name || 'Product image'}
                        width={400}
                        height={400}
                        className="object-cover transition-transform group-hover:scale-105"
                        priority
                    />
                </div>
                <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between">
                        <h3 className="font-medium text-walnut-900">{product.name}</h3>
                        <p className="font-mono text-lg font-semibold text-walnut-800">
                            £{product.price}
                        </p>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-walnut-600">
                        <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-walnut-400 text-walnut-400" />
                            <span>{rating}</span>
                            <span className="text-walnut-400">·</span>
                            <Users className="h-4 w-4" />
                            <span>{reviewCount}</span>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {product.details.features.slice(0, 2).map((feature) => (
                            <span
                                key={feature}
                                className="rounded-full bg-cream-200 px-2 py-1 text-xs text-walnut-700"
                            >
                                {feature}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </Link>
    )
} 