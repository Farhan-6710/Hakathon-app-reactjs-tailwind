// types.ts
export interface Card {
  id: number;
  imageSrc: string;
  title: string;
  category: string;
  level: string;
  description: string;
}

// Interface for FilterButton component props
export interface FilterButtonProps {
  categories: string[];
  levels: string[];
  onFilterChange: (filters: { categories: string[]; levels: string[] }) => void;
  onShowAll: () => void;
  showAllChecked: boolean;
  filters: { categories: string[]; levels: string[] }; // Add this line
}

// Interface for ExploreChallenges component props
export interface ExploreChallengesProps {
  cards: Card[];
  onCardSelect: (card: Card) => void;
  onShowAll: () => void;
  onFilterChange: (filters: { categories: string[]; levels: string[] }) => void;
  showAllChecked: boolean;
  filters: { categories: string[]; levels: string[] }; // Add this line
}

// Interface for CardsSection component props, if needed
export interface CardsSectionProps {
  // Define any props if needed, for example:
  // title: string;
}
