var allData = [];

let renderAllProduct = () => {
	fetch("http://localhost:3000/products")
		.then((response) => {
			if (!response.ok) {
				throw Error("ERROR");
			}
			return response.json();
		})
		.then((data) => {
			console.log(data);
			allData = data;
			const html = data
				.map((item) => {
					return `
                    <div class="product-item" >
                    
                    <div class="product-img">
                        <img src="./image/${item.image}" alt=""
                            class="figure-img img-fluid ">
                    </div>
                    <div class="product-description">
                        <p>${item.name_product}</p>
                        <div class="product-price">
                            $${item.price_product}
                        </div>
                    </div>
                    <div class="item-hover" id="${item.id}">
                        <a href="./productPage.html" class="btn go-to-detail" onClick="function()" role="button" >
                            Detail
                        </a>
                        <button class="btn add-to-cart" >
                            Add to cart
                        </button>
                    </div>
                    </div>
							`;
				})
				.join("");
			document
				.querySelector("#showProducts")
				.insertAdjacentHTML("afterbegin", html);
			// $("showProducts").append(html);
		})

		.then((data) => {
			$(".go-to-detail").click(function () {
				let id = $this.closest(".item-hover").attr("id");
				sessionStorage.setItem("curent-id", id);
			});
		})
		.then(() => {
			$(".add-to-cart").click(function () {
				let id = $(this)
					.closest(".item-hover")
					.attr("id");

				var cart = JSON.parse(localStorage.getItem("cart"));
				if (cart == null) cart = [];
				let temp = cart.find((i) => i.id == id);
				if (!temp) {
					let item = allData.find((i) => i.id == id);
					var addToCart = {
						id: item.id,
						name_product: item.name_product,
						image: item.image,
						price_product: item.price_product,
						count: 1
					};
					cart.push(addToCart);
				} else {
					cart.map((i) => (i.id == id ? i.count++ : i));
				}
				console.log(cart);
				localStorage.setItem("cart", JSON.stringify(cart));
				alert("Product added !");
			});
			$(".go-to-detail").click(function () {
				let id = $(this)
					.closest(".item-hover")
					.attr("id");
				localStorage.setItem("curent-id", id);
			});
		});
};

renderAllProduct();

var url1 = " http://localhost:3000/top-product";
axios.get(url1).then(function (res) {
	var items1 = res.data;
	render1(items1);
});
function render1(items1) {
	var htmlList1 = document.getElementById("showProducts-top");
	var content1 = items1.map(function (items1) {
		return (`  <div class="product-item" >
                    
		<div class="product-img">
			<img src="./image/${items1.image}" alt=""
				class="figure-img img-fluid ">
		</div>
		<div class="product-description">
			<p>${items1.name_product}</p>
			<div class="product-price">
				$${items1.price_product}
			</div>
		</div>
		<div class="item-hover" id="${items1.id}">
			<a href="./productPage.html" class="btn go-to-detail" onClick="function()" role="button" >
				Detail
			</a>
			<button class="btn add-to-cart" >
				Add to cart
			</button>
		</div>
		</div>`)
	});

	htmlList1.innerHTML = content1.join("");
}
var url2 = " http://localhost:3000/sale-product";
axios.get(url2).then(function (res) {
	var items2 = res.data;
	render2(items2);
});
function render2(items2) {
	var htmlList2 = document.getElementById("showProducts-sale");
	var content2 = items2.map(function (items2) {
		return (
			`<div class="product-item" >
                    
			<div class="product-img">
				<img src="./image/${items2.image}" alt=""
					class="figure-img img-fluid ">
			</div>
			<div class="product-description">
				<p>${items2.name_product}</p>
				<div class="product-price">
					$${items2.price_product}
				</div>
			</div>
			<div class="item-hover" id="${items2.id}">
				<a href="./productPage.html" class="btn go-to-detail" onClick="function()" role="button" >
					Detail
				</a>
				<button class="btn add-to-cart" >
					Add to cart
				</button>
			</div>
			</div>`
		);
	});

	htmlList2.innerHTML = content2.join("");
}
