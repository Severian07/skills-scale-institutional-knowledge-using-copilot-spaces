// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initializeApp();
});

function initializeApp() {
    // Setup search functionality
    setupSearch();
    
    // Setup category filtering
    setupCategoryFiltering();
    
    // Setup navigation
    setupNavigation();
    
    // Add fade-in animation to elements
    addFadeInAnimation();
}

// Search functionality
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.querySelector('.search-btn');
    const articles = document.querySelectorAll('.article-card');

    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        articles.forEach(article => {
            const title = article.querySelector('h4').textContent.toLowerCase();
            const description = article.querySelector('p').textContent.toLowerCase();
            const category = article.querySelector('.article-category').textContent.toLowerCase();
            
            const matches = title.includes(searchTerm) || 
                          description.includes(searchTerm) || 
                          category.includes(searchTerm);
            
            if (searchTerm === '' || matches) {
                article.classList.remove('hidden');
                article.classList.add('fade-in');
            } else {
                article.classList.add('hidden');
            }
        });

        // Show message if no results found
        const visibleArticles = Array.from(articles).filter(article => !article.classList.contains('hidden'));
        const articlesGrid = document.getElementById('articlesGrid');
        
        // Remove any existing no-results message
        const existingMessage = document.querySelector('.no-results-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        if (visibleArticles.length === 0 && searchTerm !== '') {
            const noResultsMessage = document.createElement('div');
            noResultsMessage.className = 'no-results-message';
            noResultsMessage.style.cssText = 'grid-column: 1 / -1; text-align: center; padding: 2rem; color: var(--text-secondary);';
            noResultsMessage.innerHTML = '<p>No articles found matching your search. Try different keywords.</p>';
            articlesGrid.appendChild(noResultsMessage);
        }
    }

    // Search on button click
    searchBtn.addEventListener('click', performSearch);

    // Search on Enter key
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // Real-time search as user types
    searchInput.addEventListener('input', function() {
        performSearch();
    });
}

// Category filtering functionality
function setupCategoryFiltering() {
    const categoryLinks = document.querySelectorAll('.category-link');
    const articles = document.querySelectorAll('.article-card');
    
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all category links
            categoryLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Get selected category
            const selectedCategory = this.dataset.category;
            
            // Filter articles
            articles.forEach(article => {
                const articleCategory = article.dataset.category;
                
                if (articleCategory === selectedCategory) {
                    article.classList.remove('hidden');
                    article.classList.add('fade-in');
                } else {
                    article.classList.add('hidden');
                }
            });
            
            // Clear search input when filtering by category
            document.getElementById('searchInput').value = '';
        });
    });
    
    // Add "Show All" functionality when clicking on the sidebar title
    const sidebarTitle = document.querySelector('.sidebar h3');
    if (sidebarTitle) {
        sidebarTitle.style.cursor = 'pointer';
        sidebarTitle.addEventListener('click', function() {
            // Remove active class from all category links
            categoryLinks.forEach(l => l.classList.remove('active'));
            
            // Show all articles
            articles.forEach(article => {
                article.classList.remove('hidden');
                article.classList.add('fade-in');
            });
            
            // Clear search input
            document.getElementById('searchInput').value = '';
            
            // Remove no-results message if it exists
            const noResultsMessage = document.querySelector('.no-results-message');
            if (noResultsMessage) {
                noResultsMessage.remove();
            }
        });
    }
}

// Navigation functionality
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all nav links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // In a real application, this would navigate to different pages
            // For now, we'll just show a console message
            console.log('Navigating to:', this.textContent);
        });
    });
}

// Add fade-in animation to elements
function addFadeInAnimation() {
    const articles = document.querySelectorAll('.article-card');
    const statCards = document.querySelectorAll('.stat-card');
    
    // Add fade-in animation to articles
    articles.forEach((article, index) => {
        setTimeout(() => {
            article.classList.add('fade-in');
        }, index * 100);
    });
    
    // Add fade-in animation to stat cards
    statCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('fade-in');
        }, index * 100);
    });
}

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Focus search with Ctrl/Cmd + K
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('searchInput').focus();
    }
    
    // Clear search with Escape
    if (e.key === 'Escape') {
        const searchInput = document.getElementById('searchInput');
        if (searchInput === document.activeElement) {
            searchInput.value = '';
            searchInput.blur();
            
            // Show all articles
            document.querySelectorAll('.article-card').forEach(article => {
                article.classList.remove('hidden');
            });
            
            // Remove no-results message
            const noResultsMessage = document.querySelector('.no-results-message');
            if (noResultsMessage) {
                noResultsMessage.remove();
            }
        }
    }
});

// Add hover effect for article cards
document.querySelectorAll('.article-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.cursor = 'pointer';
    });
    
    card.addEventListener('click', function(e) {
        // If clicking on "Read more" link, let it handle the navigation
        if (e.target.classList.contains('read-more')) {
            return;
        }
        
        // Otherwise, simulate clicking the "Read more" link
        const readMoreLink = this.querySelector('.read-more');
        if (readMoreLink) {
            console.log('Opening article:', this.querySelector('h4').textContent);
            // In a real application, this would navigate to the article page
        }
    });
});

// Update statistics dynamically (demonstration)
function updateStats() {
    const visibleArticles = document.querySelectorAll('.article-card:not(.hidden)').length;
    const totalArticles = document.querySelectorAll('.article-card').length;
    
    // In a real application, these would come from an API
    console.log(`Showing ${visibleArticles} of ${totalArticles} articles`);
}

// Call updateStats on page load and after filtering
window.addEventListener('load', updateStats);
