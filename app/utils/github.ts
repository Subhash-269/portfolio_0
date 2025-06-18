// GitHub API integration utilities
export interface GitHubRepo {
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  updated_at: string;
  html_url: string;
}

export interface GitHubUser {
  login: string;
  name: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

export interface GitHubStats {
  user: GitHubUser;
  repos: GitHubRepo[];
  totalStars: number;
  totalForks: number;
  languages: { [key: string]: number };
  recentActivity: string[];
}

export class GitHubService {
  private static readonly USERNAME = 'Subhash-269'; // Replace with your GitHub username
  private static readonly API_BASE = 'https://api.github.com';

  static async fetchUserData(): Promise<GitHubUser | null> {
    try {
      const response = await fetch(`${this.API_BASE}/users/${this.USERNAME}`);
      if (!response.ok) throw new Error('Failed to fetch user data');
      return await response.json();
    } catch (error) {
      console.error('Error fetching GitHub user data:', error);
      return null;
    }
  }

  static async fetchRepos(): Promise<GitHubRepo[]> {
    try {
      const response = await fetch(
        `${this.API_BASE}/users/${this.USERNAME}/repos?sort=updated&per_page=10`
      );
      if (!response.ok) throw new Error('Failed to fetch repos');
      return await response.json();
    } catch (error) {
      console.error('Error fetching GitHub repos:', error);
      return [];
    }
  }

  static async fetchCommitActivity(): Promise<string[]> {
    try {
      // This would typically require authentication for private repos
      // For demo purposes, return mock data
      return [
        'Pushed 3 commits to portfolio-website',
        'Created new repository: ai-chatbot',
        'Updated README.md in data-visualization',
        'Merged pull request in ml-pipeline',
        'Released v2.0 of document-processor'
      ];
    } catch (error) {
      console.error('Error fetching commit activity:', error);
      return [];
    }
  }

  static calculateLanguageStats(repos: GitHubRepo[]): { [key: string]: number } {
    const languages: { [key: string]: number } = {};
    repos.forEach(repo => {
      if (repo.language) {
        languages[repo.language] = (languages[repo.language] || 0) + 1;
      }
    });
    return languages;
  }

  static async fetchGitHubStats(): Promise<GitHubStats | null> {
    try {
      const [user, repos] = await Promise.all([
        this.fetchUserData(),
        this.fetchRepos()
      ]);

      if (!user) return null;

      const totalStars = repos.reduce((sum, repo) => sum + repo.stars, 0);
      const totalForks = repos.reduce((sum, repo) => sum + repo.forks, 0);
      const languages = this.calculateLanguageStats(repos);
      const recentActivity = await this.fetchCommitActivity();

      return {
        user,
        repos,
        totalStars,
        totalForks,
        languages,
        recentActivity
      };
    } catch (error) {
      console.error('Error fetching GitHub stats:', error);
      return null;
    }
  }

  // Fallback mock data for when API is not available
  static getMockStats(): GitHubStats {
    return {
      user: {
        login: 'Subhash-269',
        name: 'Venkat Neelraj Nitta',
        public_repos: 24,
        followers: 43,
        following: 67,
        created_at: '2020-01-15T00:00:00Z'
      },
      repos: [
        {
          name: 'conversational-ai-chatbot',
          description: 'AI-powered chatbot for customer service',
          language: 'Python',
          stars: 45,
          forks: 12,
          updated_at: '2024-12-15T00:00:00Z',
          html_url: 'https://github.com/Subhash-269/conversational-ai-chatbot'
        },
        {
          name: 'ev-insights-dashboard',
          description: 'Electric vehicle analytics dashboard',
          language: 'JavaScript',
          stars: 32,
          forks: 8,
          updated_at: '2024-12-10T00:00:00Z',
          html_url: 'https://github.com/Subhash-269/ev-insights-dashboard'
        },
        {
          name: 'document-processor',
          description: 'OCR and document processing pipeline',
          language: 'Python',
          stars: 28,
          forks: 6,
          updated_at: '2024-12-05T00:00:00Z',
          html_url: 'https://github.com/Subhash-269/document-processor'
        }
      ],
      totalStars: 156,
      totalForks: 43,
      languages: {
        'Python': 12,
        'JavaScript': 8,
        'TypeScript': 4,
        'R': 2
      },
      recentActivity: [
        'Pushed 3 commits to portfolio-website',
        'Created new repository: ai-chatbot',
        'Updated README.md in data-visualization',
        'Merged pull request in ml-pipeline',
        'Released v2.0 of document-processor'
      ]
    };
  }
}
