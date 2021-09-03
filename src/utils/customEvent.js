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
