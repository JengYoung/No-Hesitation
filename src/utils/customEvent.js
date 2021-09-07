import names from '@/utils/classNames';

const DISPATCH_UPDATE_TITLE = 'action/update-title';

export const updateTitleDispatcher = () => {
  const { postLink } = names;
  window.addEventListener(DISPATCH_UPDATE_TITLE, async e => {
    const { id, title } = e.detail;
    document.querySelector(`.${postLink}[data-id="${id}"]`).textContent = title;
  });
};

export const dispatchUpdateTitle = ({ id, title }) => {
  window.dispatchEvent(
    new CustomEvent(DISPATCH_UPDATE_TITLE, {
      detail: {
        id,
        title,
      },
    }),
  );
};

export const togglePosts = $target => {
  $target.addEventListener('click', e => {
    const { postToggleBtn, postBlock, postNext } = names;
    const { target } = e;
    if (!target.classList.contains(postToggleBtn, 'post__link')) return;
    const closestPostId = target.closest(`.${postBlock}`).dataset.id;
    const $nextItem = $target.querySelector(
      `.${postNext}[data-id="${closestPostId}"]`,
    );
    $nextItem.classList.toggle('invisible');
    target.classList.toggle('toggle');
  });
};

export const clickPosts = ($target, onClickCallback) => {
  const { postsItem, postLink } = names;
  $target.addEventListener('click', e => {
    const { classList } = e.target;
    if (!classList.contains(postsItem) && !classList.contains(postLink)) return;
    const postId = e.target.closest(`.${postsItem}`).getAttribute(['data-id']);
    onClickCallback(postId);
  });
};
