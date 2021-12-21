// @ts-check

$(() => {
  const productList = $('.product-display');
  const filterProducts = (val) => {
    let validRes = productList.filter(
      (index, /** @type HTMLElement */ item) => {
        return item.textContent.toLowerCase().includes(val);
      }
    );

    productList.each((index, item) => {
      item.classList.add('hide');
    });

    validRes.each((index, elem) => {
      elem.classList.remove('hide');
    });
  };
  $('#search-prod-list').on('keyup', function () {
    filterProducts(this.value.toLowerCase());
  });
});
