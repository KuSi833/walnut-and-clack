import { KeyboardCaseDesign } from "@/types";

export const keyboards_cases: KeyboardCaseDesign[] = [
    {
        id: 'cascade',
        name: 'The Cascade',
        description: 'Inspired by the flowing lines of Pacific Northwest waterfalls, this 65% keyboard brings nature to your desk.',
        price: 249.99,
        layout: '65%',
        images: {
            thumbnail: '/products/kb1.png',
            full: ['/products/kb1.png']
        },
        woodOptions: [
            {
                name: 'Walnut', 
                description: 'Rich, dark tones with straight grain',
                priceModifier: 0
            },
            {
                name: 'Maple',
                description: 'Light, creamy colour with subtle grain', 
                priceModifier: 20
            },
            {
                name: 'Cherry',
                description: 'Warm reddish-brown with fine grain',
                priceModifier: 30
            }
        ],
        features: [
            'Hot-swappable switches',
            'USB-C connection',
            'Foam dampened',
            'Brass weight'
        ],
        tags: ['65%', 'premium', 'hot-swap'],
        reviewStats: {
            averageRating: 0,
            totalReviews: 0
        }
    },
    {
        id: 'summit',
        name: 'The Summit', 
        description: 'A TKL masterpiece that represents the peak of wooden keyboard craftsmanship.',
        price: 299.99,
        layout: 'TKL',
        images: {
            thumbnail: '/products/kb2.png',
            full: ['/products/kb2.png']
        },
        woodOptions: [
            {
                name: 'Walnut',
                description: 'Rich, dark tones with straight grain',
                priceModifier: 0
            },
            {
                name: 'Oak', 
                description: 'Light brown with prominent grain patterns',
                priceModifier: 25
            },
            {
                name: 'Zebra Wood',
                description: 'Exotic striped pattern with unique character',
                priceModifier: 50
            }
        ],
        features: [
            'Hot-swappable switches',
            'USB-C connection',
            'Brass plate',
            'Magnetic feet for angle adjustment'
        ],
        tags: ['TKL', 'premium', 'hot-swap'],
        reviewStats: {
            averageRating: 0,
            totalReviews: 0
        }
    }
]