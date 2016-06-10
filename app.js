(function() {

    var paidPortion = 0.25,
        feePence = 20,
        feeMax = 400,
        articleBodyClass = '.js-article__body',
        articleBody  = document.querySelector(articleBodyClass);

    if (window.location.pathname === "/uk/business") {
        window.localStorage.removeItem("wonderwall");
    }

    if (!articleBody) { return; }

    var tally = parseInt(window.localStorage.getItem("wonderwall") || 0),
        finished = tally/feePence,
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
                    '<div class="untruncator__cta">⬇</div>' +
                    //'<div class="untruncator__title">Finish reading ...</div>' +
                    '<div class="untruncator__desc">' +
                        '<b>The first two thirds of a Guardian article are ALWAYS FREE.</b> <br/>' + 
                    	'<span class="untruncator__button">Finish reading for 20p</span> ' +
                    	(tally > 0 && tally < feeMax ? 'You\'ve finished ' + finished + ' article' + (finished > 1 ? 's' : '') + ' so far.' : '') +
                        //'Finish it for only ' + feePence + 'p.  <br/>' +
                        '<br/>After ' + (feeMax/feePence)  + ' articles per week they\'re fully free. ' +
                        'So you\'ll never be charged more than £' + feeMax/100  + '. ' +
                    '</div>' +
                '</div>' +
            '</div>',
            css = ".truncated {position:relative}" + 
                  
            ".truncated > *:nth-child(n+" + visibleChildren + ") {display:none}" + 
            ".truncated .content__truncator {display:block; margin-top: -15px;}" + 
            ".truncated .content__truncator .content__truncator__overlay {position:absolute;background:linear-gradient(to bottom, rgba(255,255,255,0) 0%,rgba(255,255,255,1) 100%);width:100%;height:80px; margin-top: -90px; border-bottom: 10px solid #fff;}" + 
            
            ".content__truncator {display:none}" + 
            
            ".untruncator {border-top: 5px solid #4a7801; position: relative; transition: transform .5s; cursor: pointer; margin: 0 0 80px 0; background: #eeeeee;}" +
            ".untruncator:hover {opacity: .85;}" +
            ".untruncator__title {padding: 2px 10px 0px 10px; color: #4a7801; font-size: 1.5rem; font-weight: 900;}" +
            ".untruncator__desc  {padding: 10px 10px 10px 10px; font-family: 'Guardian Text Sans Web',sans-serif; color: #4a7801; font-size: 0.95rem; line-height: 1.3rem;}" + 
            ".untruncator__cta {position: absolute; right: 3px; top: -16px; color: #4a7801; font-size: 60px;}" +
            ".untruncator__button {margin: 10px 5px 10px 0; display: inline-block; font-weight:bold; background: #ccc; padding: 5px 12px 4px 12px; border-radius: 15px; color: #fff; background: #4a7801;}" +

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
