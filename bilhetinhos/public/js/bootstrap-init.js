document.addEventListener('DOMContentLoaded', () => {
    $('.phone-mask').mask('(00) 00000-0000');
    $('.email-mask').mask("A", {
        translation: {
            "A": { pattern: /[\w@\-.+]/, recursive: true }
        }
    });
})