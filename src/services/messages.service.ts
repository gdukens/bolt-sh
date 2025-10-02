import { supabase } from '../lib/supabase';

export interface CreateMessageData {
  conversationId: string;
  content?: string;
  messageType?: string;
  attachmentUrl?: string;
}

class MessagesService {
  async getConversations(userId: string) {
    const { data, error } = await supabase
      .from('conversation_participants')
      .select(`
        conversation_id,
        conversations (
          id,
          conversation_type,
          name,
          created_at,
          updated_at
        )
      `)
      .eq('user_id', userId)
      .eq('is_active', true)
      .order('conversations(updated_at)', { ascending: false });

    if (error) throw error;

    const conversationIds = data.map(d => d.conversation_id);

    const { data: lastMessages } = await supabase
      .from('messages')
      .select('conversation_id, content, created_at, sender_id, message_type')
      .in('conversation_id', conversationIds)
      .order('created_at', { ascending: false });

    const lastMessageMap = new Map();
    lastMessages?.forEach(msg => {
      if (!lastMessageMap.has(msg.conversation_id)) {
        lastMessageMap.set(msg.conversation_id, msg);
      }
    });

    const { data: unreadCounts } = await supabase
      .from('messages')
      .select('conversation_id')
      .in('conversation_id', conversationIds)
      .eq('is_read', false)
      .neq('sender_id', userId);

    const unreadMap = new Map();
    unreadCounts?.forEach(msg => {
      unreadMap.set(msg.conversation_id, (unreadMap.get(msg.conversation_id) || 0) + 1);
    });

    return data.map(d => ({
      ...d.conversations,
      lastMessage: lastMessageMap.get(d.conversation_id),
      unreadCount: unreadMap.get(d.conversation_id) || 0,
    }));
  }

  async getConversationMessages(conversationId: string, limit = 50) {
    const { data, error } = await supabase
      .from('messages')
      .select(`
        *,
        sender:profiles!messages_sender_id_fkey(
          id,
          full_name,
          display_name,
          avatar_url
        )
      `)
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data.reverse();
  }

  async createOrGetDirectConversation(userId: string, otherUserId: string) {
    const { data: existing, error: searchError } = await supabase
      .from('conversation_participants')
      .select(`
        conversation_id,
        conversations!inner (
          id,
          conversation_type
        )
      `)
      .eq('user_id', userId)
      .eq('conversations.conversation_type', 'direct');

    if (searchError) throw searchError;

    for (const conv of existing || []) {
      const { data: participants } = await supabase
        .from('conversation_participants')
        .select('user_id')
        .eq('conversation_id', conv.conversation_id);

      if (participants?.length === 2 &&
          participants.some(p => p.user_id === otherUserId)) {
        return conv.conversation_id;
      }
    }

    const { data: newConv, error: convError } = await supabase
      .from('conversations')
      .insert({
        conversation_type: 'direct',
        created_by: userId,
      })
      .select()
      .single();

    if (convError) throw convError;

    const { error: partError } = await supabase
      .from('conversation_participants')
      .insert([
        { conversation_id: newConv.id, user_id: userId },
        { conversation_id: newConv.id, user_id: otherUserId },
      ]);

    if (partError) throw partError;

    return newConv.id;
  }

  async sendMessage(senderId: string, messageData: CreateMessageData) {
    const { data, error } = await supabase
      .from('messages')
      .insert({
        conversation_id: messageData.conversationId,
        sender_id: senderId,
        content: messageData.content,
        message_type: messageData.messageType || 'text',
        attachment_url: messageData.attachmentUrl,
      })
      .select()
      .single();

    if (error) throw error;

    await supabase
      .from('conversations')
      .update({ updated_at: new Date().toISOString() })
      .eq('id', messageData.conversationId);

    return data;
  }

  async markAsRead(conversationId: string, userId: string) {
    const { error } = await supabase
      .from('messages')
      .update({ is_read: true })
      .eq('conversation_id', conversationId)
      .neq('sender_id', userId)
      .eq('is_read', false);

    if (error) throw error;
  }

  async getConversationParticipants(conversationId: string) {
    const { data, error } = await supabase
      .from('conversation_participants')
      .select(`
        user_id,
        profiles (
          id,
          full_name,
          display_name,
          avatar_url
        )
      `)
      .eq('conversation_id', conversationId)
      .eq('is_active', true);

    if (error) throw error;
    return data;
  }
}

export const messagesService = new MessagesService();
