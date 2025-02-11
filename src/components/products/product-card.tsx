import Image from 'next/image'
import Link from 'next/link'
import { Users } from 'lucide-react'
import { KeyboardCaseDesign } from '@/types'

interface ProductCardProps {
    product: KeyboardCaseDesign
}

export const ProductCard = ({ product }: ProductCardProps) => {
    if (!product?.images?.full?.[0]) {
        console.warn(`No images found for product: ${product?.name}`)
        return null
    }

    const { averageRating, totalReviews } = product.reviewStats

    // Generate progress bar segments
    const progressSegments = Array.from({ length: 5 }, (_, i) => {
        const threshold = (i + 1) * 1 // Each segment represents 0.5 in the rating
        return threshold <= averageRating
    })

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
                <div className="space-y-2.5 p-3">
                    <div className="flex items-center justify-between gap-2">
                        <h3 className="font-medium text-walnut-900 line-clamp-1">{product.name}</h3>
                        <p className="whitespace-nowrap font-mono text-sm font-semibold text-walnut-800">
                            £{product.price}
                        </p>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-0.5 font-mono text-xs">
                                {progressSegments.map((isFilled, index) => (
                                    <span
                                        key={index}
                                        className={isFilled ? 'text-walnut-800' : 'text-walnut-200'}
                                    >
                                        ●
                                    </span>
                                ))}
                                <span className="ml-2 text-walnut-800">{averageRating.toFixed(1)}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-walnut-600">
                            <Users className="h-3.5 w-3.5" />
                            <span>{totalReviews}</span>
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
                            {product.layout}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    )
} 