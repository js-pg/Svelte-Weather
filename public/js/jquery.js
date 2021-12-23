
if (window.innerWidth > 1000) {
    $(function () {
        $("#resizable").resizable({
            animate: true,
            handles: "e",
            minWidth: 240,
        });
    })
};

$(window).on("resize", function () {
    if (window.innerWidth > 1000) {
        $(function () {
            $("#resizable").resizable({
                animate: true,
                handles: "e",
                minWidth: 240,
            });
        })
    }
});