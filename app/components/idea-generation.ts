import {create} from 'zustand';

type IdeaGenerationState = {
    page: string;
    title: string;
    category: string;
    //newCategory: string;
    titles: string[];
    categories: string[];
    setTitles: (titles :string[]) => void;
    setCategories: (categories: string[]) => void;
    setPage: (pages: string) => void;
    setTitle: (title: string) => void;
    setCategory: (category: string) => void;
    //setNewCategory: (newCategory: string) => void;
};

const useIdeaGenerationStore = create<IdeaGenerationState>((set) => ({
    page: '',
    title: '',
    category: '',
    titles: [],
    categories: [],
  //  newCategory: '',
    setCategory: (category: string) => set(() => ({ category })),
  //  setNewCategory: (newCategory: string) => set(() => ({ newCategory })),
    setTitle: (title: string) => set(() => ({ title })),
    setTitles: (titles: string[]) => set(() => ({ titles })),
    setCategories: (categories: string[]) => set(() => ({ categories })),
    setPage: (page: string) => set(() => ({ page })),
}));

export default useIdeaGenerationStore;
