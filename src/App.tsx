/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { NavigationTab } from './types';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { DashboardView } from './components/dashboard/DashboardView';
import { MateriEdukasiView } from './components/materi/MateriEdukasiView';
import { GameGeneratorView } from './components/tools/GameGeneratorView';
import { WorksheetStudioView } from './components/tools/WorksheetStudioView';
import { MediaPembelajaranView } from './components/tools/MediaPembelajaranView';
import { StorybookGeneratorView } from './components/tools/StorybookGeneratorView';
import { FlashcardGeneratorView } from './components/tools/FlashcardGeneratorView';
import { LkpdGeneratorView } from './components/tools/LkpdGeneratorView';
import { KomikGeneratorView } from './components/tools/KomikGeneratorView';
import { VideoAudioView } from './components/tools/VideoAudioView';
import { PromptLibraryView } from './components/library/PromptLibraryView';
import { AiToolsDirectoryView } from './components/directory/AiToolsDirectoryView';
import { QuickSearchModal } from './components/common/QuickSearchModal';

function AppContent() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { themeConfig } = useTheme();

  const handleResetAll = () => {
    const confirmReset = window.confirm("Apakah Anda yakin ingin mengatur ulang semua data input dan kembali ke halaman utama?");
    if (confirmReset) {
      try {
        localStorage.removeItem('edusmart_theme');
      } catch {}
      // Perform a clean state reset and navigate back to root dashboard
      window.location.href = window.location.origin + window.location.pathname;
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView onNavigate={(tab) => setActiveTab(tab)} />;
      
      // Submenu Materi Edukasi with Active Synchronized Category Tabs
      case 'materi-worksheet':
        return <MateriEdukasiView initialCategory="worksheet" onNavigateToTool={(t) => setActiveTab(t)} onCategoryChange={(t) => setActiveTab(t)} />;
      case 'materi-lkpd':
        return <MateriEdukasiView initialCategory="lkpd" onNavigateToTool={(t) => setActiveTab(t)} onCategoryChange={(t) => setActiveTab(t)} />;
      case 'materi-media':
        return <MateriEdukasiView initialCategory="media" onNavigateToTool={(t) => setActiveTab(t)} onCategoryChange={(t) => setActiveTab(t)} />;
      case 'materi-game':
        return <MateriEdukasiView initialCategory="game" onNavigateToTool={(t) => setActiveTab(t)} onCategoryChange={(t) => setActiveTab(t)} />;
      case 'materi-komik':
        return <MateriEdukasiView initialCategory="komik" onNavigateToTool={(t) => setActiveTab(t)} onCategoryChange={(t) => setActiveTab(t)} />;
      case 'materi-flashcard':
        return <MateriEdukasiView initialCategory="flashcard" onNavigateToTool={(t) => setActiveTab(t)} onCategoryChange={(t) => setActiveTab(t)} />;
      case 'materi-ebook':
        return <MateriEdukasiView initialCategory="ebook" onNavigateToTool={(t) => setActiveTab(t)} onCategoryChange={(t) => setActiveTab(t)} />;

      // Submenu Tools AI Edukasi
      case 'tool-game':
        return <GameGeneratorView />;
      case 'tool-worksheet':
        return <WorksheetStudioView />;
      case 'tool-media':
        return <MediaPembelajaranView />;
      case 'tool-storybook':
        return <StorybookGeneratorView />;
      case 'tool-flashcard':
        return <FlashcardGeneratorView />;
      case 'tool-lkpd':
        return <LkpdGeneratorView />;
      case 'tool-komik':
        return <KomikGeneratorView />;
      case 'tool-song':
        return <VideoAudioView initialSubTab="lagu" />;
      case 'tool-video':
        return <VideoAudioView initialSubTab="storyboard" />;

      // Submenu Video & Audio
      case 'video-storyboard':
        return <VideoAudioView initialSubTab="storyboard" />;
      case 'video-konsep':
        return <VideoAudioView initialSubTab="storyboard" />;
      case 'video-lagu':
        return <VideoAudioView initialSubTab="lagu" />;
      case 'video-voiceover':
        return <VideoAudioView initialSubTab="voiceover" />;

      // Prompt Library & Directory
      case 'prompt-library':
        return <PromptLibraryView onNavigateToTool={(t) => setActiveTab(t)} />;
      case 'ai-directory':
        return <AiToolsDirectoryView />;

      default:
        return <DashboardView onNavigate={(tab) => setActiveTab(tab)} />;
    }
  };

  return (
    <div className={`flex min-h-screen ${themeConfig.bgLighter} text-slate-800 transition-colors duration-300`}>
      {/* Desktop & Mobile Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={(tab) => setActiveTab(tab)}
        isOpenMobile={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      {/* Main View Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          activeTab={activeTab}
          onSelectTab={(tab) => setActiveTab(tab)}
          onOpenMobile={() => setIsMobileMenuOpen(true)}
          onOpenSearch={() => setIsSearchOpen(true)}
          onReset={handleResetAll}
        />

        <main className="flex-1 p-4 lg:p-8 max-w-7xl w-full mx-auto">
          {renderContent()}
        </main>
      </div>

      {/* Quick Search Modal (Ctrl+K) */}
      <QuickSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectTab={(tab) => setActiveTab(tab)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
