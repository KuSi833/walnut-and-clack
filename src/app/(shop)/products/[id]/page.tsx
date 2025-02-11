'use client'

import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Terminal, ArrowLeft, Users } from 'lucide-react'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { KeyboardCaseDesign, WoodOption, Review, KeyboardCaseBuild } from '@/types'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/contexts/cart-context'
import { ReviewsList } from '@/components/products/reviews-list'

interface ProductPageProps {
    params: Promise<{ id: string }>
}

interface SpecsType {
    layout: string
    base_price: number
    features: string[]
}

const formatJSON = (obj: SpecsType) => {
    const jsonString = JSON.stringify(obj, null, 4)
    return jsonString.split('\n').map(line => {
        if (line.includes(':')) {
            const [key, value] = line.split(':')
            return `${key}:<span class="text-neutral-50">${value}</span>`
        }
        if (line.includes('{') || line.includes('}') || line.includes('[') || line.includes(']')) {
            return `<span class="text-neutral-400">${line}</span>`
        }
        return line
    }).join('\n')
}

export default function ProductPage({ params }: ProductPageProps) {
    const { data: session } = useSession()
    const router = useRouter()
    const [caseDesign, setCaseDesign] = useState<KeyboardCaseDesign | null>(null)
    const [selectedWood, setSelectedWood] = useState<WoodOption | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [reviews, setReviews] = useState<Review[]>([])
    const { addToCart } = useCart()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { id } = await params
                const [productResponse, reviewsResponse] = await Promise.all([
                    fetch(`/api/products/${id}`),
                    fetch(`/api/products/${id}/reviews`)
                ])

                if (!productResponse.ok) {
                    if (productResponse.status === 404) {
                        notFound()
                    }
                    throw new Error('Failed to fetch product')
                }

                if (!reviewsResponse.ok) {
                    throw new Error('Failed to fetch reviews')
                }

                const productData = await productResponse.json()
                const reviewsData = await reviewsResponse.json()

                setCaseDesign(productData)
                setReviews(reviewsData)

                // Set the default wood option
                if (productData.woodOptions && productData.woodOptions.length > 0) {
                    setSelectedWood(productData.woodOptions[0])
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred')
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
    }, [params])

    if (isLoading) {
        return (
            <div className="container py-8">
                <div className="flex items-center justify-center">
                    <div className="text-lg">Loading...</div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="container py-8">
                <div className="flex items-center justify-center">
                    <div className="text-lg text-red-500">{error}</div>
                </div>
            </div>
        )
    }

    if (!caseDesign) {
        return notFound()
    }

    const specs: SpecsType = {
        layout: caseDesign.layout,
        base_price: Number(caseDesign.price),
        features: caseDesign.features
    }

    const handleAddToCart = async () => {
        if (!session) {
            router.push('/auth/signin')
            return
        }

        if (!selectedWood || !caseDesign) return

        try {
            // Create the build object with all required data
            const build: KeyboardCaseBuild = {
                id: `temp-${Date.now()}`, // Temporary ID, will be replaced by server
                caseDesign: caseDesign,
                selectedWoodOption: selectedWood,
                totalPrice: Number(caseDesign.price) + selectedWood.priceModifier,
            }

            // Add to cart with optimistic updates
            await addToCart(build)
            router.push('/cart')
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to add to cart')
        }
    }

    const RatingDisplay = ({ rating, reviews, compact = false }: {
        rating: number,
        reviews: number,
        compact?: boolean
    }) => {
        const progressSegments = Array.from({ length: 5 }, (_, i) => {
            const threshold = (i + 1) * 1
            return threshold <= rating
        })

        return (
            <div className={cn(
                "flex items-center",
                compact ? "gap-2" : "gap-4"
            )}>
                <div className="flex items-center gap-2">
                    <div className={cn(
                        "flex items-center gap-0.5 font-mono",
                        compact ? "text-xs" : "text-sm"
                    )}>
                        {progressSegments.map((isFilled, index) => (
                            <span
                                key={index}
                                className={isFilled ? 'text-walnut-800' : 'text-walnut-200'}
                            >
                                ●
                            </span>
                        ))}
                        <span className="ml-2 text-walnut-800">{rating.toFixed(1)}</span>
                    </div>
                </div>
                <div className="flex items-center gap-1 text-xs text-walnut-600">
                    <Users className={cn("text-walnut-600", compact ? "h-3 w-3" : "h-3.5 w-3.5")} />
                    <span>{reviews}</span>
                </div>
            </div>
        )
    }

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
                        src={caseDesign.images.full[0]}
                        alt={caseDesign.name}
                        fill
                        className="object-cover"
                    />
                </div>

                {/* Info Section */}
                <div className="space-y-6 rounded-lg border border-neutral-700 bg-cream-100 p-6 shadow-lg relative z-30">
                    <div className="border-b border-neutral-700 pb-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Terminal className="h-5 w-5 text-walnut-800" />
                                <h1 className="text-2xl font-bold text-walnut-800">{caseDesign.name}</h1>
                            </div>
                            <RatingDisplay
                                rating={caseDesign.reviewStats.averageRating}
                                reviews={caseDesign.reviewStats.totalReviews}
                                compact={true}
                            />
                        </div>
                    </div>

                    <div className="space-y-4 text-sm">
                        <div className="rounded-lg border border-neutral-700 bg-neutral-900 p-4">
                            <p className="mb-2 font-semibold text-walnut-700">$ cat description.txt</p>
                            <p className="text-neutral-300">{caseDesign.description}</p>
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
                                {caseDesign.woodOptions.map((wood: WoodOption) => (
                                    <button
                                        key={wood.name}
                                        onClick={() => setSelectedWood(wood)}
                                        className={cn(
                                            "w-full flex items-center justify-between rounded-md bg-neutral-950 px-3 py-2 transition-all",
                                            "hover:ring-2 hover:ring-neutral-700 focus:outline-none focus:ring-2 focus:ring-walnut-500",
                                            selectedWood?.name === wood.name && "ring-2 ring-walnut-500"
                                        )}
                                        aria-pressed={selectedWood?.name === wood.name}
                                    >
                                        <div>
                                            <span className="font-medium text-neutral-200">{wood.name}</span>
                                            <p className="text-xs text-neutral-400">{wood.description}</p>
                                        </div>
                                        <div className="font-mono text-sm text-walnut-700">
                                            +£{wood.priceModifier}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleAddToCart}
                        className="w-full rounded-lg bg-walnut-500 px-4 py-3 font-medium text-neutral-50 transition-colors hover:bg-walnut-700"
                    >
                        Add to Cart (£{Number(caseDesign.price) + (selectedWood?.priceModifier || 0)})
                    </button>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="mt-12 space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-walnut-800">Customer Reviews</h2>
                    <RatingDisplay
                        rating={caseDesign.reviewStats.averageRating}
                        reviews={caseDesign.reviewStats.totalReviews}
                    />
                </div>
                <ReviewsList reviews={reviews} />
            </div>
        </div>
    )
} 