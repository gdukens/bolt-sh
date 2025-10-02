import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { BottomNavigation } from './components/BottomNavigation';
import { DraggableFAB } from './components/DraggableFAB';
import { LoadingScreen } from './components/LoadingScreen';
import { LoginScreen } from './components/screens/LoginScreen';
import { SignUpScreen } from './components/screens/SignUpScreen';
import { ForgotPasswordScreen } from './components/screens/ForgotPasswordScreen';
import { Sidebar } from './components/Sidebar';
import { HomeScreen } from './components/screens/HomeScreen';
import { ConnectionsScreen } from './components/screens/ConnectionsScreen';
import { InfinityScreen } from './components/screens/InfinityScreen';
import { EducationScreen } from './components/screens/EducationScreen';
import { NotificationsScreen } from './components/screens/NotificationsScreen';
import { ProfileScreen } from './components/screens/ProfileScreen';
import { MessagesScreen } from './components/screens/MessagesScreen';
import { CameraScreen } from './components/screens/CameraScreen';
import { AvatarStudioScreen } from './components/screens/AvatarStudioScreen';
import { CreatePostScreen } from './components/screens/CreatePostScreen';
import { SearchScreen } from './components/screens/SearchScreen';
import { SettingsScreen } from './components/screens/SettingsScreen';
import { AccessibilitySettingsScreen } from './components/screens/AccessibilitySettingsScreen';
import { DevicePairingScreen } from './components/screens/DevicePairingScreen';
import { EmergencySOSScreen } from './components/screens/EmergencySOSScreen';
import { CourseDetailScreen } from './components/screens/CourseDetailScreen';
import { SignCaptureScreen } from './components/screens/SignCaptureScreen';
import { LanguageSettingsScreen } from './components/screens/LanguageSettingsScreen';
import { UserProfileScreen } from './components/screens/UserProfileScreen';
import { PostDetailScreen } from './components/screens/PostDetailScreen';
import { CompanyPageScreen } from './components/screens/CompanyPageScreen';
import { CommunityScreen } from './components/screens/CommunityScreen';
import { JobDetailScreen } from './components/screens/JobDetailScreen';
import { ChatDetailScreen } from './components/screens/ChatDetailScreen';
import { ProfileEditScreen } from './components/screens/ProfileEditScreen';
import { HelpSupportScreen } from './components/screens/HelpSupportScreen';
import { PrivacySettingsScreen } from './components/screens/PrivacySettingsScreen';
import { OnboardingScreen } from './components/screens/OnboardingScreen';
import type { OnboardingData } from './components/screens/OnboardingScreen';
import { WalkthroughGuide } from './components/WalkthroughGuide';
import { ErrorBoundary } from './components/ErrorBoundary';

export type Screen = 
  | 'home' 
  | 'connections' 
  | 'infinity' 
  | 'education' 
  | 'notifications'
  | 'profile'
  | 'messages'
  | 'camera'
  | 'avatar-studio'
  | 'create-post'
  | 'search'
  | 'settings'
  | 'accessibility-settings'
  | 'privacy-settings'
  | 'device-pairing'
  | 'emergency-sos'
  | 'course-detail'
  | 'user-profile'
  | 'post-detail'
  | 'company-page'
  | 'community'
  | 'job-detail'
  | 'chat-detail'
  | 'help-support'
  | 'profile-edit'
  | 'language-settings'
  | 'sign-capture';

