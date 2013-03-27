/*!
 * reveal.js
 * http://lab.hakim.se/reveal-js
 * MIT licensed
 *
 * Copyright (C) 2013 Hakim El Hattab, http://hakim.se
 */
var RevealNav = (function(){
	var SLIDES_SELECTOR = '.reveal .slides section',
		HORIZONTAL_SLIDES_SELECTOR = '.reveal .slides>section',
		VERTICAL_SLIDES_SELECTOR = '.reveal .slides>section.present>section',
		HOME_SLIDE_SELECTOR = '.reveal .slides>section:first-child';

    function setup(){
        if( Reveal.getConfig().keyboard ) {
            document.addEventListener( 'keydown', onDocumentKeyDown, false );
        }
    }

	/**
	 * Unbinds all event listeners.
	 */
	function removeEventListeners() {
		document.removeEventListener( 'keydown', onDocumentKeyDown, false );
	}

    function navigateLeftSlide() {

		// Prioritize hiding fragments
        if( Reveal.availableRoutes().left ) { // && ( isOverview() || noFragments() === false ) ) {
			Reveal.slide( indexh - 1 );
		}

	}

	function navigateRightSlide() {

		// Prioritize revealing fragments
		if( Reveal.availableRoutes().right ) { //  && ( isOverview() || allFragments() === false ) ) {
			Reveal.slide( indexh + 1 );
		}

	}

	function navigateUpSlide() {

		// Prioritize hiding fragments
		if(Reveal.availableRoutes().up ) { //  && isOverview() || noFragments() === false ) {
			Reveal.slide( indexh, indexv - 1 );
		}

	}

	function navigateDownSlide() {

		// Prioritize revealing fragments
		if( Reveal.availableRoutes().down ) { //  && isOverview() || allFragments() === false ) {
			Reveal.slide( indexh, indexv + 1 );
		}

	}

	/**
	 * Navigates backwards, prioritized in the following order:
	 * 1) Hide all visible fragments
	 * 2) Previous vertical slide
	 * 3) Previous horizontal slide
	 */
	function navigatePrevSlide() {

		// Prioritize revealing fragments
		//if( noFragments() === false ) {
			if( Reveal.availableRoutes().up ) {
				Reveal.navigateUpSlide();
			}
			else {
				// Fetch the previous horizontal slide, if there is one
                navigateLeftSlide()
			}
		//}

	}

	/**
	 * Same as #navigatePrev() but navigates forwards.
	 */
	function navigateNextSlide() {

		// Prioritize revealing fragments
		//if( allFragments() === false ) {
			Reveal.availableRoutes().down ? navigateDownSlide() : navigateRightSlide();
		//}

		// If auto-sliding is enabled we need to cue up
		// another timeout
		//cueAutoSlide();

	}



	// --------------------------------------------------------------------//
	// ----------------------------- EVENTS -------------------------------//
	// --------------------------------------------------------------------//


	/**
	 * Handler for the document level 'keydown' event.
	 *
	 * @param {Object} event
	 */
	function onDocumentKeyDown( event ) {

		// Check if there's a focused element that could be using
		// the keyboard
		var activeElement = document.activeElement;
		var hasFocus = !!( document.activeElement && ( document.activeElement.type || document.activeElement.href || document.activeElement.contentEditable !== 'inherit' ) );

		// Disregard the event if there's a focused element or a
		// keyboard modifier key is present (other than shift)
		if( hasFocus || event.altKey || event.ctrlKey || event.metaKey || !event.shiftKey) return;

		var triggered = true;

		// while paused only allow "unpausing" keyboard events (b and .)
		if( Reveal.isPaused() && [66,190,191].indexOf( event.keyCode ) === -1 ) {
			return false;
		}

		switch( event.keyCode ) {
			// p, page up
			case 80: case 33:
                    navigatePrevSlide();
                break;
			// n, page down
			case 78: case 34:
                    navigateNextSlide();
                break;
			// h, left
			case 72: case 37:
                    navigateLeftSlide();
                break;
			// l, right
			case 76: case 39:
                    navigateRightSlide();
                break;
			// k, up
			case 75: case 38:
                    navigateUpSlide();
                break;
			// j, down
			case 74: case 40:
                    navigateDownSlide();
                break;
			default:
				triggered = false;
		}

		// If the input resulted in a triggered action we should prevent
		// the browsers default behavior
		if( triggered ) {
			event.preventDefault();
		}

		// If auto-sliding is enabled we need to cue up
		// another timeout
		//cueAutoSlide();

	}

	return {
		leftSlide: navigateLeftSlide,
		rightSlide: navigateRightSlide,
		upSlide: navigateUpSlide,
		downSlide: navigateDownSlide,
		prevSlide: navigatePrevSlide,
		nextSlide: navigateNextSlide,
		navigateLeftSlide: navigateLeftSlide,
		navigateRightSlide: navigateRightSlide,
		navigateUpSlide: navigateUpSlide,
		navigateDownSlide: navigateDownSlide,
		navigatePrevSlide: navigatePrevSlide,
		navigateNextSlide: navigateNextSlide,
        setup: setup
	};

})();
