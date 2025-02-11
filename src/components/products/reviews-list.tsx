import { Review } from '@/types'
import { formatDistanceToNow } from 'date-fns'

interface ReviewsListProps {
    reviews: Review[]
}

export const ReviewsList = ({ reviews }: ReviewsListProps) => {
    return (
        <div className="space-y-6">
            {reviews.map((review) => (
                <div
                    key={review.id}
                    className="rounded-lg border border-neutral-700 bg-cream-100 p-4 space-y-3"
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-0.5 font-mono text-xs">
                                {Array.from({ length: 5 }, (_, i) => (
                                    <span
                                        key={i}
                                        className={i < review.rating ? 'text-walnut-800' : 'text-walnut-200'}
                                    >
                                        ●
                                    </span>
                                ))}
                            </div>
                            <span className="font-medium text-walnut-800">{review.user.name}</span>
                        </div>
                        <span className="text-xs text-walnut-600">
                            {formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}
                        </span>
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-medium text-walnut-800">{review.title}</h3>
                        <p className="text-sm text-walnut-600">{review.content}</p>
                    </div>

                    <div className="flex items-center justify-between text-xs text-walnut-600">
                        <button className="flex items-center gap-1 hover:text-walnut-800">
                            <span>Helpful ({review.helpful})</span>
                        </button>
                        {review.reported && (
                            <span className="text-red-500">⚠️ Reported</span>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
} 