// types.ts
import { Card } from "@/types/types"; // Adjust the import path as necessary

// Interface for the FilterButton component props
export interface FilterButtonProps {
  categories: string[];
  levels: string[];
  onFilterChange: (filters: { categories: string[]; levels: string[] }) => void;
  onShowAll: () => void;
  showAllChecked: boolean; // Added this to match the usage
}

// Interface for the ExploreChallenges component props
export interface ExploreChallengesProps {
  cards: Card[];
  onCardSelect: (card: Card) => void;
  onShowAll: () => void;
  onFilterChange: (filters: { categories: string[]; levels: string[] }) => void;
  showAllChecked: boolean; // Added this to match the usage
}

// Interface for the CardsSection component props
// Since CardsSection doesn't have props in your current implementation, you don't need to define it, but here's how you'd do it if needed
export interface CardsSectionProps {
  // Define any props you need here
}
