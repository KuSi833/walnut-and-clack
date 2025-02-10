import Image from 'next/image'
import Link from 'next/link'
import { Star, Users } from 'lucide-react'
import { KeyboardBuild } from '@/types'

interface ProductCardProps {
    product: KeyboardBuild
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
            <div className="group relative overflow-hidden rounded-lg border border-walnut-200 bg-cream-50 transition-all hover:border-walnut-400 hover:shadow-lg">
                <div className="aspect-[4/3] overflow-hidden bg-cream-100">
                    <Image
                        src={product.images.full[0]}
                        alt={product.name || 'Product image'}
                        width={400}
                        height={300}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                        priority
                    />
                </div>
                <div className="space-y-1.5 p-3">
                    <div className="flex items-center justify-between gap-2">
                        <h3 className="font-medium text-walnut-900 line-clamp-1">{product.name}</h3>
                        <p className="whitespace-nowrap font-mono text-sm font-semibold text-walnut-800">
                            £{product.price}
                        </p>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-walnut-600">
                        <div className="flex items-center gap-1">
                            <Star className="h-3.5 w-3.5 fill-walnut-400 text-walnut-400" />
                            <span>{rating}</span>
                            <span className="text-walnut-400">·</span>
                            <Users className="h-3.5 w-3.5" />
                            <span>{reviewCount}</span>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                        {product.features.slice(0, 2).map((feature) => (
                            <span
                                key={feature}
                                className="rounded-full bg-cream-200 px-2 py-0.5 text-xs text-walnut-700"
                            >
                                {feature}
                            </span>
                        ))}
                        <span className="rounded-full bg-cream-200 px-2 py-0.5 text-xs text-walnut-700">
                            {product.keyboardCase.layout}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    )
} 