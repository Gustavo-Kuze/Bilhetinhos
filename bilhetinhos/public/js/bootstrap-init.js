document.addEventListener('DOMContentLoaded', () => {
    window.$('.phone-mask').mask('(00) 00000-0000');
    window.$('.email-mask').mask("A", {
        translation: {
            "A": { pattern: /[\w@\-.+]/, recursive: true }
        }
    });
})