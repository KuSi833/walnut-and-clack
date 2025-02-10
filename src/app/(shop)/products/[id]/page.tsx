import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { products } from '@/data/products'
import { Terminal, ChevronRight, ArrowLeft } from 'lucide-react'

interface ProductPageProps {
    params: {
        id: string
    }
}

interface SpecsType {
    layout: string;
    base_price: number;
    features: string[];
}

const formatJSON = (obj: SpecsType) => {
    const jsonString = JSON.stringify(obj, null, 4);
    return jsonString.split('\n').map(line => {
        // Handle different parts of the JSON
        if (line.includes(':')) {
            const [key, value] = line.split(':');
            return `${key}:<span class="text-neutral-50">${value}</span>`;
        }
        if (line.includes('{') || line.includes('}') || line.includes('[') || line.includes(']')) {
            return `<span class="text-neutral-400">${line}</span>`;
        }
        return line;
    }).join('\n');
};

export default async function ProductPage({ params }: ProductPageProps) {
    const product = products.find(p => p.id === params.id)

    if (!product) {
        notFound()
    }

    const specs = {
        layout: product.details.layout,
        base_price: product.price,
        features: product.details.features
    };

    return (
        <div className="container py-8 font-mono">
            <div className="flex justify-end mb-8">
                <Link
                    href="/products"
                    className="inline-flex items-center gap-2 rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2 text-sm text-neutral-200 transition-colors hover:bg-neutral-700"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Store
                </Link>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
                {/* Image Section */}
                <div className="relative aspect-square overflow-hidden rounded-lg border border-neutral-700 bg-neutral-800">
                    <Image
                        src={product.images.full[0]}
                        alt={product.name}
                        fill
                        className="object-cover"
                    />
                </div>

                {/* Info Section */}
                <div className="space-y-6 rounded-lg border border-neutral-700 bg-cream-100 p-6 shadow-lg relative z-30">
                    <div className="flex items-center gap-2 border-b border-neutral-700 pb-4">
                        <Terminal className="h-5 w-5 text-walnut-800" />
                        <h1 className="text-2xl font-bold text-walnut-800">{product.name}</h1>
                    </div>

                    <div className="space-y-4 text-sm">
                        <div className="rounded-lg border border-neutral-700 bg-neutral-900 p-4">
                            <p className="mb-2 font-semibold text-walnut-700">$ cat description.txt</p>
                            <p className="text-neutral-300">{product.description}</p>
                        </div>

                        <div className="rounded-lg border border-neutral-700 bg-neutral-900 p-4">
                            <p className="mb-2 font-semibold text-walnut-700">$ cat specs.json</p>
                            <pre
                                className="overflow-x-auto rounded bg-neutral-950 p-3 text-neutral-400"
                                dangerouslySetInnerHTML={{
                                    __html: formatJSON(specs)
                                }}
                            />
                        </div>

                        <div className="rounded-lg border border-neutral-700 bg-neutral-900 p-4">
                            <p className="mb-2 font-semibold text-walnut-700">$ ls ./wood-options/</p>
                            <div className="space-y-2">
                                {product.details.woodOptions.map((wood) => (
                                    <div
                                        key={wood.name}
                                        className="flex items-center justify-between rounded-md bg-neutral-950 px-3 py-2"
                                    >
                                        <div>
                                            <span className="font-medium text-neutral-200">{wood.name}</span>
                                            <p className="text-xs text-neutral-400">{wood.description}</p>
                                        </div>
                                        <div className="font-mono text-sm text-walnut-700">
                                            +£{wood.priceModifier}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-lg border border-neutral-700 bg-neutral-900 p-4">
                            <p className="mb-2 font-semibold text-walnut-700">$ ls ./switches/</p>
                            <div className="space-y-1">
                                {product.details.switches.map((switch_) => (
                                    <div
                                        key={switch_}
                                        className="flex items-center gap-2 rounded-md bg-neutral-950 px-3 py-2 text-neutral-300"
                                    >
                                        <ChevronRight className="h-3 w-3" />
                                        {switch_}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <button className="w-full rounded-lg bg-walnut-500 px-4 py-3 font-medium text-neutral-50 transition-colors hover:bg-walnut-700">
                        Initialize Build Configuration_
                    </button>
                </div>
            </div>
        </div>
    )
} 