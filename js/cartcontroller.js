let renderCart = () => {
	console.log(1);
	var cart = JSON.parse(localStorage.getItem("cart"));
	console.log(cart);
	if (cart == null) cart = [];
	let html = ` 
	<div class="row product-dm showcart" > 
	<div class="col-6"><p>
		PRODUCT NAME
	</p></div>
	<div class="col-1" style="text-align: center"><p>UNIT PRICE</p></div>
	<div class="col-3" style="text-align: center"><p>QTY</p></div>
	<div class="col-2" style="text-align: center"><p>SUBTOTAL</p></div>
	
</div> <hr>`;

	html += cart.map((item) => {
		return `<div class="row cart-row" id="${item.id}">
			<div class="col-6 d-flex">
				<img src="./image/${item.image}" alt="" style="width: 100px;">
					<div class="row ml-3"> <b>${item.name_product}</b> 
						<p>It look so beautifull since 1500</p></div>
				   
				
			</div>
			<div class="col-1" style="text-align: center"><p>
			$${item.price_product}</p></div>
			<div class="col-3 d-flex" style="text-align: center;margin-top:-90px">
			<button class="btn decrease-count" type="button">
			<i class="fas fa-chevron-left "></i>
		</button>
					<input type="number" class="form-control item-count" value="
				${item.count}" style="width:  60px ;margin-top: 88px;">
										<button class="btn increase-count" type="button">
										<i class="fas fa-chevron-right "></i>
									</button>
				  
			</div>
			<div class="col-2 d-flex" style="text-align: center"><p id="subtotal-price-${item.id}">$${item.price_product * item.count}</p>
				<a href="" class="btn item-delete " style="margin-top: -14px ; font-size: 25px ;color: red">X</a></div>
		</div><br> <hr>`;
	}).join("");

	$(".cart-container").prepend(html);
	$(".increase-count").click(function (e) {
		let id = $(this).closest(".cart-row").attr("id");

		let item = cart.find((i) => i.id == id);
		$(this).siblings(".item-count").val((++item.count).toString());
		let subPriceId = "#subtotal-price-" + item.id.toString();

		$(subPriceId).text((item.price_product * item.count).toString());
		let newItem = {
			"id": item.id,
			"image": item.image,
			"name_product": item.name_product,
			"price_product": item.price_product,
			"count": item.count
		};
		cart = cart.map((i) => (i.id == id ? newItem : i));
		localStorage.setItem("cart", JSON.stringify(cart));
		console.log(cart);
	});

	$(".decrease-count").click(function (e) {
		let id = $(this).closest(".cart-row").attr("id");
		console.log(id);
		let item = cart.find((i) => i.id == id);

		console.log(item);
		if (item.count > 1) {
			$(this).siblings(".item-count").val((--item.count).toString());
			let subPriceId = "#subtotal-price-" + item.id.toString();

			$(subPriceId).text((item.price_product * item.count).toString());
			let newItem = {
				"id": item.id,
				"name_product": item.name_product,
				"image": item.image,
				"price_product": item.price_product,
				"count": item.count
			};
			cart = cart.map((i) => (i.id == id ? newItem : i));
			localStorage.setItem("cart", JSON.stringify(cart));
			console.log(cart);

		} else if (item.count <= 1) {
			let check = confirm("Do you want to remove this item from cart ?");
			if (check) {
				let removeId = "#" + id.toString();
				cart = cart.filter((i) => i.id != id);
				$(removeId).remove();
				localStorage.setItem("cart", JSON.stringify(cart));
			}
		}
	});

	$(".item-delete").click(function (e) {
		let id = $(this).closest(".cart-row").attr("id");
		let check = confirm("Do you want to remove this item from cart ?");
		if (check) {
			let removeId = "#" + id.toString();
			cart = cart.filter((i) => i.id != id);
			$(removeId).remove();
			localStorage.setItem("cart", JSON.stringify(cart));
		}
	});
};

renderCart();
