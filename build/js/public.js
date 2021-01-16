

$(document).ready(function () {
		let body = $("body"), themeButton,index = 0, el,
			movie_category, header,trendLIst, btn, indicators,
			iframeBorder = body.find("[data-iframe]"),
			iframe__cls__Btn = iframeBorder.find("[data-close]"),
			iframe = iframeBorder.find("iframe");
	iframe__cls__Btn.on("click", function () {
		$(this).parent(iframeBorder).removeClass("active");
		iframe.attr("src", "")
	});

		let time = new Date().getHours();

	//Theme
		body.addClass("light");
		function Theme() {
			let theme = document.createElement("div"),
				theme__wrapper = theme.cloneNode(false);
			$(theme).attr("class", "theme tr");
			$(theme__wrapper).attr("class","theme__wrapper tr")
			themeButton = document.createElement("span")
			theme__wrapper.append(themeButton);
			$(theme__wrapper).on("click", () =>{
				if (body.hasClass("light")){
					$(theme__wrapper).addClass("theme__active")
					body.removeClass("light")
				}else{$(theme__wrapper).removeClass("theme__active");
				body.addClass("light");
				}
			})
			theme.append(theme__wrapper);
			body.prepend(theme);
		}
	if (document.querySelector("body").id !== "login-page") Theme();


	//Loader
	function loader(event) {
		let template =`<div class="loader">
    <div class="loading">
        <svg xmlns="http://www.w3.org/2000/svg"  style="margin: auto; background: transparent; display: block; shape-rendering: auto;" width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
            <circle cx="50" cy="50" r="32" stroke-width="8" stroke="#f7652f" stroke-dasharray="50.26548245743669 50.26548245743669" fill="none" stroke-linecap="round">
                <animateTransform attributeName="transform" type="rotate" dur="1s" repeatCount="indefinite" keyTimes="0;1" values="0 50 50;360 50 50"></animateTransform>
            </circle>
            <circle cx="50" cy="50" r="23" stroke-width="8" stroke="#19346b" stroke-dasharray="36.12831551628262 36.12831551628262" stroke-dashoffset="36.12831551628262" fill="none" stroke-linecap="round">
                <animateTransform attributeName="transform" type="rotate" dur="1s" repeatCount="indefinite" keyTimes="0;1" values="0 50 50;-360 50 50"></animateTransform>
            </circle>
        </svg>
    </div>
    <h3 class="logo">M-promax </h3>

</div>`
		$(body).append(template);
		let loader = $(body).find(".loader");
		loader.addClass("active");
		if (event.on("load")){
			setTimeout(() =>{
				loader.removeClass("active")
			},2000)
		}

	}

	//Default behaviours
	let link = $(body).find("[href]");

	function events(f) {
		for (let i = 0; i <= f.length; i++){
			let each = $(f[i]), win = window[each];
			eve(f[i])
		}
		function eve(event){
			$(event).on("click",() =>{
				// e.preventDefault()
				loader($(event));
			})
		}
		
	} events(link);

	function nextCarousel(e, img, i) {
		if (index == e.length-1){
			index = 0
		}else{
			index++
		}
			slider(e, img);
		if (i !== false)	indicator(i);

	}
	function prev(f, img) {
		if (index > 0){
			index--
		}else{
			index = f.length-1
		}
		slider(f, img)
	}
	function indicator(c){
		el = 0;
		c = c.children()
		for (el; el <= c.length; el++){
			$(c [el]).removeClass("active")
		}
		$(c [index]).addClass("active");
	}
	function slider(slides,backgroundTransition) {
		let i = 0;
		for (i; i <= slides.length; i++){
	$(slides[i]).attr("data-target", "false")
}
		$(slides[index]).attr("data-target", true);
		let img  = $(slides[index]).find("img").attr("src");
		if (backgroundTransition !== false){
			backgroundTransition.css("background-image", 	 `url(${img})`);
		}
	}
	function createDots(slideCount, childParent) {
		el = 0;
		for (el; el <= slideCount.length-1; el++) {
			indicators = document.createElement("a")
			indicators.setAttribute("id", el)
			// indicators.setAttribute("onclick", 'goto(this)')
			childParent.append(indicators);
		}
		// indicators.onclick = () =>{
		// 	index = $(this).id;
		// 	slider(carousel)
		// 	console.log(index)
		// }
	}

		//Header
		function Header(){
			//Nav_links
			header = $(body).find("#indexHeader");

			//Search-option
			let searchBtn = body.find(".search-btn")
			searchBtn.on("click", function () {
				location.assign("search.html");
			});

			//Carousel
			let carousel = header.find(".carousel").find(".carousel-list").children();
			let carouselParent = carousel.parents(".carousel")
			let C_target = carouselParent.find(".carousel-controls");
			let carouselDots = carouselParent.find(".carousel-dots")
			let interval = setInterval(function () {
				nextCarousel(carousel, header, carouselDots)
			},4000)
			C_target.on("click", function () {
				if ($(this).is("#right")){
					nextCarousel(carousel, header)
				}else{
					prev(carousel, img)
				}
				 clearInterval(interval)
					});
			createDots(carousel, carouselDots);
			indicator(carouselDots);

		}

		//Movie List
		function moviesList() {
			movie_category = body.find("[datatype='movie_list']");
			btn = movie_category.find(".header > .tr")
			trendLIst = movie_category.find("[data-target='movieList']");
			$(trendLIst).slick({
				centerMode: true,
				centerPadding: '45px',
				dots: false,
				cssEase: "ease",
				nextArrow: '<i class="fa fa-angle-right slick-next"></i>',
				prevArrow: '<i class="fa fa-angle-left slick-prev"></i>',
				appendArrows: $(btn),
				autoplay: 500,
				slidesToShow: 3,
				responsive: [
					{
						breakpoint: 768,
						settings: {
							arrows: false,
							centerMode: true,
							centerPadding: '40px',
							slidesToShow: 3
						}
					},
					{
						breakpoint: 480,
						settings: {
							arrows: false,
							centerMode: true,
							centerPadding: '35px',
							slidesToShow: 1
						}
					}
				]
			});
		}

		//Trailer
		function Trailer(){
			let parent = body.find("[datatype = 'trailers']");
			let children = parent.find("[data-target ='movieList']").children()
			children.on("click", () =>{
				iframe.attr("src", "https://www.youtube.com/embed/R-eFm--k21c?enablejsapi=1");
				loader(iframeBorder)
				setTimeout(function () {
					iframeBorder.addClass("active");
				}, 2000)


			})
		}

		//Categories
		function categories() {
			let category = body.find("[datatype='categories']"),
				list_tabs = category.find("[datatype = 'categories__list']").children();
			$(list_tabs).on("click", () =>{

			});

	}

		//Form
		function form() {
		let form = body.find("form"),
			whiteSpace = new RegExp(/^\s+$/);
		form.on("submit", (e) =>{
			e.preventDefault();
		});

		function login(){
			let login_section = body.find("[datatype='login']");
			let input = login_section.find("input").not("input[type = 'checkbox']");
			let pass = login_section.find("#pass");
			btn = 	login_section.find(".button");
			let visibility = pass.parent("[data-pass]").find("i");
			//Pass-visibility
			visibility.on("click", () =>{
			if (visibility.hasClass("fa-eye-slash")){
				pass.attr("type", "text");
				visibility.removeClass("fa-eye-slash")
				visibility.addClass("fa-eye")
			}
			else{
				pass.attr("type", "password");
				visibility.removeClass("fa-eye")
				visibility.addClass("fa-eye-slash")
			}
			});
			btn.on("click", () =>{
				input.each(function (index) {
					if ($(input[index]).val() === "" || whiteSpace.test($(input[index]).val())){
						$(btn).attr("type", "button");
						$(input[index]).css("border","1px solid #f00f03")
						return $(input[index]).val();
					}
					else{
						$(btn).attr("type", "submit");
						$(input[index]).css("border-color","transparent");
						console.log($(input[index]).val())
						$(input[index]).val("");
					}
				});
			})

		}
		login();

		function register(){
			let register_page = body.find("[datatype='register']"),
				form = register_page.find("form").find("section"),
				input = form.find("input"),
				button = register_page.find(".button"),
				dots = register_page.find(".dots");
				createDots(form, dots);
				slider(form, false);
				indicator($(dots));
			button.on("click", () =>{
				nextCarousel($(form), false, false);
				indicator(dots);
			});
		}
		register();
	}

		//Function call
		Header();
		form()
		moviesList();
		Trailer();
		categories();

	}
)
