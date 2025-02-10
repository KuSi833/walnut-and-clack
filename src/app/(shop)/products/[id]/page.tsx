import { notFound } from 'next/navigation'
import Image from 'next/image'
import { products } from '@/data/products'
import { Terminal, Box, Cpu, ChevronRight } from 'lucide-react'

interface ProductPageProps {
    params: {
        id: string
    }
}

export default async function ProductPage({ params }: ProductPageProps) {
    const product = products.find(p => p.id === params.id)

    if (!product) {
        notFound()
    }

    return (
        <div className="container py-8 font-mono">
            <div className="grid gap-8 lg:grid-cols-2">
                {/* Image Section */}
                <div className="relative aspect-square overflow-hidden rounded-lg bg-cream">
                    <Image
                        src={product.images.full[0]}
                        alt={product.name}
                        fill
                        className="object-cover"
                    />
                </div>

                {/* Info Section */}
                <div className="space-y-6 rounded-lg bg-soft-black p-6 text-cream">
                    <div className="flex items-center gap-2">
                        <Terminal className="h-5 w-5 text-emerald-400" />
                        <h1 className="text-2xl font-bold">{product.name}</h1>
                    </div>

                    <div className="space-y-4 text-sm">
                        <div className="rounded border border-cream/10 p-4">
                            <p className="text-emerald-400">$ cat description.txt</p>
                            <p className="mt-2 opacity-80">{product.description}</p>
                        </div>

                        <div className="rounded border border-cream/10 p-4">
                            <p className="text-emerald-400">$ cat specs.json</p>
                            <pre className="mt-2 overflow-x-auto">
                                {`{
    "layout": "${product.details.layout}",
    "base_price": ${product.price},
    "features": [
        ${product.details.features.map(f => `"${f}"`).join(',\n        ')}
    ]
}`}
                            </pre>
                        </div>

                        <div className="rounded border border-cream/10 p-4">
                            <p className="text-emerald-400">$ ls ./wood-options/</p>
                            <div className="mt-2 space-y-2">
                                {product.details.woodOptions.map((wood) => (
                                    <div
                                        key={wood.name}
                                        className="flex items-center justify-between rounded bg-cream/5 px-3 py-2"
                                    >
                                        <div>
                                            <span className="text-walnut">{wood.name}</span>
                                            <p className="text-xs opacity-70">{wood.description}</p>
                                        </div>
                                        <div className="text-xs opacity-70">
                                            +£{wood.priceModifier}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded border border-cream/10 p-4">
                            <p className="text-emerald-400">$ ls ./switches/</p>
                            <div className="mt-2 space-y-1">
                                {product.details.switches.map((switch_) => (
                                    <div
                                        key={switch_}
                                        className="flex items-center gap-2 opacity-80"
                                    >
                                        <ChevronRight className="h-3 w-3" />
                                        {switch_}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <button className="w-full rounded bg-walnut px-4 py-3 text-cream hover:bg-walnut/90">
                        Initialize Build Configuration_
                    </button>
                </div>
            </div>
        </div>
    )
} 