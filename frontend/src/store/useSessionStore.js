import { create } from 'zustand';

const initialAnswers = {
  name: '',
  skills: '',
  location: '',
  interests: '',
  budget: '',
  language: 'en',
};

export const useSessionStore = create((set) => ({
  user: null,
  answers: initialAnswers,
  generatedIdeas: [],
  selectedIdea: null,
  loading: false,
  error: null,
  language: 'en',
  setUser: (user) => set({ user }),
  setLanguage: (language) => set({ language, answers: { ...initialAnswers, language } }),
  updateAnswers: (payload) =>
    set((state) => ({ answers: { ...state.answers, ...payload } })),
  setGeneratedIdeas: (ideas) => set({ generatedIdeas: ideas }),
  setSelectedIdea: (idea) => set({ selectedIdea: idea }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  reset: () => set({ answers: initialAnswers, generatedIdeas: [], selectedIdea: null, error: null }),
}));
