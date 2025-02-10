import Image from 'next/image'
import Link from 'next/link'
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

    return (
        <Link href={`/products/${product.id}`}>
            <div className="group relative overflow-hidden rounded-lg border bg-background p-2 transition-colors hover:border-foreground">
                <div className="aspect-square overflow-hidden">
                    <Image
                        src={product.images.full[0]}
                        alt={product.name || 'Product image'}
                        width={400}
                        height={400}
                        className="object-cover transition-transform group-hover:scale-105"
                        priority
                    />
                </div>
                <div className="mt-2 space-y-1 font-mono text-sm">
                    <h3 className="font-medium">{product.name.toLowerCase()}</h3>
                    <p className="text-muted-foreground">
                        ${product.price.toFixed(2)}
                    </p>
                </div>
            </div>
        </Link>
    )
} 