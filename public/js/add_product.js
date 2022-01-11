// @ts-check

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

  const addColor = () => {
    const colorText = $('#colors').val().toLowerCase();
    const colors = $('#color-list .chip');
    let check = colors.filter(
      (index, elem) => colorText == elem.querySelector('span').textContent
    );
    if (check.length > 0) {
      return undefined;
    }
    // console.log(check);
    const color = document.createElement('div');
    color.classList.add('chip');
    color.innerHTML = `<span>${colorText}</span> <i class='material-icons close'>close</button>`;
    $('#color-list').append(color);
    document.querySelector('#colors').value = '';
    document.querySelector('#colors').focus();
  };

  const addTag = () => {
    const tags = $('#tag-list .chip');
    if (tags.length < 5) {
      const tagList = $('#tag-list');
      const tagValue = $('#tag-text').val().trim().toLocaleLowerCase();
      if (tagValue.length < 1) {
        alert("Put some thing na. Don't be a foolish idiot");
        return undefined;
      }
      let check = tags.filter((index, tag) => {
        let content = tag.querySelector('span').textContent;
        return content == tagValue;
      });
      if (check.length > 0) {
        alert("Use another tag. don't be a foolish idiot");
        return undefined;
      }
      const tag = document.createElement('div');
      tag.classList.add('chip');
      tag.innerHTML = `<span>${tagValue}</span> <i class='close material-icons'>close</i>`;
      tagList.append(tag);
      document.querySelector('#tag-text').value = '';
      document.querySelector('#tag-text').focus();
    } else {
      alert(`It don do na. Don't be a foolish idiot`);
    }
  };

  $('#colors').on('keydown', (e) => {
    if (e.key.toLowerCase() == 'enter') {
      e.preventDefault();
      addColor();
    }
  });
  // $('#add-color').on('click', addColor);

  $('#tag-text').on('keydown', (e) => {
    if (e.key.toLowerCase() == 'enter') {
      e.preventDefault();
      addTag();
    }
  });

  const compileTags = () => {
    const tags = [];
    const tagList = $('#tag-list .chip');
    for (let tag of tagList) {
      tags.push(tag.querySelector('span').textContent);
    }
    return tags;
  };
  const compileColors = () => {
    const tags = [];
    const tagList = $('#color-list .chip');
    for (let tag of tagList) {
      tags.push(tag.querySelector('span').textContent);
    }
    return tags;
  };

  const compileSizes = () => {
    const sizes = [];
    const context = document.querySelector('#sizes');
    for (let option of context.options) {
      if (option.selected) {
        sizes.push(option.value);
      }
    }
    return sizes;
  };
  $('#add-product-form').on('submit', async (e) => {
    e.preventDefault();
  });
});
