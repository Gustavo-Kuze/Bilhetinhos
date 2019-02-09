

document.addEventListener('DOMContentLoaded', () => {
    // $('#popover-notification').popover({
    //     html: true,
    //     content: function () {
    //         return $('#popover-notification-content').html();
    //     }
    // });
    // $('#popover-user').popover({
    //     html: true,
    //     content: function () {
    //         return $('#popover-user-content').html();
    //     }
    // });
    $('.phone-mask').mask('(00) 00000-0000');
    $('.email-mask').mask("A", {
        translation: {
            "A": { pattern: /[\w@\-.+]/, recursive: true }
        }
    });
})