# Walnut & Clack

## Artisanal Wooden Keyboard Cases

### Project Overview

An e-commerce platform specialising in bespoke wooden keyboard cases. The platform will focus on delivering a premium shopping experience that reflects the craftsmanship of the products.

### Core Features

1. **Product Showcase**

   - High-resolution image gallery
   - Detailed product specifications
   - Primary material: Walnut wood
   - Keyboard sizes supported:
     - 60\%
     - 65\%
     - 75\%
   - Price information
   - Stock status

2. **User Experience**

   - Responsive design for all devices
   - Advanced filtering system
   - Case size filtering
   - Price range filtering
   - Smooth animations and transitions
   - Dark/Light mode support
   - FiraCode Mono as primary font
   - Custom case request feature with a premium feel

3. **Design System**

   - Minimalist aesthetic
   - Colour palette:
     - Primary: Terminal Black (#000000)
     - Secondary: Soft Black (#1A1A1A)
     - Accent: Command Green (#84cc16)
     - Text: Matrix Green (#4ade80)
     - UI Elements:
       - Border: (#2D2D2D)
       - Hover: (#2A2A2A)
       - Text: (#E5E5E5)
     - Reference: Cream (#FFFDF7) - archived

   **Dark Theme Application**

   ```
   root: Terminal Black background
   ├── cards: Soft Black
   │   ├── command: Command Green
   │   └── output: Matrix Green
   └── elements:
       ├── borders: Dark borders
       └── hover-states: Lighter blacks
   ```

   **UI Philosophy**

   - Full terminal aesthetic with deep blacks
   - Use terminal greens for interactive elements
   - Matrix-inspired color scheme
   - High contrast for readability
   - Minimal use of other colors
   - Command-line inspired interactions

   **Terminal UI Patterns**

   ```
   $ cat description.txt
   > Product description here

   $ cat specs.json
   {
     "layout": "65%",
     "base_price": 249.99
   }

   $ ls ./options/
   > List of available options
   ```

4. **Shopping Features**

   - Shopping cart functionality
   - Secure checkout process with Stripe
   - User accounts
   - Order tracking
   - Wishlist functionality

5. **Technical Stack**
   - NextJS $$14$$ (App Router)
   - TypeScript
   - TailwindCSS
   - Shadcn/ui for components
   - Stripe for payments
   - Authentication system

### Extension Features

Features to be implemented in future iterations:

1. **Product Extensions**

   - Additional wood type options
   - Customisation options (finishes, engravings)
   - Support for more keyboard sizes

2. **Content & Social**

   - Blog section for updates and articles
   - Review and rating system

3. **Logistics**
   - International shipping system
   - Advanced stock management
   - Pre-order capabilities

### Remaining Questions

1. **Business Logic**
   - How should stock management work?
   - Will there be a pre-order system?

### Next Steps

1. Set up the NextJS project with the required dependencies
2. Create a component library and design system
   - Implement grain texture
   - Set up colour system
   - Create base components
3. Implement the core pages and features
4. Set up the authentication and Stripe payment systems
