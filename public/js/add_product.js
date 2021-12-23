$(() => {
  const updateTitleInput = (/**@type string */ val) => {
    // let text = val;
    let text = val
      .replaceAll(/[&#\$\^,\.\+\?-]/gi, '')
      .toLowerCase()
      .trim()
      .split(' ')
      .join('-');
    // console.log(text);
    $('input#title_short').val(text);
  };
  $('input#name').on('keyup', function () {
    updateTitleInput(this.value);
  });

  $('#add-img').on('click', function () {
    const numImgBoxes = $('.img-box').length;

    if (numImgBoxes >= 5) {
      alert('Maximum number of images reached');
      return;
    }

    let newBox = document.createElement('div');
    newBox.classList.add('img-box', 'col', 's4');
    newBox.innerHTML = `
      <label for='img-${numImgBoxes + 1}'></label>
      <input type='file' name='image' id='img-${numImgBoxes + 1}' >
    `;
    console.log(newBox);
    $('.add-files').append(newBox);
  });

  $('#add-tag').on('click', () => {
    const tagList = $('#tag-list li');
    const tagValue = $('#tag-text').val();
    console.log(tagValue);
  });
});
