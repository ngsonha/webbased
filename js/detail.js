var item = {};
var id = JSON.parse(localStorage.getItem("curent-id"));
console.log(item);
let renderProduct = () => {
	fetch("http://localhost:3000/products")
		.then((response) => {
			if (!response.ok) {
				throw Error("ERROR");
			}
			return response.json();
		})
		.then((data) => {
			console.log(data);

			item = data.find((id) => id == id);
			console.log(item);

			$(".name-pr").append(item.name_product);
			$(".image-product").append(item.image);
			$(".price-product").append(item.price_product);
			$(".description").append(item.description);
		})

		.then(() => {
			$(".add-to-cart").click(function () {
				var cart = JSON.parse(localStorage.getItem("cart"));
				if (cart == null) cart = [];
				let temp = cart.find((i) => i.id == id);
				if (!temp) {
					var addToCart = {
						id: item.id,
						name_name: item.name_product,
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
		});
};
renderProduct();
