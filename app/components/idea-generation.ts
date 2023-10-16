import {create} from 'zustand';
import { EditorState } from 'draft-js';

type IdeaGenerationState = {
    page: string;
    title: string;
    category: string;
    //newCategory: string;
    titles: string[];
    categories: string[];
    // const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    editorState: EditorState;
    setEditorState: (editorState: EditorState) => void;

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
   editorState: EditorState.createEmpty(),
   setEditorState: (editorState: EditorState) => set(() => ({ editorState })),
   setCategory: (category: string) => set(() => ({ category })),
  //  setNewCategory: (newCategory: string) => set(() => ({ newCategory })),
    setTitle: (title: string) => set(() => ({ title })),
    setTitles: (titles: string[]) => set(() => ({ titles })),
    setCategories: (categories: string[]) => set(() => ({ categories })),
    setPage: (page: string) => set(() => ({ page })),
}));

export default useIdeaGenerationStore;
