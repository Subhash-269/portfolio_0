// GitHub API integration utilities
export interface GitHubRepo {
  name: string;
  description: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
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
  private static readonly USERNAME = 'Subhash-269';
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
      const response = await fetch(`${this.API_BASE}/users/${this.USERNAME}/events/public?per_page=30`);
      if (!response.ok) throw new Error('Failed to fetch events');
      const events: { type: string; repo: { name: string }; payload?: { size?: number; ref_type?: string } }[] = await response.json();
      const lines: string[] = [];
      for (const e of events) {
        const repo = e.repo.name.replace(`${this.USERNAME}/`, '');
        if (e.type === 'PushEvent') lines.push(`Pushed ${e.payload?.size ?? 1} commit(s) to ${repo}`);
        else if (e.type === 'CreateEvent' && e.payload?.ref_type === 'repository') lines.push(`Created repository: ${repo}`);
        else if (e.type === 'PullRequestEvent') lines.push(`Pull request activity in ${repo}`);
        if (lines.length >= 5) break;
      }
      return lines;
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

      const totalStars = repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0);
      const totalForks = repos.reduce((sum, repo) => sum + (repo.forks_count || 0), 0);
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

  // Fallback when the GitHub API is unavailable: no invented numbers, just a pointer to the profile
  static getMockStats(): GitHubStats {
    return {
      user: {
        login: this.USERNAME,
        name: 'Venkat Neelraj Nitta',
        public_repos: 0,
        followers: 0,
        following: 0,
        created_at: ''
      },
      repos: [],
      totalStars: 0,
      totalForks: 0,
      languages: {},
      recentActivity: [`GitHub API unavailable right now: see https://github.com/${this.USERNAME}`]
    };
  }
}