export type FABMode = 'sign-capture' | 'avatar' | 'speech-to-text' | 'text-to-speech' | null;
export type AuthScreen = 'login' | 'signup' | 'forgot-password';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [needsOnboarding, setNeedsOnboarding] = useState(false);
  const [showWalkthrough, setShowWalkthrough] = useState(false);
  const [authScreen, setAuthScreen] = useState<AuthScreen>('login');
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [activeFABMode, setActiveFABMode] = useState<FABMode>(null);
  const [showSidebar, setShowSidebar] = useState(false);

  
  // Settings state
  const [signLanguage, setSignLanguage] = useState('ASL');
  const [spokenLanguage, setSpokenLanguage] = useState('English');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check for existing auth and onboarding on mount
  useEffect(() => {
    const userEmail = localStorage.getItem('arkan_user_email');
    const onboardingCompleted = localStorage.getItem('arkan_onboarding_completed');
    const walkthroughCompleted = localStorage.getItem('arkan_walkthrough_completed');
    const onboardingData = localStorage.getItem('arkan_onboarding_data');
    
    if (userEmail) {
      setIsAuthenticated(true);
      
      // Load language preferences from onboarding if available
      if (onboardingData) {
        try {
          const data = JSON.parse(onboardingData) as OnboardingData;
          if (data.signLanguage) setSignLanguage(data.signLanguage);
          if (data.spokenLanguage) setSpokenLanguage(data.spokenLanguage);
        } catch (e) {
          console.warn('Failed to parse onboarding data');
        }
      }
      
      // Check if user needs to complete onboarding
      if (!onboardingCompleted) {
        setNeedsOnboarding(true);
      } else if (!walkthroughCompleted) {
        // Show walkthrough after onboarding is complete with delay
        setTimeout(() => {
          setShowWalkthrough(true);
        }, 1500);
      }
    }
  }, []);

  // Apply theme changes to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Auto-navigate to sign capture when FAB mode is activated
  useEffect(() => {
    if (activeFABMode === 'sign-capture' && currentScreen !== 'sign-capture') {
      setCurrentScreen('sign-capture');
    }
  }, [activeFABMode]);



  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen activeFABMode={activeFABMode} onNavigate={setCurrentScreen} />;
      case 'connections':
        return <ConnectionsScreen onNavigate={setCurrentScreen} />;
      case 'infinity':
        return <InfinityScreen onNavigate={setCurrentScreen} />;
      case 'education':
        return <EducationScreen onNavigate={setCurrentScreen} />;
      case 'notifications':
        return <NotificationsScreen />;
      case 'profile':
        return <ProfileScreen onNavigate={setCurrentScreen} />;
      case 'messages':
        return <MessagesScreen onNavigate={setCurrentScreen} />;
      case 'camera':
        return <CameraScreen onBack={() => setCurrentScreen('home')} />;
      case 'avatar-studio':
        return <AvatarStudioScreen onBack={() => setCurrentScreen('profile')} />;
      case 'create-post':
        return <CreatePostScreen onBack={() => setCurrentScreen('home')} />;
      case 'search':
        return <SearchScreen onBack={() => setCurrentScreen('home')} onNavigate={setCurrentScreen} />;
      case 'settings':
        return (
          <SettingsScreen 
            onBack={() => setCurrentScreen('home')} 
            onNavigate={setCurrentScreen}
            isDarkMode={isDarkMode}
            onThemeChange={setIsDarkMode}
            onRestartWalkthrough={() => setShowWalkthrough(true)}
          />
        );
      case 'accessibility-settings':
        return <AccessibilitySettingsScreen onBack={() => setCurrentScreen('settings')} />;
      case 'device-pairing':
        return <DevicePairingScreen onBack={() => setCurrentScreen('settings')} />;
      case 'emergency-sos':
        return <EmergencySOSScreen onBack={() => setCurrentScreen('settings')} />;
      case 'language-settings':
        return (
          <LanguageSettingsScreen 
            onBack={() => setCurrentScreen('settings')}
            signLanguage={signLanguage}
            onSignLanguageChange={setSignLanguage}
            spokenLanguage={spokenLanguage}
            onSpokenLanguageChange={setSpokenLanguage}
          />
        );
      case 'course-detail':
        return <CourseDetailScreen onBack={() => setCurrentScreen('education')} />;
      case 'user-profile':
        return <UserProfileScreen onBack={() => setCurrentScreen('home')} onNavigate={setCurrentScreen} />;
      case 'post-detail':
        return <PostDetailScreen onBack={() => setCurrentScreen('home')} onNavigate={setCurrentScreen} />;
      case 'company-page':
        return <CompanyPageScreen onBack={() => setCurrentScreen('home')} onNavigate={setCurrentScreen} />;
      case 'community':
        return <CommunityScreen onBack={() => setCurrentScreen('home')} onNavigate={setCurrentScreen} />;
      case 'job-detail':
        return <JobDetailScreen onBack={() => setCurrentScreen('infinity')} onNavigate={setCurrentScreen} />;
      case 'chat-detail':
        return <ChatDetailScreen onBack={() => setCurrentScreen('messages')} onNavigate={setCurrentScreen} />;
      case 'profile-edit':
        return <ProfileEditScreen onBack={() => setCurrentScreen('profile')} />;
      case 'help-support':
        return <HelpSupportScreen onBack={() => setCurrentScreen('settings')} onNavigate={setCurrentScreen} />;
      case 'privacy-settings':
        return <PrivacySettingsScreen onBack={() => setCurrentScreen('settings')} />;
      case 'sign-capture':
        return (
          <SignCaptureScreen 
            onBack={() => {
              setCurrentScreen('home');
              setActiveFABMode(null);
            }}
            onComplete={(data) => {
              console.log('Sign capture completed:', data);
              setCurrentScreen('home');
              setActiveFABMode(null);
            }}
          />
        );
      default:
        return <HomeScreen activeFABMode={activeFABMode} onNavigate={setCurrentScreen} />;
    }
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setAuthScreen('login');
  };

  const handleSignUpSuccess = () => {
    setIsAuthenticated(true);
    setNeedsOnboarding(true); // New users need onboarding
    setAuthScreen('login');
  };

  const handleOnboardingComplete = (data: OnboardingData) => {
    // Update language preferences from onboarding
    if (data.signLanguage) setSignLanguage(data.signLanguage);
    if (data.spokenLanguage) setSpokenLanguage(data.spokenLanguage);
    setNeedsOnboarding(false);
    
    // Show walkthrough after onboarding with longer delay to ensure UI is rendered
    setTimeout(() => {
      setShowWalkthrough(true);
    }, 1000);
  };

  const handleWalkthroughComplete = () => {
    setShowWalkthrough(false);
  };

  const handleWalkthroughSkip = () => {
    setShowWalkthrough(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('arkan_user_email');
    localStorage.removeItem('arkan_user_name');
    localStorage.removeItem('arkan_remember');
    // Don't remove onboarding data on logout - keep it for re-login
    setIsAuthenticated(false);
    setNeedsOnboarding(false);
    setAuthScreen('login');
  };

  // Show loading screen first
  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  // Show onboarding for authenticated users who haven't completed it
  if (isAuthenticated && needsOnboarding) {
    return <OnboardingScreen onComplete={handleOnboardingComplete} />;
  }

  // Show auth screens if not authenticated
  if (!isAuthenticated) {
    switch (authScreen) {
      case 'login':
        return (
          <LoginScreen
            onLoginSuccess={handleLoginSuccess}
            onNavigateToSignUp={() => setAuthScreen('signup')}
            onForgotPassword={() => setAuthScreen('forgot-password')}
          />
        );
      case 'signup':
        return (
          <SignUpScreen
            onSignUpSuccess={handleSignUpSuccess}
            onNavigateToLogin={() => setAuthScreen('login')}
          />
        );
      case 'forgot-password':
        return (
          <ForgotPasswordScreen
            onBackToLogin={() => setAuthScreen('login')}
          />
        );
      default:
        return (
          <LoginScreen
            onLoginSuccess={handleLoginSuccess}
            onNavigateToSignUp={() => setAuthScreen('signup')}
            onForgotPassword={() => setAuthScreen('forgot-password')}
          />
        );
    }
  }

  return (
    <ErrorBoundary>
      <div className="h-screen flex flex-col overflow-hidden relative glass-strong">
        {/* Header */}
        <Header 
          onProfileClick={() => setShowSidebar(true)}
          onMessagesClick={() => setCurrentScreen('messages')}
          onCreateClick={() => setCurrentScreen('create-post')}
          onSearchClick={() => setCurrentScreen('search')}
          currentScreen={currentScreen}
          onNavigate={setCurrentScreen}
        />

        {/* Main Content */}
        <main className="flex-1 overflow-hidden glass-content" data-walkthrough="home-feed">
          {renderScreen()}
        </main>

        {/* Bottom Navigation - Mobile Only */}
        <div className="lg:hidden" data-walkthrough="bottom-nav">
          <BottomNavigation 
            currentScreen={currentScreen}
            onNavigate={setCurrentScreen}
          />
        </div>

        {/* Draggable FAB */}
        <div data-walkthrough="fab">
          <DraggableFAB 
            activeFABMode={activeFABMode}
            onModeChange={setActiveFABMode}
          />
        </div>

        {/* Sidebar */}
        <Sidebar
          isOpen={showSidebar}
          onClose={() => setShowSidebar(false)}
          onNavigate={setCurrentScreen}
          signLanguage={signLanguage}
          onSignLanguageChange={setSignLanguage}
          spokenLanguage={spokenLanguage}
          onSpokenLanguageChange={setSpokenLanguage}
          isDarkMode={isDarkMode}
          onThemeChange={setIsDarkMode}
          onLogout={handleLogout}
        />

        {/* Walkthrough Guide */}
        {showWalkthrough && (
          <WalkthroughGuide
            onComplete={handleWalkthroughComplete}
            onSkip={handleWalkthroughSkip}
          />
        )}
      </div>
    </ErrorBoundary>
  );
}