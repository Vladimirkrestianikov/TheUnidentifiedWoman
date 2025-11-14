// Repository.jsx
import React, { useState, useEffect } from 'react';
import '../Pagescss/Repository.css';

const Repository = () => {
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('all');
    const [sortBy, setSortBy] = useState('updated');

    // КОНФИГУРАЦИЯ - ЗАМЕНИ ЭТО!
    const GITHUB_USERNAME = 'VLadimirkrestianikov'; // ⚠️ ЗАМЕНИ НА СВОЙ USERNAME!

    const languageIcons = {
        'JavaScript': '⚡',
        'TypeScript': '🔷', 
        'Python': '🐍',
        'Java': '☕',
        'C++': '⚙️',
        'C#': '🎯',
        'PHP': '🐘',
        'Ruby': '💎',
        'Go': '🚀',
        'Rust': '🦀',
        'HTML': '🌐',
        'CSS': '🎨',
        'Shell': '🐚',
        'default': '📁'
    };

    useEffect(() => {
        fetchAllRepos();
    }, []);

    const fetchAllRepos = async () => {
        try {
            setLoading(true);
            const response = await fetch(
                `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`
            );

            if (!response.ok) {
                throw new Error(`GitHub API error: ${response.status}`);
            }

            const reposData = await response.json();
            setRepos(reposData);
            
        } catch (err) {
            setError(err.message);
            console.error('Error fetching repos:', err);
        } finally {
            setLoading(false);
        }
    };

    // Фильтрация репозиториев
    const filteredRepos = repos.filter(repo => {
        if (filter === 'all') return true;
        if (filter === 'fork') return repo.fork;
        if (filter === 'source') return !repo.fork;
        return repo.language === filter;
    });

    // Сортировка
    const sortedRepos = [...filteredRepos].sort((a, b) => {
        switch (sortBy) {
            case 'stars':
                return b.stargazers_count - a.stargazers_count;
            case 'forks':
                return b.forks_count - a.forks_count;
            case 'name':
                return a.name.localeCompare(b.name);
            case 'updated':
            default:
                return new Date(b.updated_at) - new Date(a.updated_at);
        }
    });

    // Получаем уникальные языки для фильтра
    const languages = [...new Set(repos.map(repo => repo.language).filter(Boolean))];

    if (loading) {
        return (
            <section className="repository-section">
                <div className="section-header">
                    <h2>REPOSITORY</h2>
                    <div className="connection-status">
                        <div className="status-indicator loading"></div>
                        <span>SYNCING WITH GITHUB...</span>
                    </div>
                </div>
                <div className="repository-loading">
                    <div className="terminal-output">
                        <div className="terminal-line">
                            <span className="prompt">system@github:~$</span> 
                            <span className="command">fetch_all_repositories --user={GITHUB_USERNAME}</span>
                        </div>
                        <div className="terminal-line">
                            <span className="prompt">.</span> 
                            <span className="output">Establishing secure connection...</span>
                        </div>
                        <div className="terminal-line">
                            <span className="prompt">.</span> 
                            <span className="output">Downloading repository data...</span>
                        </div>
                        <div className="terminal-line">
                            <span className="prompt">.</span> 
                            <span className="output highlight">Loading: █████░░░░░ 50%</span>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="repository-section">
                <div className="section-header">
                    <h2>REPOSITORY</h2>
                    <div className="connection-status">
                        <div className="status-indicator error"></div>
                        <span>CONNECTION FAILED</span>
                    </div>
                </div>
                <div className="repository-error">
                    <div className="error-icon">⚠️</div>
                    <h3>GitHub API Connection Error</h3>
                    <p>{error}</p>
                    <button className="retry-btn" onClick={fetchAllRepos}>
                        <span className="btn-icon">🔄</span>
                        Retry Connection
                    </button>
                </div>
            </section>
        );
    }

    return (
        <section className="repository-section">
            <div className="section-header">
                <h2>REPOSITORY</h2>
                <div className="connection-status">
                    <div className="status-indicator"></div>
                    <span>SYNCED: {repos.length} REPOSITORIES</span>
                </div>
            </div>

            {/* Фильтры и сортировка */}
            <div className="repository-controls">
                <div className="control-group">
                    <label>FILTER:</label>
                    <select 
                        value={filter} 
                        onChange={(e) => setFilter(e.target.value)}
                        className="cyber-select"
                    >
                        <option value="all">ALL REPOSITORIES</option>
                        <option value="source">SOURCE ONLY</option>
                        <option value="fork">FORKS ONLY</option>
                        {languages.map(lang => (
                            <option key={lang} value={lang}>{lang}</option>
                        ))}
                    </select>
                </div>

                <div className="control-group">
                    <label>SORT BY:</label>
                    <select 
                        value={sortBy} 
                        onChange={(e) => setSortBy(e.target.value)}
                        className="cyber-select"
                    >
                        <option value="updated">LAST UPDATED</option>
                        <option value="stars">STARS</option>
                        <option value="forks">FORKS</option>
                        <option value="name">NAME</option>
                    </select>
                </div>

                <div className="stats-overview">
                    <div className="stat">
                        <span className="stat-value">{repos.length}</span>
                        <span className="stat-label">TOTAL</span>
                    </div>
                    <div className="stat">
                        <span className="stat-value">
                            {repos.filter(r => !r.fork).length}
                        </span>
                        <span className="stat-label">SOURCE</span>
                    </div>
                    <div className="stat">
                        <span className="stat-value">
                            {repos.filter(r => r.fork).length}
                        </span>
                        <span className="stat-label">FORKS</span>
                    </div>
                </div>
            </div>

            {/* Сетка репозиториев */}
            <div className="repository-grid">
                {sortedRepos.length === 0 ? (
                    <div className="no-repos">
                        <div className="no-repos-icon">📂</div>
                        <h3>No repositories found</h3>
                        <p>Try changing your filter settings</p>
                    </div>
                ) : (
                    sortedRepos.map(repo => (
                        <div 
                            key={repo.id} 
                            className="repo-card"
                            onClick={() => window.open(repo.html_url, '_blank')}
                        >
                            {repo.fork && <div className="fork-badge">FORK</div>}
                            
                            <div className="repo-header">
                                <div className="repo-icon">
                                    {languageIcons[repo.language] || languageIcons.default}
                                </div>
                                <div className="repo-title">
                                    <h3>{repo.name}</h3>
                                    <span className="repo-visibility">
                                        {repo.private ? '🔒 PRIVATE' : '🌐 PUBLIC'}
                                    </span>
                                </div>
                            </div>

                            <div className="repo-content">
                                <p className="repo-description">
                                    {repo.description || 'No description provided'}
                                </p>

                                <div className="repo-stats">
                                    <div className="repo-stat">
                                        <span className="stat-icon">⭐</span>
                                        <span className="stat-value">{repo.stargazers_count}</span>
                                    </div>
                                    <div className="repo-stat">
                                        <span className="stat-icon">🍴</span>
                                        <span className="stat-value">{repo.forks_count}</span>
                                    </div>
                                    <div className="repo-stat">
                                        <span className="stat-icon">👀</span>
                                        <span className="stat-value">{repo.watchers_count}</span>
                                    </div>
                                </div>

                                <div className="repo-meta">
                                    <span className="repo-language">
                                        {repo.language || 'Various'}
                                    </span>
                                    <span className="repo-updated">
                                        {new Date(repo.updated_at).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>

                            <div className="repo-connector">
                                <div className="connector-line"></div>
                                <div className="connector-dot"></div>
                            </div>
                            
                            <div className="repo-hover-effect"></div>
                        </div>
                    ))
                )}
            </div>

            {/* Статистика внизу */}
            <div className="repository-footer">
                <div className="last-updated">
                    <span className="update-label">LAST SYNC:</span>
                    <span className="update-time">{new Date().toLocaleString()}</span>
                </div>
                <div className="repo-count">
                    DISPLAYING {sortedRepos.length} OF {repos.length} REPOSITORIES
                </div>
            </div>
        </section>
    );
};

export default Repository;