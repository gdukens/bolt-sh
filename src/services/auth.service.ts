import { supabase } from '../lib/supabase';
import type { OnboardingData } from '../components/screens/OnboardingScreen';

export interface SignUpData {
  email: string;
  password: string;
  fullName: string;
}

export interface SignInData {
  email: string;
  password: string;
}

class AuthService {
  async signUp(data: SignUpData) {
    const { email, password, fullName } = data;

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (authError) throw authError;
    if (!authData.user) throw new Error('Failed to create user');

    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: authData.user.id,
        email,
        full_name: fullName,
        onboarding_completed: false,
      });

    if (profileError) throw profileError;

    const { error: settingsError } = await supabase
      .from('user_settings')
      .insert({
        user_id: authData.user.id,
      });

    if (settingsError) throw settingsError;

    return authData;
  }

  async signIn(data: SignInData) {
    const { email, password } = data;

    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return authData;
  }

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }

  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  }

  async getSession() {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    return session;
  }

  async resetPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) throw error;
  }

  async completeOnboarding(userId: string, data: OnboardingData) {
    const { error: profileError } = await supabase
      .from('profiles')
      .update({
        full_name: data.fullName,
        age_range: data.age,
        occupation: data.occupation,
        location: data.location,
        disability_status: data.disabilityStatus,
        assistive_tech: data.assistiveTech,
        interests: data.interests,
        onboarding_completed: true,
      })
      .eq('id', userId);

    if (profileError) throw profileError;

    const { error: settingsError } = await supabase
      .from('user_settings')
      .update({
        spoken_language: data.spokenLanguage,
        sign_language: data.signLanguage,
        sign_language_proficiency: data.signLanguageProficiency,
      })
      .eq('user_id', userId);

    if (settingsError) throw settingsError;
  }

  onAuthStateChange(callback: (event: string, session: any) => void) {
    return supabase.auth.onAuthStateChange((event, session) => {
      (async () => {
        callback(event, session);
      })();
    });
  }
}

export const authService = new AuthService();
