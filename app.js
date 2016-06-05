(function() {

    var freePortion = 0.666,
        articleBodyClass = '.js-article__body',
        articleBody  = document.querySelector(articleBodyClass);

    if(!articleBody) { return; }

    var oldClassName = articleBody.className,
        availableParas = (document.querySelectorAll(articleBodyClass + ' > *') || []).length,
        visibleParas = Math.ceil(availableParas * freePortion),
        style = document.createElement('style');

    function unTruncate() {
        articleBody.className = oldClassName;
    }

    function truncate() {
        var truncator = '<div class="content__truncator">' +
                '<div class="content__truncator__overlay"></div>' +
                '<button class="button--untruncator button button--large button--primary button--show-more">' +
                    '<i class="i i-plus-white"></i> Continue reading...' +
                '</button>' +
            '</div>',

            css = ".truncated{position:relative}.truncated > *:nth-child(n+" + visibleParas + "){display:none}.truncated .element-rich-link{display:none}.truncated .content__truncator{display:block}.truncated .content__truncator .content__truncator__overlay{position:absolute;background:linear-gradient(to bottom, rgba(255,255,255,0) 0%,rgba(255,255,255,1) 100%);width:100%;height:80px;margin-top:-80px}.content__truncator{display:none}";

        style.type = 'text/css';
        style.innerHTML = css;
        document.getElementsByTagName('head')[0].appendChild(style);

        console.log(articleBody.offsetHeight)
        
        articleBody.className = oldClassName + ' truncated';
        articleBody.insertAdjacentHTML('beforeend', truncator);

        console.log(articleBody.offsetHeight)
        
        var button = document.querySelector(".button--untruncator");
        button.addEventListener("click", unTruncate, false);

        console.log(visibleParas + '/' + availableParas)
    }

    if (availableParas - visibleParas > 1) {
        truncate();
    }
})()
