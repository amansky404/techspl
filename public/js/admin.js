// ===== Admin Panel JavaScript =====

// Sidebar toggle for mobile
const sidebarToggle = document.getElementById('sidebarToggle');
const adminSidebar = document.querySelector('.admin-sidebar');

if (sidebarToggle) {
    sidebarToggle.addEventListener('click', () => {
        adminSidebar.classList.toggle('active');
    });
}

// Close sidebar when clicking outside on mobile
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
        if (!adminSidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
            adminSidebar.classList.remove('active');
        }
    }
});

// Show/Hide Add Form
function showAddForm() {
    const form = document.getElementById('addForm');
    if (form) {
        form.style.display = 'block';
        form.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Focus on first input
        const firstInput = form.querySelector('input, textarea');
        if (firstInput) {
            setTimeout(() => firstInput.focus(), 300);
        }
    }
}

function hideAddForm() {
    const form = document.getElementById('addForm');
    if (form) {
        form.style.display = 'none';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Delete Item with confirmation
async function deleteItem(type, id) {
    // Confirmation dialog
    const confirmDelete = confirm(`Are you sure you want to delete this ${type.slice(0, -1)}? This action cannot be undone.`);
    
    if (!confirmDelete) {
        return;
    }
    
    try {
        const response = await fetch(`/admin/${type}/delete/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (response.ok) {
            // Show success message
            showNotification('Item deleted successfully!', 'success');
            
            // Reload page after short delay
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } else {
            showNotification('Failed to delete item. Please try again.', 'error');
        }
    } catch (error) {
        console.error('Delete error:', error);
        showNotification('An error occurred. Please try again.', 'error');
    }
}

// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 500;
    }
`;
document.head.appendChild(style);

// Form validation
document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            // Basic validation
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#ef4444';
                    
                    // Reset border after 2 seconds
                    setTimeout(() => {
                        field.style.borderColor = '';
                    }, 2000);
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                showNotification('Please fill in all required fields', 'error');
            }
        });
    });
    
    // Reset field styling on input
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            input.style.borderColor = '';
        });
    });
});

// Auto-hide alerts after 5 seconds
const alerts = document.querySelectorAll('.alert');
alerts.forEach(alert => {
    setTimeout(() => {
        alert.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => alert.remove(), 300);
    }, 5000);
});

// Table search functionality (if needed in future)
function searchTable(inputId, tableId) {
    const input = document.getElementById(inputId);
    const table = document.getElementById(tableId);
    
    if (!input || !table) return;
    
    input.addEventListener('keyup', function() {
        const filter = this.value.toLowerCase();
        const rows = table.getElementsByTagName('tr');
        
        for (let i = 1; i < rows.length; i++) {
            const cells = rows[i].getElementsByTagName('td');
            let found = false;
            
            for (let j = 0; j < cells.length; j++) {
                if (cells[j].textContent.toLowerCase().includes(filter)) {
                    found = true;
                    break;
                }
            }
            
            rows[i].style.display = found ? '' : 'none';
        }
    });
}

// Character counter for textareas
document.querySelectorAll('textarea').forEach(textarea => {
    const maxLength = textarea.getAttribute('maxlength');
    
    if (maxLength) {
        const counter = document.createElement('div');
        counter.className = 'char-counter';
        counter.style.cssText = 'text-align: right; font-size: 0.85rem; color: #6b7280; margin-top: 5px;';
        counter.textContent = `0 / ${maxLength}`;
        
        textarea.parentNode.appendChild(counter);
        
        textarea.addEventListener('input', function() {
            const length = this.value.length;
            counter.textContent = `${length} / ${maxLength}`;
            
            if (length >= maxLength * 0.9) {
                counter.style.color = '#ef4444';
            } else {
                counter.style.color = '#6b7280';
            }
        });
    }
});

// Confirm before leaving page if form has unsaved changes
let formChanged = false;

document.querySelectorAll('form input, form textarea, form select').forEach(field => {
    field.addEventListener('change', () => {
        formChanged = true;
    });
});

document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', () => {
        formChanged = false;
    });
});

window.addEventListener('beforeunload', (e) => {
    if (formChanged) {
        e.preventDefault();
        e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
        return e.returnValue;
    }
});

