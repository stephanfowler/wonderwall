(function() {

    var paidPortion = 0.3,
        articleBodyClass = '.js-article__body',
        articleBody  = document.querySelector(articleBodyClass);

    if(!articleBody) { return; }

    var oldClassName = articleBody.className,
        availableParas = (document.querySelectorAll(articleBodyClass + ' > p') || []).length,
        paidParas = Math.floor(availableParas * paidPortion),
        availableChildren = (document.querySelectorAll(articleBodyClass + ' > *') || []).length,
        visibleChildren = availableChildren - paidParas,
        style = document.createElement('style');

    function truncate() {
        var button,
            truncator = '<div class="content__truncator">' +
                '<div class="content__truncator__overlay"></div>' +
                '<div class="untruncator">' +
                    '<div class="untruncator__cta">&raquo;</div>' +
                    '<b>Finish reading ...</b><br/>' +
                    '<div class="untruncator__desc">' +
                        '<b>Two-thirds of the article is always FREE</b>. <br>' + 
                        'Read the rest for only 15p. <br/><br/>' +
                        'You\'ll never be charged more than £4 per week. ' +
                        'You\'ve spent £1.65 so far.' +
                    '</div>' +
                '</div>' +
            '</div>',
            css = ".truncated{position:relative}.truncated > *:nth-child(n+" + visibleChildren + "){display:none}.truncated .element-rich-link{display:none}.truncated .content__truncator{display:block}.truncated .content__truncator .content__truncator__overlay{position:absolute;background:linear-gradient(to bottom, rgba(255,255,255,0) 0%,rgba(255,255,255,1) 100%);width:100%;height:80px;margin-top:-80px}.content__truncator{display:none}" + 
            
            ".untruncator {cursor: pointer; background: #59cb3f; color: #fff;font-family: 'Guardian Text Sans Web',sans-serif; font-size: 1.2rem; line-height: 2rem; padding: 5px 10px 10px 10px; margin: 10px 0 20px 0;}" +
            ".untruncator__desc {font-size: 0.85rem; line-height: 1rem;}" + 
            ".untruncator__cta {float: right; font-size: 40px; margin: -4px 0 0 0;}";



        style.type = 'text/css';
        style.innerHTML = css;
        document.getElementsByTagName('head')[0].appendChild(style);

        articleBody.className = oldClassName + ' truncated';
        articleBody.insertAdjacentHTML('beforeend', truncator);

        button = document.querySelector(".untruncator");
        button.addEventListener("click", unTruncate, false);

        console.log(availableChildren + '/' + availableParas + '/' + visibleChildren);
    }

    function unTruncate() {
        articleBody.className = oldClassName;
    }

    if (paidParas) {
        truncate();
    }
})()
