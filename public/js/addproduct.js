$(() => {
  // Construct the ID title from the
  $('#product-form input#name').on('keyup', (e) => {
    let context = e.target;
    let destination = $('#product-form #title');
    let val = context.value.trim().replaceAll(' ', '-');
    val = val.replaceAll(',', '').replaceAll('\'', '');
    val = val.replaceAll('/', '');
    val = val.replaceAll('\\', '');
    destination.val(val.toLowerCase());
  });

  // Add colors
  const addChip = (text, destination) => {
    if (!text) {
      return;
    }
    const chip = document.createElement('div');
    chip.classList.add('chip');
    chip.innerHTML = `<span>${text}</span><button onclick='this.parentElement.remove();'>&times;</button>`;
    destination.append(chip);
  };

  $('#colors-input').on('keydown', (e) => {
    let context = e.target;
    if (e.key == 'Enter') {
      e.preventDefault();
      const chips = $('#product-form #colors .chip').length;
      // if (chips < 5) {
      addChip(context.value, $('#product-form #colors'));
      context.value = '';
      // }
    }
  });
  $('#tags-input').on('keydown', (e) => {
    let context = e.target;
    if (e.key == 'Enter') {
      e.preventDefault();
      const chips = $('#product-form #tags .chip').length;
      if (chips < 5) {
        addChip(context.value, $('#product-form #tags'));
        context.value = '';
      }
    }
  });

  $('#add-color-btn').on('click', () => {
    addChip($('#colors-input').val(), $('#colors'));
    $('#colors-input').val('');
  });

  $('#add-tag').on('click', (e) => {
    addChip($('#tags-input').val(), $('#tags'));
    $('#tags-input').val('');
  });

  const compileChipInputs = (target) => {
    const destination = document.querySelectorAll(`${target} .chip`);
    const vals = new Array();
    destination.forEach((el, index) => {
      vals.push(el.querySelector('span').textContent);
    });
    return vals;
  };

  $('#product-form').on('submit', (e) => {
    e.preventDefault();
    let context = e.target;
    const tags = compileChipInputs('#tags');
    const colors = compileChipInputs('#colors');
    // console.log(tags, colors);
    if (tags.length < 1 || colors.length < 1) {
      alert('Insert at least one color and tag');
      return;
    }
    const files = context.images.files;
    if (files.length < 2) {
      alert('Select more than one image please');
      return;
    }
    const formData = new FormData(context);
    formData.append('tags', tags);
    formData.append('colors', colors);

    (async () => {
      try {
        const res = await fetch('/products/add', { method: 'POST', body: formData });
        const data = await res.json();
        if (data['status'] == 'ok') {
          location.href = '/products';
        }
        console.log(data);
      } catch (err) {
        console.error(err);
      }
    })();
  });
});
