import { supabase } from '../lib/supabase';

class EducationService {
  async getCourses(language?: string, level?: string) {
    let query = supabase
      .from('courses')
      .select('*')
      .eq('is_published', true);

    if (language) {
      query = query.eq('language', language);
    }

    if (level) {
      query = query.eq('level', level);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  async getCourseById(courseId: string) {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .eq('id', courseId)
      .maybeSingle();

    if (error) throw error;
    return data;
  }

  async getUserEnrollments(userId: string) {
    const { data, error } = await supabase
      .from('course_enrollments')
      .select(`
        *,
        course:courses(*)
      `)
      .eq('user_id', userId)
      .order('last_activity_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  async enrollInCourse(userId: string, courseId: string) {
    const { data, error } = await supabase
      .from('course_enrollments')
      .insert({
        user_id: userId,
        course_id: courseId,
      })
      .select()
      .single();

    if (error) {
      if (error.code === '23505') {
        throw new Error('Already enrolled in this course');
      }
      throw error;
    }

    return data;
  }

  async updateCourseProgress(enrollmentId: string, progress: number, completedLessons: number) {
    const { data, error } = await supabase
      .from('course_enrollments')
      .update({
        progress,
        completed_lessons: completedLessons,
        last_activity_at: new Date().toISOString(),
      })
      .eq('id', enrollmentId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getUserWordLibrary(userId: string) {
    const { data, error } = await supabase
      .from('user_word_library')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  async addWordToLibrary(userId: string, wordData: {
    word: string;
    category: string;
    videoUrl?: string;
  }) {
    const { data, error } = await supabase
      .from('user_word_library')
      .insert({
        user_id: userId,
        word: wordData.word,
        category: wordData.category,
        video_url: wordData.videoUrl,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateWordProgress(wordId: string, accuracyScore: number) {
    const { data: word, error: fetchError } = await supabase
      .from('user_word_library')
      .select('practice_count, streak_days, last_practiced_at')
      .eq('id', wordId)
      .single();

    if (fetchError) throw fetchError;

    const lastPracticed = word.last_practiced_at ? new Date(word.last_practiced_at) : null;
    const today = new Date();
    const oneDayAgo = new Date(today.getTime() - 24 * 60 * 60 * 1000);

    let newStreak = word.streak_days;
    if (!lastPracticed || lastPracticed < oneDayAgo) {
      newStreak = lastPracticed && lastPracticed.toDateString() === oneDayAgo.toDateString()
        ? word.streak_days + 1
        : 1;
    }

    const { data, error } = await supabase
      .from('user_word_library')
      .update({
        accuracy_score: accuracyScore,
        practice_count: word.practice_count + 1,
        streak_days: newStreak,
        last_practiced_at: new Date().toISOString(),
      })
      .eq('id', wordId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async createPracticeSession(userId: string, sessionData: {
    sessionType: string;
    wordsPracticed: number;
    accuracyScore: number;
    durationSeconds: number;
  }) {
    const { data, error } = await supabase
      .from('practice_sessions')
      .insert({
        user_id: userId,
        ...sessionData,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getUserPracticeSessions(userId: string, limit = 10) {
    const { data, error } = await supabase
      .from('practice_sessions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data;
  }

  async getUserAchievements(userId: string) {
    const { data, error } = await supabase
      .from('achievements')
      .select('*')
      .eq('user_id', userId)
      .order('earned_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  async awardAchievement(userId: string, achievementData: {
    achievementType: string;
    title: string;
    description?: string;
    icon?: string;
  }) {
    const { data, error } = await supabase
      .from('achievements')
      .insert({
        user_id: userId,
        ...achievementData,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}

export const educationService = new EducationService();
