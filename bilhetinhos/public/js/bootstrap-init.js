document.addEventListener('DOMContentLoaded', () => {
    $(function () {
        $('[data-toggle="popover"]').popover({
            html: true,
            content: function () {
                return $('#popover-content').html();
            }
        });
    });
})