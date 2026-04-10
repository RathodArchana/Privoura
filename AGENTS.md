# PrivyRec Project Instructions

## Core Values
- **Privacy First:** All user data (interactions, preferences, search history) MUST remain on the user's device. Use `localStorage` for persistence and local logic for recommendations.
- **Sustainability:** Highlight eco-friendly products with the "Eco" badge and emphasize sustainable materials in descriptions.
- **Climate Awareness:** Use local context (weather, time of day) to adjust recommendations.
- **Premium Fashion Aesthetic:** Maintain a high-end, editorial look using the brand palette (Brown, Beige, Teal, Gold) and high-quality imagery.

## Technical Conventions
- **React + Vite:** Use functional components and hooks.
- **Tailwind CSS:** Use utility classes for styling.
- **Motion:** Use `motion/react` for all animations and transitions.
- **Lucide Icons:** Use `lucide-react` for all iconography.
- **Express Backend:** Use the Express server (`server.ts`) for authentication and mock API endpoints.

## UI Patterns
- **Badges:** Use consistent badge styles for "Private", "Eco", and "Climate Match".
- **Cards:** Product cards should be clean, with subtle hover effects and clear call-to-actions.
- **Privacy Dashboard:** Always provide a way for users to view and clear their locally stored data.