// Auto-save to localStorage (optional enhancement)
function enableAutoSave(formId) {
    const form = document.getElementById(formId);
    if (!form) return;
    
    const storageKey = `autosave_${formId}`;
    
    // Load saved data
    const savedData = localStorage.getItem(storageKey);
    if (savedData) {
        const data = JSON.parse(savedData);
        Object.keys(data).forEach(key => {
            const field = form.querySelector(`[name="${key}"]`);
            if (field) {
                field.value = data[key];
            }
        });
    }
    
    // Save on change
    form.addEventListener('input', () => {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        localStorage.setItem(storageKey, JSON.stringify(data));
    });
    
    // Clear on submit
    form.addEventListener('submit', () => {
        localStorage.removeItem(storageKey);
    });
}

// ===== EDIT FUNCTIONS =====

// Edit Product
function editProduct(index, product) {
    const form = document.getElementById('addForm');
    const formElement = document.getElementById('productForm');
    
    if (form && formElement) {
        // Show form first
        form.style.display = 'block';
        
        // Update form properties
        document.getElementById('formTitle').textContent = 'Edit Product';
        document.getElementById('submitBtn').textContent = 'Update Product';
        formElement.action = `/admin/products/edit/${index}`;
        
        // Set values after form is visible
        setTimeout(() => {
            const nameField = document.getElementById('name');
            const categoryField = document.getElementById('category');
            const descField = document.getElementById('description');
            const imageField = document.getElementById('image');
            const priceField = document.getElementById('price');
            const featuresField = document.getElementById('features');
            
            if (nameField) nameField.value = product.name || '';
            if (categoryField) categoryField.value = product.category || '';
            if (descField) descField.value = product.description || '';
            if (imageField) imageField.value = (product.image || '').replace(/^["']|["']$/g, '');
            if (priceField) priceField.value = product.price || '';
            if (featuresField) featuresField.value = Array.isArray(product.features) ? product.features.join(', ') : product.features || '';
            
            // Scroll to form after fields are populated
            form.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 50);
    }
}

// Edit Service
function editService(index, service) {
    const form = document.getElementById('addForm');
    const formElement = document.getElementById('serviceForm');
    
    if (form && formElement) {
        // Show form first
        form.style.display = 'block';
        
        // Update form properties
        document.getElementById('formTitle').textContent = 'Edit Service';
        document.getElementById('submitBtn').textContent = 'Update Service';
        formElement.action = `/admin/services/edit/${index}`;
        
        // Set values after form is visible
        setTimeout(() => {
            const nameField = document.getElementById('name');
            const descField = document.getElementById('description');
            const imageField = document.getElementById('image');
            const pricingField = document.getElementById('pricing');
            const featuresField = document.getElementById('features');
            const benefitsField = document.getElementById('benefits');
            const deliveryField = document.getElementById('deliveryTime');
            
            if (nameField) nameField.value = service.name || '';
            if (descField) descField.value = service.description || '';
            if (imageField) imageField.value = (service.image || '').replace(/^["']|["']$/g, '');
            if (pricingField) pricingField.value = service.pricing || '';
            if (featuresField) featuresField.value = Array.isArray(service.features) ? service.features.join(', ') : service.features || '';
            if (benefitsField) benefitsField.value = Array.isArray(service.benefits) ? service.benefits.join(', ') : service.benefits || '';
            if (deliveryField) deliveryField.value = service.deliveryTime || '';
            
            // Scroll to form after fields are populated
            form.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 50);
    }
}

// Edit Solution
function editSolution(index, solution) {
    const form = document.getElementById('addForm');
    const formElement = document.getElementById('solutionForm');
    
    if (form && formElement) {
        // Show form first
        form.style.display = 'block';
        
        // Update form properties
        document.getElementById('formTitle').textContent = 'Edit Solution';
        document.getElementById('submitBtn').textContent = 'Update Solution';
        formElement.action = `/admin/solutions/edit/${index}`;
        
        // Set values after form is visible
        setTimeout(() => {
            const nameField = document.getElementById('name');
            const descField = document.getElementById('description');
            const imageField = document.getElementById('image');
            const benefitsField = document.getElementById('benefits');
            const techField = document.getElementById('technologies');
            const featuresField = document.getElementById('features');
            
            if (nameField) nameField.value = solution.name || '';
            if (descField) descField.value = solution.description || '';
            if (imageField) imageField.value = (solution.image || '').replace(/^["']|["']$/g, '');
            if (benefitsField) benefitsField.value = solution.benefits || '';
            if (techField) techField.value = Array.isArray(solution.technologies) ? solution.technologies.join(', ') : solution.technologies || '';
            if (featuresField) featuresField.value = Array.isArray(solution.features) ? solution.features.join(', ') : solution.features || '';
            
            // Scroll to form after fields are populated
            form.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 50);
    }
}

// Edit Project
function editProject(index, project) {
    const form = document.getElementById('addForm');
    const formElement = document.getElementById('projectForm');
    
    if (form && formElement) {
        form.style.display = 'block';
        form.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        document.getElementById('formTitle').textContent = 'Edit Project';
        document.getElementById('submitBtn').textContent = 'Update Project';
        formElement.action = `/admin/projects/edit/${index}`;
        
        document.getElementById('name').value = project.name || '';
        document.getElementById('description').value = project.description || '';
        document.getElementById('status').value = project.status || '';
        document.getElementById('year').value = project.year || '';
        document.getElementById('client').value = project.client || '';
        document.getElementById('location').value = project.location || '';
        if (document.getElementById('duration')) document.getElementById('duration').value = project.duration || '';
        if (document.getElementById('projectValue')) document.getElementById('projectValue').value = project.projectValue || '';
        if (document.getElementById('image')) document.getElementById('image').value = project.image || '';
        if (document.getElementById('technologies')) {
            document.getElementById('technologies').value = Array.isArray(project.technologies) ? project.technologies.join(', ') : project.technologies || '';
        }
        if (document.getElementById('keyAchievements')) {
            document.getElementById('keyAchievements').value = Array.isArray(project.keyAchievements) ? project.keyAchievements.join(', ') : project.keyAchievements || '';
        }
    }
}

// Edit Blog Post
function editBlogPost(id, post) {
    const form = document.getElementById('addForm');
    const formElement = document.getElementById('blogForm');
    
    if (form && formElement) {
        form.style.display = 'block';
        form.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        document.getElementById('formTitle').textContent = 'Edit Blog Post';
        document.getElementById('submitBtn').textContent = 'Update Post';
        formElement.action = `/admin/blog/edit/${id}`;
        
        document.getElementById('title').value = post.title || '';
        document.getElementById('excerpt').value = post.excerpt || '';
        if (document.getElementById('content')) document.getElementById('content').value = post.content || '';
        document.getElementById('author').value = post.author || '';
        if (document.getElementById('category')) document.getElementById('category').value = post.category || '';
        if (document.getElementById('date')) document.getElementById('date').value = post.date || '';
        if (document.getElementById('readTime')) document.getElementById('readTime').value = post.readTime || '';
        if (document.getElementById('image')) document.getElementById('image').value = post.image || '';
        if (document.getElementById('tags')) {
            document.getElementById('tags').value = Array.isArray(post.tags) ? post.tags.join(', ') : post.tags || '';
        }
    }
}

// Edit Innovation
function editInnovation(index, innovation) {
    const form = document.getElementById('addForm');
    const formElement = document.getElementById('innovationForm');
    
    if (form && formElement) {
        form.style.display = 'block';
        form.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        document.getElementById('formTitle').textContent = 'Edit Innovation';
        document.getElementById('submitBtn').textContent = 'Update Innovation';
        formElement.action = `/admin/innovations/edit/${index}`;
        
        document.getElementById('name').value = innovation.name || '';
        document.getElementById('description').value = innovation.description || '';
        document.getElementById('status').value = innovation.status || '';
        if (document.getElementById('stage')) document.getElementById('stage').value = innovation.stage || '';
        if (document.getElementById('team')) document.getElementById('team').value = innovation.team || '';
        if (document.getElementById('funding')) document.getElementById('funding').value = innovation.funding || '';
        if (document.getElementById('timeline')) document.getElementById('timeline').value = innovation.timeline || '';
        if (document.getElementById('image')) document.getElementById('image').value = innovation.image || '';
        if (document.getElementById('technologies')) {
            document.getElementById('technologies').value = Array.isArray(innovation.technologies) ? innovation.technologies.join(', ') : innovation.technologies || '';
        }
        if (document.getElementById('achievements')) {
            document.getElementById('achievements').value = Array.isArray(innovation.achievements) ? innovation.achievements.join(', ') : innovation.achievements || '';
        }
    }
}

// Edit FAQ
function editFAQ(index, faq) {
    const form = document.getElementById('addForm');
    const formElement = document.getElementById('faqForm');
    
    if (form && formElement) {
        form.style.display = 'block';
        form.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        document.getElementById('formTitle').textContent = 'Edit FAQ';
        document.getElementById('submitBtn').textContent = 'Update FAQ';
        formElement.action = `/admin/faqs/edit/${index}`;
        
        document.getElementById('question').value = faq.question || '';
        document.getElementById('answer').value = faq.answer || '';
        if (document.getElementById('category')) {
            document.getElementById('category').value = faq.category || '';
        }
    }
}

console.log('✅ Admin Panel JavaScript Loaded');
