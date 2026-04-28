// Database utility for storing user interactions
// This uses localStorage for now, but can be easily migrated to a real database

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  category?: string;
}

export interface QuizResult {
  id: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  timeTaken: number;
  timestamp: Date;
  answers: Array<{
    questionId: string;
    userAnswer: string | number;
    isCorrect: boolean;
    timeTaken: number;
  }>;
}

export interface FlashcardProgress {
  cardId: string;
  studied: boolean;
  mastered: boolean;
  lastStudied: Date;
  studyCount: number;
}

export interface UserProgress {
  userId: string;
  chatHistory: ChatMessage[];
  quizResults: QuizResult[];
  flashcardProgress: FlashcardProgress[];
  totalStudyTime: number;
  lastActive: Date;
}

class DatabaseService {
  private readonly USER_PROGRESS_KEY = 'election_edu_user_progress';
  private readonly USER_ID_KEY = 'election_edu_user_id';

  // Generate or get user ID
  getUserId(): string {
    let userId = localStorage.getItem(this.USER_ID_KEY);
    if (!userId) {
      userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem(this.USER_ID_KEY, userId);
      this.initializeUserProgress(userId);
    }
    return userId;
  }

  // Initialize user progress
  private initializeUserProgress(userId: string): void {
    const initialProgress: UserProgress = {
      userId,
      chatHistory: [],
      quizResults: [],
      flashcardProgress: [],
      totalStudyTime: 0,
      lastActive: new Date()
    };
    localStorage.setItem(this.USER_PROGRESS_KEY, JSON.stringify(initialProgress));
  }

  // Get user progress
  getUserProgress(): UserProgress {
    const data = localStorage.getItem(this.USER_PROGRESS_KEY);
    if (!data) {
      const userId = this.getUserId();
      return this.getUserProgress();
    }
    const progress = JSON.parse(data);
    return {
      ...progress,
      chatHistory: progress.chatHistory.map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      })),
      quizResults: progress.quizResults.map((result: any) => ({
        ...result,
        timestamp: new Date(result.timestamp)
      })),
      flashcardProgress: progress.flashcardProgress.map((card: any) => ({
        ...card,
        lastStudied: new Date(card.lastStudied)
      })),
      lastActive: new Date(progress.lastActive)
    };
  }

  // Update user progress
  private updateUserProgress(updates: Partial<UserProgress>): void {
    const currentProgress = this.getUserProgress();
    const updatedProgress = {
      ...currentProgress,
      ...updates,
      lastActive: new Date()
    };
    localStorage.setItem(this.USER_PROGRESS_KEY, JSON.stringify(updatedProgress));
  }

  // Chat message operations
  saveChatMessage(message: Omit<ChatMessage, 'id'>): void {
    const progress = this.getUserProgress();
    const newMessage: ChatMessage = {
      ...message,
      id: 'chat_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
    };
    this.updateUserProgress({
      chatHistory: [...progress.chatHistory, newMessage]
    });
  }

  getChatHistory(): ChatMessage[] {
    return this.getUserProgress().chatHistory;
  }

  // Quiz operations
  saveQuizResult(result: Omit<QuizResult, 'id' | 'timestamp'>): void {
    const progress = this.getUserProgress();
    const newResult: QuizResult = {
      ...result,
      id: 'quiz_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
      timestamp: new Date()
    };
    this.updateUserProgress({
      quizResults: [...progress.quizResults, newResult]
    });
  }

  getQuizResults(): QuizResult[] {
    return this.getUserProgress().quizResults;
  }

  getQuizStats(): { totalQuizzes: number; averageScore: number; bestScore: number } {
    const results = this.getQuizResults();
    if (results.length === 0) {
      return { totalQuizzes: 0, averageScore: 0, bestScore: 0 };
    }
    const totalQuizzes = results.length;
    const averageScore = results.reduce((sum, result) => sum + result.percentage, 0) / totalQuizzes;
    const bestScore = Math.max(...results.map(result => result.percentage));
    return { totalQuizzes, averageScore, bestScore };
  }

  // Flashcard operations
  updateFlashcardProgress(cardId: string, updates: Partial<FlashcardProgress>): void {
    const progress = this.getUserProgress();
    const existingCardIndex = progress.flashcardProgress.findIndex(card => card.cardId === cardId);
    
    let updatedFlashcardProgress;
    if (existingCardIndex >= 0) {
      updatedFlashcardProgress = [...progress.flashcardProgress];
      updatedFlashcardProgress[existingCardIndex] = {
        ...updatedFlashcardProgress[existingCardIndex],
        ...updates,
        lastStudied: new Date()
      };
    } else {
      updatedFlashcardProgress = [
        ...progress.flashcardProgress,
        {
          cardId,
          studied: false,
          mastered: false,
          lastStudied: new Date(),
          studyCount: 0,
          ...updates
        }
      ];
    }
    
    this.updateUserProgress({
      flashcardProgress: updatedFlashcardProgress
    });
  }

  getFlashcardProgress(): FlashcardProgress[] {
    return this.getUserProgress().flashcardProgress;
  }

  getFlashcardStats(): { totalStudied: number; totalMastered: number; totalCards: number } {
    const progress = this.getFlashcardProgress();
    return {
      totalStudied: progress.filter(card => card.studied).length,
      totalMastered: progress.filter(card => card.mastered).length,
      totalCards: progress.length
    };
  }

  // Study time tracking
  addStudyTime(seconds: number): void {
    const progress = this.getUserProgress();
    this.updateUserProgress({
      totalStudyTime: progress.totalStudyTime + seconds
    });
  }

  getTotalStudyTime(): number {
    return this.getUserProgress().totalStudyTime;
  }

  // Clear all data
  clearAllData(): void {
    localStorage.removeItem(this.USER_PROGRESS_KEY);
    localStorage.removeItem(this.USER_ID_KEY);
  }

  // Export data for backup
  exportData(): string {
    const progress = this.getUserProgress();
    return JSON.stringify(progress, null, 2);
  }

  // Import data from backup
  importData(data: string): boolean {
    try {
      const progress = JSON.parse(data);
      localStorage.setItem(this.USER_PROGRESS_KEY, JSON.stringify(progress));
      return true;
    } catch (error) {
      console.error('Failed to import data:', error);
      return false;
    }
  }
}

export const databaseService = new DatabaseService();
