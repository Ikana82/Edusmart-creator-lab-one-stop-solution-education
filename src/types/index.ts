export type NavigationTab = 
  | 'dashboard'
  | 'materi-worksheet'
  | 'materi-lkpd'
  | 'materi-media'
  | 'materi-game'
  | 'materi-komik'
  | 'materi-flashcard'
  | 'materi-ebook'
  | 'tool-worksheet'
  | 'tool-lkpd'
  | 'tool-game'
  | 'tool-media'
  | 'tool-storybook'
  | 'tool-komik'
  | 'tool-flashcard'
  | 'tool-storyboard'
  | 'tool-video'
  | 'tool-song'
  | 'video-storyboard'
  | 'video-konsep'
  | 'video-lagu'
  | 'video-voiceover'
  | 'prompt-library'
  | 'ai-directory';

export interface EducationalMaterial {
  id: string;
  title: string;
  category: 'worksheet' | 'lkpd' | 'media' | 'game' | 'komik' | 'flashcard' | 'ebook';
  categoryLabel: string;
  ageGroup: string;
  subject: string;
  description: string;
  thumbnail: string;
  downloadCount: number;
  tags: string[];
  sampleContent?: any;
  promptReady?: string;
}

export interface AiToolItem {
  id: string;
  name: string;
  category: 'image' | 'presentation' | 'game' | 'video' | 'audio' | 'quiz' | 'all-in-one';
  categoryLabel: string;
  description: string;
  bestFor: string;
  url: string;
  pricing: 'Gratis' | 'Freemium' | 'Berbayar';
  icon: string;
  featured?: boolean;
  recommendedWorkflow: string;
}

export interface PromptItem {
  id: string;
  title: string;
  category: 'worksheet' | 'game' | 'presentation' | 'storybook' | 'flashcard' | 'song' | 'video' | 'comic';
  targetAi: string[];
  description: string;
  promptText: string;
  previewImage?: string;
  variables: { name: string; label: string; defaultValue: string }[];
  tags: string[];
}

export type GameFormatType = 'pilihan-ganda' | 'petualangan' | 'cerita';
export type VisualStyleType = 
  | '3D Pixar Style'
  | '3D Clay Animation'
  | '3D Felt Toys'
  | '3D Plastic Toy'
  | 'Watercolor Storybook'
  | 'Paper Cut'
  | 'Flat Cartoon'
  | 'Anime Chibi'
  | '3D Soft Clay Pastel'
  | '3D Crochet / Amigurumi'
  | '3D Clay Glossy (Vibrant & Colorful)'
  | '2d cartoon'
  | 'watercolor'
  | '2d vector education';

export interface GameWizardState {
  step: number;
  topic: string;
  gameFormat: GameFormatType;
  questionCount: number;
  ageGroup: string;
  structure: {
    hasTitlePage: boolean;
    questions: { id: number; title: string; type: string; prompt: string; options: string[]; answer: string }[];
    hasClosingPage: boolean;
  };
  layout: 'Landscape (1920x1080)' | 'Portrait (1080x1920)';
  visualStyle: VisualStyleType;
  language: 'Bahasa Indonesia' | 'English' | 'Dwibahasa (Bilingual)';
  mascotOption: 'ai' | 'describe' | 'upload' | 'none';
  mascotDescription: string;
  mascotName: string;
}

export interface GamePrompterFormState {
  gameTypes: string[];
  language: string;
  topic: string;
  gradeLevel: string;
  age: string;
  questionCount: string;
  pedagogicalGoals: string[];
  visualStyle: string;
  features: string[];
  customInstructions: string;
  targetAiBuilder: string;
}

export interface StorybookWizardState {
  step: number;
  theme: string;
  characterType: 'ai' | 'describe' | 'upload';
  characterName: string;
  characterDescription: string;
  ageGroup: string;
  pageCount: number;
  layout: 'Landscape (3508x2480)' | 'A4 Portrait (2480x3508)' | 'Square (1080x1080)';
  visualStyle: string;
  language: string;
}

export interface MediaSlideWizardState {
  step: number;
  topic: string;
  ageGroup: string;
  layout: 'Landscape (1920 x 1080 px)' | 'Portrait (1080 x 1920 px)';
  visualStyle: VisualStyleType;
  language: string;
  mascotOption: 'ai' | 'describe' | 'upload' | 'none';
  mascotDescription: string;
  slideCount: number;
}

export interface FlashcardWizardState {
  step: number;
  topic: string;
  ageGroup: string;
  cardCount: number; // 8, 16, 24, 32
  language: string;
  visualStyle: string;
}
