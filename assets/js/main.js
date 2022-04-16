jQuery(() => {
  //Getting Data From API
  $.getJSON(
    "https://www.cheapshark.com/api/1.0/games?title=batman&limit=60&exact=0?", (data, status) => {
      $(data).each((_, val) => {
        $.getJSON(
          "https://www.cheapshark.com/api/1.0/deals?id=" + val.cheapestDealID + "?", (data, status) => {
              data.gameInfo["discountedPercent"] = calculateDiscount(data.gameInfo.retailPrice, data.gameInfo.salePrice);
              contentRender(data.gameInfo);
          }
        ).fail((status) => {
          console.log(status);
        });
      });
    }
  ).fail((status) => {
    console.log(status);
  });


  //Rendering Dynamic Html Content With Data From API
  let contentRender = (gameInfo) => {
    const gameContainer = $(".game-container");

    const content =
      $(`<div class="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4  p-4 flex-col flex">
      <a href="#" class="bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden h-full flex flex-col transform transition duration-500 hover:scale-110">
        <div class="relative pb-48 overflow-hidden image-container">
          <img
            class="absolute inset-0 h-full w-full object-fill"
            src="${gameInfo.thumb}"
            alt=""
          />
        </div>
        <div class="p-4 flex justify-between items-center mb-10">
          <h2 class="mt-2 mb-2 card-title">${gameInfo.name}</h2>
          <span class="discount-percentage">${gameInfo.discountedPercent}<small>%</small></span></span>
        </div>
        <div class="mt-auto flex justify-between items-center mx-4 pb-8">
          <div class="discount-price">
            <span>$</span>
            <span>${gameInfo.salePrice}</span>
            <div class="retail-price inline-flex">
                <span>$</span>
                <span>${gameInfo.retailPrice}</span>
              </div>
          </div>
          <div>
            <button
              class=" w-full hover:bg-green-600 text-white px-5 py-2 order-button"
            >
              ORDER
            </button>
          </div>
        </div>
      </a>
    </div>`);
    content.appendTo(gameContainer);
  };

  //Calculating Discount Percentages
  let calculateDiscount = (retailPrice, salePrice) => {
    retailPrice = retailPrice / 100;
    salePrice = salePrice / 100;
    let discount = 100 - (salePrice / retailPrice) * 100;
    return Math.round(discount);
  }
});
