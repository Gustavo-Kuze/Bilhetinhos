

document.addEventListener('DOMContentLoaded', () => {
    $('#popover-notification').popover({
        html: true,
        content: function () {
            return $('#popover-notification-content').html();
        }
    });
    $('#popover-user').popover({
        html: true,
        content: function () {
            return $('#popover-user-content').html();
        }
    });
    $('#inp-user-phone').mask('(00) 00000-0000');
})