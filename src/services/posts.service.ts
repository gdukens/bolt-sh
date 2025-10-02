import { supabase } from '../lib/supabase';

export interface CreatePostData {
  content: string;
  postType?: string;
  isPublic?: boolean;
  attachments?: Array<{
    type: string;
    url: string;
    thumbnailUrl?: string;
  }>;
}

class PostsService {
  async getPosts(limit = 20, offset = 0) {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        author:profiles!posts_author_id_fkey(
          id,
          full_name,
          display_name,
          occupation,
          company,
          avatar_url
        ),
        post_attachments(*)
      `)
      .eq('is_public', true)
      .eq('is_archived', false)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;
    return data;
  }

  async getPostById(postId: string) {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        author:profiles!posts_author_id_fkey(
          id,
          full_name,
          display_name,
          occupation,
          company,
          avatar_url
        ),
        post_attachments(*)
      `)
      .eq('id', postId)
      .maybeSingle();

    if (error) throw error;
    return data;
  }

  async getUserPosts(userId: string, limit = 20) {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        author:profiles!posts_author_id_fkey(
          id,
          full_name,
          display_name,
          occupation,
          company,
          avatar_url
        ),
        post_attachments(*)
      `)
      .eq('author_id', userId)
      .eq('is_archived', false)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data;
  }

  async createPost(userId: string, postData: CreatePostData) {
    const { data: post, error: postError } = await supabase
      .from('posts')
      .insert({
        author_id: userId,
        content: postData.content,
        post_type: postData.postType || 'text',
        is_public: postData.isPublic !== false,
      })
      .select()
      .single();

    if (postError) throw postError;

    if (postData.attachments && postData.attachments.length > 0) {
      const attachments = postData.attachments.map(att => ({
        post_id: post.id,
        attachment_type: att.type,
        url: att.url,
        thumbnail_url: att.thumbnailUrl,
      }));

      const { error: attachError } = await supabase
        .from('post_attachments')
        .insert(attachments);

      if (attachError) throw attachError;
    }

    await this.incrementPostCount(userId);

    return post;
  }

  async updatePost(postId: string, content: string) {
    const { data, error } = await supabase
      .from('posts')
      .update({
        content,
        updated_at: new Date().toISOString(),
      })
      .eq('id', postId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async deletePost(postId: string, userId: string) {
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', postId)
      .eq('author_id', userId);

    if (error) throw error;

    await this.decrementPostCount(userId);
  }

  async likePost(postId: string, userId: string) {
    const { data, error } = await supabase
      .from('post_reactions')
      .insert({
        post_id: postId,
        user_id: userId,
        reaction_type: 'like',
      })
      .select()
      .single();

    if (error) {
      if (error.code === '23505') {
        return null;
      }
      throw error;
    }

    await this.incrementLikeCount(postId);
    return data;
  }

  async unlikePost(postId: string, userId: string) {
    const { error } = await supabase
      .from('post_reactions')
      .delete()
      .eq('post_id', postId)
      .eq('user_id', userId);

    if (error) throw error;

    await this.decrementLikeCount(postId);
  }

  async getComments(postId: string) {
    const { data, error } = await supabase
      .from('comments')
      .select(`
        *,
        author:profiles!comments_author_id_fkey(
          id,
          full_name,
          display_name,
          avatar_url
        )
      `)
      .eq('post_id', postId)
      .is('parent_comment_id', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  async createComment(postId: string, userId: string, content: string, parentCommentId?: string) {
    const { data, error } = await supabase
      .from('comments')
      .insert({
        post_id: postId,
        author_id: userId,
        content,
        parent_comment_id: parentCommentId,
      })
      .select()
      .single();

    if (error) throw error;

    await this.incrementCommentCount(postId);
    return data;
  }

  async sharePost(postId: string, userId: string, comment?: string) {
    const { data, error } = await supabase
      .from('shares')
      .insert({
        post_id: postId,
        user_id: userId,
        comment,
      })
      .select()
      .single();

    if (error) throw error;

    await this.incrementShareCount(postId);
    return data;
  }

  private async incrementLikeCount(postId: string) {
    await supabase.rpc('increment_post_likes', { post_id: postId });
  }

  private async decrementLikeCount(postId: string) {
    await supabase.rpc('decrement_post_likes', { post_id: postId });
  }

  private async incrementCommentCount(postId: string) {
    await supabase.rpc('increment_post_comments', { post_id: postId });
  }

  private async incrementShareCount(postId: string) {
    await supabase.rpc('increment_post_shares', { post_id: postId });
  }

  private async incrementPostCount(userId: string) {
    await supabase
      .from('profiles')
      .update({ post_count: supabase.raw('post_count + 1') as any })
      .eq('id', userId);
  }

  private async decrementPostCount(userId: string) {
    await supabase
      .from('profiles')
      .update({ post_count: supabase.raw('GREATEST(post_count - 1, 0)') as any })
      .eq('id', userId);
  }
}

export const postsService = new PostsService();
