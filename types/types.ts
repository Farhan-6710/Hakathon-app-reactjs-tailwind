// types.ts

// Assuming you have a Card type already defined somewhere
export interface Card {
  id: string;
  title: string;
  category: string;
  level: string;
}

// Interface for FilterButton component props
export interface FilterButtonProps {
  categories: string[];
  levels: string[];
  onFilterChange: (filters: { categories: string[]; levels: string[] }) => void;
  onShowAll: () => void;
  showAllChecked: boolean;
}

// Interface for ExploreChallenges component props
export interface ExploreChallengesProps {
  cards: Card[];
  onCardSelect: (card: Card) => void;
  onShowAll: () => void;
  onFilterChange: (filters: { categories: string[]; levels: string[] }) => void;
  showAllChecked: boolean;
}

// Interface for CardsSection component props, if needed
export interface CardsSectionProps {
  // Define any props if needed, for example:
  // title: string;
}
