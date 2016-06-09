(function() {

    var paidPortion = 0.25,
        feePence = 19,
        feeMax = 200,
        articleBodyClass = '.js-article__body',
        articleBody  = document.querySelector(articleBodyClass);

    if (window.location.pathname === "/uk/business") {
        window.localStorage.removeItem("wonderwall");
    }

    if (!articleBody) { return; }

    var tally = parseInt(window.localStorage.getItem("wonderwall") || 0),
        oldClassName = articleBody.className,
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
                        '<b>The first two-thirds of an article are ALWAYS FREE</b>. <br>' + 
                        'Read the rest for only ' + feePence + 'p. <br/>' +
                        'You\'ll never be charged more than £' + feeMax/100  + ' per week. ' +
                        (tally > 0 && tally < feeMax ? 'You\'ve spent £' + (tally/100)  + ' so far.' : '') +
                    '</div>' +
                '</div>' +
            '</div>',
            css = ".truncated {position:relative}" + 
                  
            ".truncated > *:nth-child(n+" + visibleChildren + ") {display:none}" + 
            ".truncated .content__truncator {display:block; margin-top: -15px;}" + 
            ".truncated .content__truncator .content__truncator__overlay {position:absolute;background:linear-gradient(to bottom, rgba(255,255,255,0) 0%,rgba(255,255,255,1) 100%);width:100%;height:80px; margin-top: -90px; border-bottom: 10px solid #fff;}" + 
            
            ".content__truncator {display:none}" + 
            
            ".untruncator {transition: all .5s; cursor: pointer; background: #4a7801; color: #fff;font-family: 'Guardian Text Sans Web',sans-serif; font-size: 1.5rem; line-height: 2.5rem; padding: 2px 10px 10px 10px; margin: 0 0 20px 0;}" +
            ".untruncator__desc {font-size: 0.85rem; line-height: 1rem;}" + 
            ".untruncator__cta {float: right; font-size: 100px; margin: 15px 0 0 0; transform: rotate(90deg); opacity: 0.5;}" +

            ".element--supporting {display:none}" + 
            ".element-rich-link {display:none}"; 


        if (tally < feeMax) {
           style.type = 'text/css';
           style.innerHTML = css;
           document.getElementsByTagName('head')[0].appendChild(style);

           articleBody.className = oldClassName + ' truncated';
           articleBody.insertAdjacentHTML('beforeend', truncator);

           button = document.querySelector(".content__truncator");
           button.addEventListener("click", unTruncate, false);

           console.log(availableChildren + '/' + availableParas + '/' + visibleChildren);
	}
    }

    function unTruncate() {
        this.style.transition = "all 200ms";
	this.style.opacity = "0";
        this.style.transform = "rotateX(90deg)";
        setTimeout(function() {
            articleBody.className = oldClassName;
        }, 400);

        window.localStorage.setItem("wonderwall", Math.min(feeMax, tally + feePence))
    }

    if (paidParas) {
        truncate();
    }
})()
