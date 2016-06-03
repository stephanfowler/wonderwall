var articleBody  = document.querySelector('.js-article__body'),
    oldClassName = articleBody.className,
    style = document.createElement('style');

var truncator = '<div class="content__truncator">' +
        '<div class="content__truncator__overlay"></div>' +
        '<button class="button button--large button--primary button--show-more" data-link-name="more">' +
            '<i class="i i-plus-white"></i> Continue reading...' +
        '</button>' +
    '</div>';

style.type = 'text/css';

style.innerHTML = '.truncated{position:relative}.truncated > *:nth-child(n+6){display:none}.truncated .element-rich-link{display:none}.truncated .content__truncator{display:block}.truncated .content__truncator .content__truncator__overlay{position:absolute;background:linear-gradient(to bottom, rgba(255,255,255,0) 0%,rgba(255,255,255,1) 100%);width:100%;height:80px;margin-top:-80px}.content__truncator{display:none}';

document.getElementsByTagName('head')[0].appendChild(style);

articleBody.className = oldClassName + ' truncated';
articleBody.insertAdjacentHTML('beforeend', truncator);
