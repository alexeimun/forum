let drawPosts = '', posts = [], index = 0;
$(() => {
    $('a[href="#posts"]').click(() => {
        $('#view').load('partials/list.html', renderPosts);
    }).trigger('click');

    $('a[href="#new"]').click(() => {
        $('#view').load('partials/new.html');
    });

    function renderPosts() {
        if (!drawPosts) {
            $.get('https://jsonplaceholder.typicode.com/posts', data => {
                posts = data;
                drawPartialPosts();
            });
        } else {
            drawPartialPosts();
        }
    }

    function drawPartialPosts() {
        drawPosts = '<ul class="list-group">';
        posts.forEach((post, i) => {
            drawPosts += `<li class='list-group-item'>
                        <span class="badge progress-bar-info" data-id="${i}">
                        <i class="glyphicon glyphicon-info-sign"></i></span>
                        ${post.title}
                       </li>`;
        });
        drawPosts += '</ul>';

        $('#posts').html(drawPosts);
        $('h1').text(`My posts (${posts.length})`);
    }

    $('#view').on('click', 'span.badge', function () {
        index = $(this).data('id');
        $('#view').load(`partials/view.html`, () => {});
    });
});