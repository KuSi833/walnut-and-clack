import { KeyboardBuild } from "@/types";

export const keyboards_cases: KeyboardBuild[] = [
    {
        id: 'cascade',
        name: 'The Cascade',
        productType: 'keyboard-build',
        description: 'Inspired by the flowing lines of Pacific Northwest waterfalls, this 65% keyboard brings nature to your desk.',
        price: 249.99,
        images: {
            thumbnail: '/products/kb1.png',
            full: ['/products/kb1.png']
        },
        keyboardCase: {
            productType: 'case',
            layout: '65%',
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
            ]
        },
        switches: ['Cherry MX Brown', 'Cherry MX Blue', 'Cherry MX Red'],
        features: [
            'Hot-swappable switches',
            'USB-C connection',
            'Foam dampened',
            'Brass weight'
        ],
        tags: ['65%', 'premium', 'hot-swap']
    },
    {
        id: 'summit',
        name: 'The Summit', 
        productType: 'keyboard-build',
        description: 'A TKL masterpiece that represents the peak of wooden keyboard craftsmanship.',
        price: 299.99,
        images: {
            thumbnail: '/products/kb2.png',
            full: ['/products/kb2.png']
        },
        keyboardCase: {
            productType: 'case',
            layout: 'TKL',
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
            ]
        },
        switches: ['Cherry MX Brown', 'Cherry MX Blue', 'Cherry MX Red'],
        features: [
            'Hot-swappable switches',
            'USB-C connection',
            'Brass plate',
            'Magnetic feet for angle adjustment'
        ],
        tags: ['TKL', 'premium', 'hot-swap']
    }
]